/** @format */

import { Link, useParams } from 'react-router-dom';
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
export default function Enrichir(props) {
  let { slug } = useParams();

  console.log(slug);

  return (
    <>
      <Container>
        <Row className='mt-5'>
          <Col xs='12' sm='6' md='3'>
            <Link className='link-card mb-5' to='/enrichir/aliment'>
              <Card className='widgetRevision'>
                <CardImg
                  top
                  width='100%'
                  src='/icons/healthy_food.png'
                  alt='Card image cap'
                />
                <CardBody>
                  <CardTitle tag='h5'>Aliment</CardTitle>
                  <CardSubtitle tag='h6' className='mb-2 text-muted'>
                    Ajouter un aliment dans le store
                  </CardSubtitle>
                </CardBody>
              </Card>
            </Link>
          </Col>
          <Col xs='12' sm='6' md='3'>
            <Link className='link-card mb-5' to='/enrichir/plat'>
              <Card className='widgetRevision'>
                <CardImg
                  top
                  width='100%'
                  src='/icons/016-dinner.png'
                  alt='Card image cap'
                />
                <CardBody>
                  <CardTitle tag='h5'>Plat (Mets)</CardTitle>
                  <CardSubtitle tag='h6' className='mb-2 text-muted'>
                    Ajouter un Plat dans le Store
                  </CardSubtitle>
                </CardBody>
              </Card>
            </Link>
          </Col>
          <Col xs='12' sm='6' md='3'>
            <Link className='link-card mb-5' to='#'>
              <Card className='widgetRevision'>
                <CardImg
                  top
                  width='100%'
                  src='/icons/032-chef.png'
                  alt='Card image cap'
                />
                <CardBody>
                  <CardTitle tag='h5'>Maladie</CardTitle>
                  <CardSubtitle tag='h6' className='mb-2 text-muted'>
                    Ajouter des Maladies dans le store
                  </CardSubtitle>
                </CardBody>
              </Card>
            </Link>
          </Col>
          <Col xs='12' sm='6' md='3'>
            <Link className='link-card mb-5' to='#'>
              <Card className='widgetRevision'>
                <CardImg
                  top
                  width='100%'
                  src='/icons/001-alcohol.png'
                  alt='Card image cap'
                />
                <CardBody>
                  <CardTitle tag='h5'>Regime</CardTitle>
                  <CardSubtitle tag='h6' className='mb-2 text-muted'>
                    Ajouter des regimes dans le store
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
