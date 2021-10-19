/** @format */

import { useEffect, useState } from 'react';
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
  Input,
  Label,
  Row,
  Spinner
} from 'reactstrap';
import { addAlimentToStore, getClasse } from '../helpers/classeHelper';

export default function AddAliment(props) {
  let { slug } = useParams();

  const history = useHistory();

  const subst = 'SubstanceOrganique';

  const [name, setName] = useState('');
  const [labelFR, setLabelFR] = useState('');
  const [labelEN, setLabelEN] = useState('');
  const [substances, setSubstances] = useState([]);
  const [comment, setComment] = useState('');

  const [classeIndividuals, setClasseIndividuals] = useState({
    total: null,
    records: [],
  });

  useEffect(() => {
    mutation.mutate(subst);
  }, []);

  const mutation = useMutation((className) => getClasse(className), {
    onSuccess: (response) => {
      setClasseIndividuals({
        ...classeIndividuals,
        total: response?.data?.total,
        records: response?.data?.records,
      });
    },
  });

  const addAliment = useMutation((data) => addAlimentToStore(data), {
    onSuccess: (response) => {
      toast.success('Plat Ajoute');
      clearInput();
    },
  });

  const clearInput = () => {
    setName('');
    setLabelFR('');
    setLabelEN('');
    setSubstances();
    setComment('');
  };

  const onChangeSubstance = (data) => {
    if (data) {
      data.map((item) => {
        let splitName = item.uri.split('#')[1];
        let substance = `food:${splitName}`;
        // controler si substance presente daans le tableau
        setSubstances([...substances, substance]);
      });
    } else {
      setSubstances([]);
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
                <h3>Ajouter un aliment</h3>
                <FormGroup>
                  <Label for='name'>Nom aliment</Label>
                  <Input
                    value={name}
                    name='name'
                    onChange={(value) => setName(value.target.value)}
                  />
                  <FormFeedback></FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for='labelfr'>Label (FR)</Label>
                  <Input
                    value={labelFR}
                    name='labelfr'
                    onChange={(value) => setLabelFR(value.target.value)}
                  />
                  <FormFeedback></FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for='labelen'>Label (EN)</Label>
                  <Input
                    value={labelEN}
                    name='labelen'
                    onChange={(value) => setLabelEN(value.target.value)}
                  />

                  <FormFeedback></FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for='comment'>Commentaire</Label>
                  <Input
                    value={comment}
                    name='comment'
                    onChange={(value) => setComment(value.target.value)}
                  />
                  <FormFeedback></FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Select
                    onChange={onChangeSubstance}
                    isMulti
                    name='substances'
                    options={classeIndividuals.records}
                    className='basic-multi-select'
                    classNamePrefix='select'
                  />
                </FormGroup>
            {
              addAliment.isLoading ? (
                <Spinner />
              ) : (
                <Button
                onClick={() =>
                  addAliment.mutate({
                    name,
                    labelEN,
                    labelFR,
                    comment,
                    substances,
                  })
                }
                color='primary'
              >
                Ajouter Aliment
              </Button>
              )
            }
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
