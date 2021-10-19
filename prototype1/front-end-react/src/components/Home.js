/** @format */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useMutation, useQuery } from 'react-query';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Select from 'react-select';
import SlidingPane from 'react-sliding-pane';
import {
  Badge,
  Col,
  Container,
  FormGroup,
  List,
  ListGroup,
  ListGroupItem,
  Nav,
  NavItem,
  NavLink,
  Row,
  Spinner,
  TabContent,
  Table,
  TabPane,
} from 'reactstrap';
import '../card.css';
import {
  describeClasse,
  exploreIndividual,
  getClasse,
  getClasses,
  getStatistique,
} from '../helpers/classeHelper';
import '../sliding-pane.css';
import Result from './Result';

export default function Home(props) {
  const [selectedOption, setSelectedOption] = useState(null);

  let { classNameParam, individual } = useParams();
  let history = useHistory();
  let location = useLocation();
  const [term, setTerm] = useState('');
  const [activeTab, setActiveTab] = useState('1');

  const { isLoading, data } = useQuery('classeList', () => getClasses());
  const { isLading: loadingStat, data: stats } = useQuery('stats', () =>
    getStatistique()
  );

  const [classeIndividuals, setClasseIndividuals] = useState({
    total: null,
    records: [],
  });
  const [className, setclassName] = useState(null);

  const [individualItem, setIndividualItem] = useState(null);

  const [classeDetails, setClasseDetails] = useState(null);

  const [panState, setPanState] = useState({
    isPaneOpen: true,
    isPaneOpenLeft: false,
    isPaneOpenButton: true,
  });

  const mutation = useMutation((className) => getClasse(className), {
    onSuccess: (response) => {
      setClasseIndividuals({
        ...classeIndividuals,
        total: response?.data?.total,
        records: response?.data?.records,
      });
    },
  });

  const exploreMutation = useMutation((name) => exploreIndividual(name), {
    onSuccess: (response) => {
      setIndividualItem(response?.data);
    },
  });

  const OnchangeSelected = (data) => {
    if (data) {
      let params = data.class.split('#')[1];
      setclassName(data.label);
      mutation.mutate(params);
      history.push(`/classes/${params}`);
    } else {
      history.push('/');
    }
  };

  const describeClasseMutation = useMutation((name) => describeClasse(name), {
    onSuccess: (response) => {
      setClasseDetails(response?.data);
    },
  });

  const explore = (label) => {
    // history.push(`${location.pathname}/${label}`);
    setPanState({ ...panState, isPaneOpen: true });
    exploreMutation.mutate(label);
  };

  const describe = (className) => {
    setPanState({
      ...panState,
      isPaneOpenLeft: true,
    });

    describeClasseMutation.mutate(className);
  };

  const closeSlide = () => {
    setPanState({ ...panState, isPaneOpen: false });
    history.goBack();
  };

  const renderExplore = (Ob) => {
    let keys = Object.keys(Ob);

    return Object.entries(Ob).map((item) => {
      return (
        <div>
          <h3>{item[0]}</h3>
          {item[1].map((value, index) => {
            return (
              <ListGroup flush>
                <ListGroupItem disabled tag='a' href='#'>
                  {value?.label}
                </ListGroupItem>
              </ListGroup>
            );
          })}
        </div>
      );
    });
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
                <Badge
                  style={{ cursor: 'pointer', fontSize: '14px' }}
                  onClick={() => explore(object.object.split('#')[1])}
                  color='primary'
                >
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
            {object?.object && <li> {object?.object}</li>}
          </div>
          <hr />
          <div>
            <p1>
              {object?.labelSubject && (
                <li>
                  <Badge
                    style={{ cursor: 'pointer', fontSize: '14px' }}
                    onClick={() => explore(object.subject.split('#')[1])}
                    color='info'
                  >
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
  const _handleKeyDown = function (e) {
    if (e.key === 'Enter') {
      history.push({
        pathname: '/recherche',
        search: `?q=${term}`,
      });
    }
  };

  return (
    <>
      <Row>
        <Col>
          <div className='Search'>
            <div>
              <div className='SearchSecond'>
                <span className='SearchSpan'>
                  <FaSearch />
                </span>
                <input
                  placeholder='Ontology Search'
                  className='SearchInput'
                  type='text'
                  value={term}
                  onChange={(value) => setTerm(value.target.value)}
                  onKeyDown={_handleKeyDown}
                />
              </div>
              <div className='selectClass'>
                <FormGroup>
                  <Select
                    isClearable
                    isLoading={isLoading}
                    placeholder='Selectionner une classe'
                    defaultValue={selectedOption}
                    onChange={OnchangeSelected}
                    options={data?.data?.records}
                  />
                </FormGroup>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Container>
          <Col xs='12'>
            {(classNameParam === undefined ||
              classNameParam === null ||
              !mutation.isSuccess) && (
              <div className='width: 60%'>
                <h2>
                  Bienvenue sur Food Ontology, la meileure ontology pour les
                  aliments au Cameroun.
                </h2>
                <p>
                  l'ontologies permet de faire la recherche des aliments,
                  explore leurs valeurs nutritives. Chaque aliment peut etre
                  lies a un plat (repas). Avec cette application, vous pouvez
                  voir les amis les plus commences dans une region du Cameroun,
                  voir les reon de repas basee sur les valeurs nutritives des
                  aliments.
                </p>

                {stats && (
                  <Col md='6'>
                    <h3>Ontology Statistique </h3>
                    <ListGroup>
                      <ListGroupItem tag='a' href='#' action>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <span>Classe</span>
                          <span>{stats.data.classe.records[0].count}</span>
                        </div>
                      </ListGroupItem>
                      <ListGroupItem tag='a' href='#' action>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <span>Predicats</span>
                          <span>{stats.data.predicat.records[0].count}</span>
                        </div>
                      </ListGroupItem>
                      <ListGroupItem tag='a' href='#' action>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <span>Labels</span>
                          <span>{stats.data.label.records[0].count}</span>
                        </div>
                      </ListGroupItem>
                      <ListGroupItem tag='a' href='#' action>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <span>Predicats</span>
                          <span>{stats.data.comment.records[0].count}</span>
                        </div>
                      </ListGroupItem>
                    </ListGroup>
                  </Col>
                )}
              </div>
            )}

            <div>
              {mutation.isLoading ? (
                <Spinner size='sm' color='secondary' />
              ) : (
                <div>
                  {mutation.isError ? (
                    <div>An error occurred: error</div>
                  ) : null}

                  {mutation.isSuccess && classNameParam !== undefined ? (
                    <div>
                      {className && (
                        <Badge
                          style={{
                            backgroundColor: '#00838d',
                            cursor: 'pointer',
                            marginLeft: '10px',
                          }}
                          onClick={() => describe(classNameParam)}
                        >
                          <h4 style={{}}>
                            {' '}
                            {className}: {classeIndividuals.total}
                          </h4>
                          <FontAwesomeIcon icon='coffee' />
                        </Badge>
                      )}
                      {classeIndividuals.records.map((classeItem, index) => {
                        let labelItem = classeItem.uri.split('#')[1];
                        return (
                          <Result
                            key={index}
                            title={classeItem.label}
                            classe={className}
                            description={classeItem.comment}
                            onClick={() => explore(labelItem)}
                          />
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              )}
            </div>
            {individualItem && (
              <SlidingPane
                width='50%'
                className='some-custom-class'
                overlayClassName='some-custom-overlay-class'
                isOpen={panState.isPaneOpen}
                title={`${individualItem.label[0]?.object}`}
                subtitle={` ${
                  individualItem?.label[1]?.object
                    ? individualItem?.label[1]?.object
                    : ''
                }`}
                onRequestClose={closeSlide}
              >
                <div>
                  {exploreMutation.isLoading ? (
                    <Spinner size='sm' color='secondary' />
                  ) : (
                    <div>
                      {exploreMutation.isError ? (
                        <div>An error occurred: </div>
                      ) : null}
                    </div>
                  )}

                  {exploreMutation.isSuccess
                    ? renderDescription(individualItem)
                    : null}
                </div>
              </SlidingPane>
            )}
            <SlidingPane
              isOpen={panState.isPaneOpenLeft}
              title={`A Propos: ${className}`}
              from='left'
              width='50%'
              onRequestClose={() => {
                // triggered on "<" on left top click or on outside click
                setPanState({ ...panState, isPaneOpenLeft: false });
              }}
            >
              <div style={{ margin: '5px' }}>
                {describeClasseMutation.isLoading ? (
                  <Spinner size='sm' color='secondary' />
                ) : (
                  <div>
                    {describeClasseMutation.isError ? (
                      <div>An error occurred: </div>
                    ) : null}

                    {describeClasseMutation.isSuccess ? (
                      <div>
                        <Nav tabs>
                          <NavItem>
                            <NavLink
                              className={activeTab == '1' ? 'active' : ''}
                              onClick={() => setActiveTab('1')}
                            >
                              Details
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={activeTab == '2' ? 'active' : ''}
                              onClick={() => setActiveTab('2')}
                            >
                              RDF/XML : About
                            </NavLink>
                          </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab}>
                          <TabPane tabId='1'>
                            <Table>
                              <thead>
                                <tr>
                                  <th colspan='1'>Ontology Details</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>{renderDescription(classeDetails)}</tbody>
                            </Table>
                          </TabPane>
                          <TabPane tabId='2'>Tab 2 Content</TabPane>
                        </TabContent>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </SlidingPane>
          </Col>
        </Container>
      </Row>
    </>
  );
}
