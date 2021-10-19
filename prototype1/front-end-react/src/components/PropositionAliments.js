/** @format */

import { useState } from 'react';
import { useMutation } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import {
  Button,
  ButtonToggle,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Label,
  Row,
  Spinner,
} from 'reactstrap';
import { getMaladies, maladieRecommendation } from '../helpers/classeHelper';

const etats = [
  {
    label: 'EXCES ALIMENTAIRE',
    value: 'Maladie-des-Exces',
  },
  {
    label: 'CARENCE ALIMENTAIRE',
    value: 'Maladie-des-Carrences',
  },
];

export default function PropositionAliments(props) {
  let { slug } = useParams();

  const history = useHistory();

  const [classeIndividuals, setClasseIndividuals] = useState({});

  const [maladies, setMaladies] = useState([]);
  const [selectedMaladie, setSelectedMaladie] = useState([]);

  const maladieMutation = useMutation((etat) => getMaladies(etat), {
    onSuccess: (response) => {
      toast.success('Maladies Recuperes');
      setMaladies(response?.data?.records);
    },
    onError: (error) => {
      toast.error('Erreur: Veuillez patienter');
    },
  });

  const mutation = useMutation((data) => maladieRecommendation(data), {
    onSuccess: (response) => {
      toast.info('Listes des recommendations');
      setClasseIndividuals(response?.data);
    },
    onError: (error) => {
      toast.error('Erreur: Veuillez patienter');
    },
  });

  const onChangeEtat = (data) => {
    if (data) {
      let etat = data.value;
      maladieMutation.mutate(etat);
    }
  };

  const onChangeMaladie = (etat) => {
    let maladies = [];
    if (etat.length !== 0) {
      etat.map((item) => {
        let maladie = `food:${item.value}`;
        maladies = [...maladies, maladie];
        setSelectedMaladie(maladies);
      });
    } else {
      setSelectedMaladie([]);
    }
  };

  const renderAliment = (maladies) => {
    let keys = Object.keys(maladies);

    return Object.entries(maladies).map((item) => {
      return (
        <>
          ``
          <h4>{item[0]}</h4>
          {renderPredicat(item[1])}
        </>
      );
    });
  };

  const renderPredicat = (values) => {
    return values.map((item, index) => {
      return (
        <>
          <li>
            {item?.labeluriSubObjFR && <span>{item?.labeluriSubObjFR} </span>}
            {item?.labelPredicat && <span> {item?.labelPredicat}</span>}

            {item.hasOwnProperty('uriObjectFR') ? (
              <span> {item?.uriObjectFR} </span>
            ) : (
              <span>{item?.uriMaladie.split('#')[1]} </span>
            )}
          </li>
          <hr />
        </>
      );
    });
  };
  return (
    <>
      <Container className='mt-2'>
        <ButtonToggle
          size='sm'
          onClick={() => history.goBack()}
          color='secondary'
        >
          Retour
        </ButtonToggle>
        <hr />

        <Row>
          <Col md='6'>
            <Form>
              <div>
                <h3>Votre Etat de Sante </h3>

                <FormGroup>
                  <Label for='etatSante'>
                    etes-vous en Exces ou en Carrence Alimentaire ?
                  </Label>
                  <Select
                    isClearable={true}
                    onChange={onChangeEtat}
                    name='etatSante'
                    options={etats}
                    className='basic-multi-select'
                    classNamePrefix='select'
                  />
                  <FormFeedback></FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Label for='etatSante'>Les maladies</Label>
                  <Select
                    isMulti
                    isClearable={true}
                    onChange={onChangeMaladie}
                    name='maladie'
                    options={maladies}
                    className='basic-multi-select'
                    classNamePrefix='select'
                  />
                  <FormFeedback></FormFeedback>
                </FormGroup>

                {mutation.isLoading ? (
                  <Spinner />
                ) : (
                  <Button
                    onClick={() => mutation.mutate(selectedMaladie)}
                    color='primary'
                  >
                    Voir la recommendation
                  </Button>
                )}
              </div>
            </Form>
          </Col>
          <Col md='6'>
            <h3>Conseils </h3>

            {mutation.isLoading ? (
              <Spinner size='sm' color='secondary' />
            ) : (
              <div>
                {mutation.isError ? <div>An error occurred: error</div> : null}
                {mutation.isSuccess ? (
                  <ul>{renderAliment(classeIndividuals)}</ul>
                ) : null}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
