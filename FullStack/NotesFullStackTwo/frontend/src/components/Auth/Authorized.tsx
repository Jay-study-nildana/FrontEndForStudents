// import React from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/authContext';

export default function Authorized() {
  const { user, isAuthenticated } = useAuth();

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Protected</h5>
            </Card.Header>
            <Card.Body>
              {!isAuthenticated ? (
                <Alert variant="warning" className="mb-0">
                  You must be logged in to access this page.
                </Alert>
              ) : (
                <p className="mb-0">
                  You are logged in as <strong>{user?.name || user?.email}</strong>. Only authenticated users can access this page.
                </p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}