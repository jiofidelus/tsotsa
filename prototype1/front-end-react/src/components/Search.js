/** @format */

/** @format */

import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useMutation } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';
import SlidingPane from 'react-sliding-pane';
import { Badge, Col, Container, List, Row, Spinner } from 'reactstrap';
import { exploreIndividual, searchTerm } from '../helpers/classeHelper';
import Result from './Result';

export default function Search() {
  let location = useLocation();
  let history = useHistory();

  useEffect(() => {
    if (location.search !== '') {
      let term = location.search.split('=')[1];
      setTerm(term);
      searchMutation.mutate(term);
    }
  }, []);

  const [panState, setPanState] = useState({
    isPaneOpen: true,
    isPaneOpenLeft: true,
  });

  const [individualItem, setIndividualItem] = useState(null);

  const [listItems, setListItems] = useState(null);

  const [term, setTerm] = useState('');

  const searchMutation = useMutation((term) => searchTerm(term), {
    onSuccess: (response) => {
      setListItems(response.data);
    },
  });

  const _handleKeyDown = function (e) {
    if (e.key === 'Enter') {
      history.push({
        pathname: '/recherche',
        search: `?q=${term}`,
      });
      searchMutation.mutate(term);
    }
  };

  const closeSlide = () => {
    setPanState({ ...panState, isPaneOpen: false });
    history.goBack();
  };

  const renderDescription = (Ob) => {
    let keys = Object.keys(Ob);
    return Object.entries(Ob).map((item) => {
      return (
        <>
          <tr>
            <td>{item[0]}:</td>
            <td>
              <List type='unstyled'>
                <ul>{item[1].map((value, index) => renderSubClass(value))}</ul>
              </List>
            </td>
          </tr>

          <tr></tr>
        </>
      );
    });
  };

  const renderSubClass = (object) => {
    const keys = Object.keys(object);

    if (
      object.hasOwnProperty('labelObject') ||
      object.hasOwnProperty('labelSubject') ||
      object[keys[0]] === 'http://www.w3.org/2000/01/rdf-schema#label' ||
      object[keys[0]] === 'http://www.w3.org/2000/01/rdf-schema#comment'
    ) {
      return (
        <>
          <div>
            {object?.labelObject && (
              <li>
                <Badge href='#' color='primary'>
                  {object?.labelObject} (fr)
                </Badge>
                : {object?.commentObject}
              </li>
            )}
            {object?.labelObjectEN && (
              <li>
                <Badge href='#' color='primary'>
                  {object?.labelObjectEN} (en)
                </Badge>
              </li>
            )}
            {object?.object && <li>{object?.object}</li>}
          </div>
          <hr />
          <div>
            <p1>
              {object?.labelSubject && (
                <li>
                  <Badge href='#' color='info'>
                    {object?.labelSubject}
                  </Badge>
                  : {object?.labelSubjectComment}
                </li>
              )}
            </p1>
          </div>
        </>
      );
    }
  };

  const renderCard = (items) => {
    return items.map((item, index) => {
      console.log(item);
      let labelItem = item.subject[0].split('#')[1];
      return (
        <Result
          key={index}
          title={item.object[0]}
          onClick={() => explore(labelItem)}
          description={item?.comment[0]}
        />
      );
    });
  };

  const exploreMutation = useMutation((name) => exploreIndividual(name), {
    onSuccess: (response) => {
      setIndividualItem(response?.data);
    },
  });

  const explore = (label) => {
    history.push(`${location.pathname}/${label}`);
    setPanState({ ...panState, isPaneOpen: true });
    exploreMutation.mutate(label);
  };

  return (
    <>
      <Row>
        <Col>
          <div className='Search'>
            <Container>
              <div
                className='SearchSecond'
                style={{ float: 'left', marginLeft: '40px' }}
              >
                <span className='SearchSpan'>
                  <FaSearch />
                </span>
                <input
                  placeholder='Ontology Search'
                  className='SearchInput'
                  type='text'
                  value={term}
                  onKeyDown={_handleKeyDown}
                  onChange={(value) => setTerm(value.target.value)}
                />
              </div>
              <div style={{ margin: '5px' }}>
                {searchMutation.isLoading && <Spinner />}
              </div>
            </Container>
          </div>
        </Col>
      </Row>
      <Row>
        {listItems && (
          <Container>
            <Col style={{ margin: '25px' }}>
              <h6>
                Resultats:{listItems.response.length} ({listItems.time}{' '}
                milleseconds)
              </h6>
            </Col>
            <Col md='8'>{renderCard(listItems.response)}</Col>
          </Container>
        )}
      </Row>
      {individualItem && (
        <SlidingPane
          width='50%'
          className='some-custom-class'
          overlayClassName='some-custom-overlay-class'
          isOpen={panState.isPaneOpen}
          title={`${individualItem.label[0]?.object}`}
          subtitle={`${individualItem?.label[1]?.object}`}
          onRequestClose={closeSlide}
        >
          <div>{renderDescription(individualItem)}</div>
        </SlidingPane>
      )}
    </>
  );
}
