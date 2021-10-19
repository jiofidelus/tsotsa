/** @format */

import { Card, CardBody, Col, Container, Jumbotron, Row } from 'reactstrap';
import RegisterForm from './RegisterForm';

export default function Register() {
  return (
    <>
      <Container>
        <Row>
          <Col />
          <Col lg='8'>
            <Jumbotron>
              <h3 className='text-center'>CREER UN COMPTE</h3>
              <hr />
              <Card>
                <CardBody>
                  <RegisterForm />
                </CardBody>
              </Card>
            </Jumbotron>
          </Col>
          <Col />
        </Row>
      </Container>
    </>
  );
}
