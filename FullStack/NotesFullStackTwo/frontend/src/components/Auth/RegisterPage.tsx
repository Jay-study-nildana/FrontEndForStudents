import React, { useState } from 'react';
import { Card, Form, Button, Alert, Spinner, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../context/authContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [createdUser, setCreatedUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await register({ email, password, name });
      setCreatedUser(user);
    } catch (err: any) {
      setError(err?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setEmail('');
    setName('');
    setPassword('');
    setError(null);
    setCreatedUser(null);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h4 className="mb-0">Create an account</h4>
              <small className="text-muted">Sign up to get started</small>
            </Card.Header>
            <Card.Body>
              {createdUser ? (
                <>
                  <Alert variant="success">
                    <strong>Welcome, {createdUser.name}!</strong>
                    <div className="mt-1">{createdUser.email}</div>
                    <div className="mt-2 text-muted" style={{ fontSize: 12 }}>
                      Account created: {createdUser.createdAt ? new Date(createdUser.createdAt).toLocaleString() : '—'}
                    </div>
                  </Alert>
                  <div className="d-flex gap-2">
                    <Button variant="outline-primary" onClick={clear}>Register another</Button>
                  </div>
                </>
              ) : (
                <Form onSubmit={onSubmit}>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Form.Text className="text-muted">
                      Use at least 8 characters including a number and a symbol.
                    </Form.Text>
                  </Form.Group>

                  {error && (
                    <Alert variant="danger" className="mt-2">
                      {error}
                    </Alert>
                  )}

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <Button type="submit" disabled={loading} variant="primary">
                      {loading ? (
                        <>
                          <Spinner animation="border" size="sm" role="status" aria-hidden="true" />{' '}
                          Registering…
                        </>
                      ) : (
                        'Create account'
                      )}
                    </Button>
                    <Button variant="link" onClick={clear}>
                      Clear
                    </Button>
                  </div>
                </Form>
              )}
            </Card.Body>
            <Card.Footer className="text-center text-muted" style={{ fontSize: 12 }}>
              By creating an account you agree to the terms.
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}