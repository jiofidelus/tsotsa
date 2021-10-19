/** @format */

import { Card, CardBody, Col, Container, Jumbotron, Row } from 'reactstrap';
import LoginForm from './Login';

export default function Connexion() {
  return (
    <>
      <Container>
        <Row>
          <Col />
          <Col lg='8'>
            <Jumbotron>
              <h3 className='text-center'>CONNEXION</h3>
              <hr />
              <Card>
                <CardBody>
                  <LoginForm />
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
