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
  Spinner,
} from 'reactstrap';
import { addPlatToStore, getAliments } from '../helpers/classeHelper';

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
    label: 'ADAMAOUO',
    value: 'ADAMAOUA',
  },
];

export default function AddPlat(props) {
  let { slug } = useParams();

  const history = useHistory();

  const [name, setName] = useState('');
  const [labelFR, setLabelFR] = useState('');
  const [labelEN, setLabelEN] = useState('');
  const [alimentPlats, setAlimentPlats] = useState([]);
  const [comment, setComment] = useState('');
  const [regions, setRegions] = useState([]);

  const [classeIndividuals, setClasseIndividuals] = useState({
    total: null,
    records: [],
  });

  useEffect(() => {
    mutation.mutate();
  }, []);

  const mutation = useMutation(() => getAliments(), {
    onSuccess: (response) => {
      setClasseIndividuals({
        ...classeIndividuals,
        total: response?.data?.total,
        records: response?.data?.records,
      });
    },
  });

  const addPlat = useMutation((data) => addPlatToStore(data), {
    onSuccess: (response) => {
      toast.success('Plat Ajoute');
      clearInput();
    },
  });

  const clearInput = () => {
    setName('');
    setLabelFR('');
    setLabelEN('');
    setAlimentPlats();
    setRegions();
    setComment('');
  };

  const onChangeAliment = (data) => {
    if (data) {
      data.map((item) => {
        let splitName = item.entity.split('#')[1];
        let plat = `food:${splitName}`;
        // controler si pla presente daans le tableau
        setAlimentPlats([...alimentPlats, plat]);
      });
    } else {
      setAlimentPlats([]);
    }
  };

  const onChangeRegion = (data) => {
    if (data) {
      data.map((item) => {
        let region = `food:${item.value}`;
        // controler si substance presente daans le tableau
        setRegions([...regions, region]);
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
                <h3>Ajouter un Plat</h3>
                <FormGroup>
                  <Label for='name'>Nom Plat</Label>
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
                  <Label for='comment'>Region du plat</Label>
                  <Select
                    onChange={onChangeRegion}
                    isMulti
                    name='regions'
                    options={regionsCameroun}
                    className='basic-multi-select'
                    classNamePrefix='select'
                  />
                  <FormFeedback></FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Label for='comment'>Aliments (constituants) </Label>
                  <Select
                    onChange={onChangeAliment}
                    isMulti
                    name='plats'
                    options={classeIndividuals.records}
                    className='basic-multi-select'
                    classNamePrefix='select'
                  />
                </FormGroup>
                {addPlat.isLoading ? (
                  <Spinner />
                ) : (
                  <Button
                    onClick={() =>
                      addPlat.mutate({
                        name,
                        labelEN,
                        labelFR,
                        comment,
                        regions,
                        alimentPlats,
                      })
                    }
                    color='primary'
                  >
                    Ajouter un plat
                  </Button>
                )}
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
