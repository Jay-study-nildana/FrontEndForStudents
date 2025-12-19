// ...existing code...
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function Home() {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card className="shadow-sm">
            <Card.Header>
              <h4 className="mb-0">Welcome</h4>
              <small className="text-muted">Quick links</small>
            </Card.Header>
            <Card.Body className="d-flex flex-column gap-3">
              <p className="mb-0">Use the links below to navigate to the example pages: These are gated in the front end</p>

              <div className="d-flex flex-wrap gap-2">
                <LinkContainer to="/anonymous">
                  <Button variant="outline-primary">Anonymous</Button>
                </LinkContainer>

                <LinkContainer to="/authorized">
                  <Button variant="primary">Authorized</Button>
                </LinkContainer>

                <LinkContainer to="/authorized-admin">
                  <Button variant="warning">Authorized (Admin)</Button>
                </LinkContainer>
              </div>
            </Card.Body>
            <Card.Body className="d-flex flex-column gap-3">
              <p className="mb-0">Thes endpoints are gated in the backend:</p>
              <div className="d-flex flex-wrap gap-2">
                {/* Added buttons for the new testroles routes */}
                <LinkContainer to="/testroles/public">
                  <Button variant="outline-secondary">Public EndPoint</Button>
                </LinkContainer>

                <LinkContainer to="/testroles/authonly">
                  <Button variant="secondary">Auth Only EndPoint</Button>
                </LinkContainer>

                <LinkContainer to="/testroles/adminonly">
                  <Button variant="warning">Admin EndPoint</Button>
                </LinkContainer>
              </div>
            </Card.Body>            
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
// ...existing code...