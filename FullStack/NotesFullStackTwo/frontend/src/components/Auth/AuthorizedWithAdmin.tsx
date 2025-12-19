// import React from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/authContext';

export default function AuthorizedWithAdmin() {
  const { user, isAuthenticated } = useAuth();
  const isAdmin = Boolean(user?.roles && (user.roles as string[]).includes('admin'));

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Admin Only</h5>
            </Card.Header>
            <Card.Body>
              {!isAuthenticated ? (
                <Alert variant="warning" className="mb-0">
                  You must be logged in and have the admin role to access this page.
                </Alert>
              ) : !isAdmin ? (
                <Alert variant="danger" className="mb-0">
                  You are logged in as <strong>{user?.name || user?.email}</strong> but do not have the admin role.
                </Alert>
              ) : (
                <p className="mb-0">
                  You are logged in as <strong>{user?.name || user?.email}</strong> and have the admin role.
                </p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}