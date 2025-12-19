// import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

export default function UserProfile() {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">User Profile</h5>
            </Card.Header>
            <Card.Body>
              <p className="text-muted">Placeholder: user details will be displayed here.</p>

              <div style={{ minHeight: 72 }} className="mb-3">
                <div><strong>Name:</strong> —</div>
                <div><strong>Email:</strong> —</div>
                <div><strong>Roles:</strong> —</div>
              </div>

              <div className="d-flex gap-2">
                <Button variant="primary" disabled>Refresh</Button>
                <Button variant="outline-secondary" disabled>Edit</Button>
              </div>
            </Card.Body>
            <Card.Footer className="text-muted small">Data will come from /api/auth/me</Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}