// import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function Anonymous() {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Public</h5>
            </Card.Header>
            <Card.Body>
              <p className="mb-0">You can see this even if you are not logged in.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}