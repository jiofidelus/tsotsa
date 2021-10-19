/** @format */

import React from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Row,
} from 'reactstrap';

export default function Collecte() {
  return (
    <Container>
      <Row>
        <Col className='m-3'>
          <Form>
            <h3>Ajoutez un faits </h3>
            <FormGroup>
              <Label for='exampleEmail'>Entrez une phrase</Label>
              <Input placeholder='le riz se mange avec la poulet' />
              <FormFeedback>You will not be able to see this</FormFeedback>
              {/* <FormText>Example help text that remains unchanged.</FormText> */}
            </FormGroup>
            <Button color='primary' size='sm'>
              Enregistrer
            </Button>
          </Form>
        </Col>
        <Col className='m-3'>
          <h3>Listes des faits</h3>
          <ListGroup>
            <ListGroupItem>1 .Le riz se mange avec le poulet</ListGroupItem>
            <ListGroupItem>
              2 .Le couscous se mange avec le poisson
            </ListGroupItem>
            <ListGroupItem>3. La banane est riche en potassium</ListGroupItem>
            <ListGroupItem>4 .Le citron est bon pour un regime</ListGroupItem>
            <ListGroupItem>
              5. Le couscous se mange avec du poulet
            </ListGroupItem>
            <ListGroupItem>6. La carrotte est bien pour la peau</ListGroupItem>
            <ListGroupItem>7 La viande est riche est fer</ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}
