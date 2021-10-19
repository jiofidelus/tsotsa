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
  Table,
} from 'reactstrap';
import { metRecommendation } from '../helpers/classeHelper';

const regionsCameroun = [
  {
    label: 'EXTREME_NORD',
    value: 'EXTREME_NORD',
  },
  {
    label: 'NORD',
    value: 'NORD',
  },
  {
    label: 'CENTRE',
    value: 'CENTRE',
  },
  {
    label: 'ADAMAOUA',
    value: 'ADAMAOUA',
  },
  {
    label: 'SUD OUEST',
    value: 'SUD_OUEST',
  },
  {
    label: 'NORD OUEST',
    value: 'NORD_OUEST',
  },
  {
    label: 'EST',
    value: 'EST',
  },
  {
    label: 'OUEST',
    value: 'OUEST',
  },
  {
    label: 'SUD',
    value: 'SUD',
  },
  {
    label: 'LITTORAL',
    value: 'LITORAL',
  },
];

export default function PropositionRepas(props) {
  let { slug } = useParams();

  const history = useHistory();

  const [classeIndividuals, setClasseIndividuals] = useState({
    total: null,
    records: [],
  });

  const [regions, setRegions] = useState([]);

  const mutation = useMutation((data) => metRecommendation(data), {
    onSuccess: (response) => {
      toast.success('Repas Recuperes');
      setClasseIndividuals({
        total: response?.data?.total,
        records: response?.data?.records,
      });
    },
    onError: (error) => {
      toast.error('Erreur: Veuillez patienter');
    },
  });

  const onChangeRegion = (data) => {
    let values = [];
    if (data.length !== 0) {
      data.map((item) => {
        let region = `food:${item.value}`;
        values = [...values, region];
        // controler si substance presente daans le tableau
        setRegions(values);
      });
    } else {
      setRegions([]);
    }
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
                <h3>Selectionner les regions </h3>

                <FormGroup>
                  <Label for='comment'>Region du plat</Label>
                  <Select
                    isClearable={true}
                    onChange={onChangeRegion}
                    isMulti
                    name='regions'
                    options={regionsCameroun}
                    className='basic-multi-select'
                    classNamePrefix='select'
                  />
                  <FormFeedback></FormFeedback>
                </FormGroup>

                {mutation.isLoading ? (
                  <Spinner />
                ) : (
                  <Button
                    onClick={() =>
                      mutation.mutate({
                        regions,
                      })
                    }
                    color='primary'
                  >
                    Recherche les plats
                  </Button>
                )}
              </div>
            </Form>
          </Col>
          <Col md='6'>
            {mutation.isLoading ? (
              <Spinner size='sm' color='secondary' />
            ) : (
              <div>
                {mutation.isError ? <div>An error occurred: error</div> : null}
                {mutation.isSuccess ? (
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Noms du Plat (Mets)</th>
                        <th>-------------------</th>
                        <th>Region d'Origine</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classeIndividuals.records.map((plat, index) => {
                        let labelItem = plat.uriRepas.split('#')[1];
                        return (
                          <tr key={index}>
                            <th scope='row'>{index}</th>
                            <td>{plat.labelRepas}</td>
                            <td>{plat.labelPredicat}</td>
                            <td>{plat.labelRegion}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                ) : null}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
