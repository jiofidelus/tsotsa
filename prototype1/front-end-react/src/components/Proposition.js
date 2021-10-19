/** @format */

import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Row,
} from 'reactstrap';
export default function Validation(props) {
  return (
    <>
      <Container>
        <Row className='mt-5'>
          <Col xs='12' sm='6' md='4'>
            <Link className='link-card mb-5' to='/proposition/repas'>
              <Card className='widgetRevision'>
                <CardImg
                  top
                  width='100%'
                  src='/icons/065-chef.png'
                  alt='Card image cap'
                />
                <CardBody>
                  <CardTitle tag='h5'>CHEF DE CUISINE</CardTitle>
                  <CardSubtitle tag='h6' className='mb-2 text-muted'>
                    Proposition des repas pour un chef cuisinier en fonction de
                    la region d'origine
                  </CardSubtitle>
                </CardBody>
              </Card>
            </Link>
          </Col>
          <Col xs='12' sm='6' md='4'>
            <Link className='link-card mb-5' to='/proposition/aliments'>
              <Card className='widgetRevision'>
                <CardImg
                  top
                  width='100%'
                  src='/icons/014-catering.png'
                  alt='Card image cap'
                />
                <CardBody>
                  <CardTitle tag='h5'>PLAT POUR VOTRE SANTE</CardTitle>
                  <CardSubtitle tag='h6' className='mb-2 text-muted'>
                    Proposition des repas pour un chef cuisinier en fonction de
                    la region d'origine
                  </CardSubtitle>
                </CardBody>
              </Card>
            </Link>
          </Col>
        </Row>
      </Container>
      );
    </>
  );
}
