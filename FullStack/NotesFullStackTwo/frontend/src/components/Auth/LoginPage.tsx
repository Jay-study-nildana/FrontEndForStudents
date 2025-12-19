import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../../context/authContext';

export default function LoginPage() {
  const { login, user, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('ChangeMe123!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login({ email, password });
    } catch (err: any) {
      setError(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setEmail('');
    setPassword('');
    setError(null);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={5}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h4 className="mb-0">Sign in</h4>
              <small className="text-muted">Enter your credentials</small>
            </Card.Header>
            <Card.Body>
              {isAuthenticated && user ? (
                <>
                  <Alert variant="success">
                    <strong>Signed in as {user.name}</strong>
                    <div className="mt-1 text-muted">{user.email}</div>
                  </Alert>
                  <div className="d-flex gap-2">
                    <Button variant="outline-primary" onClick={() => window.location.reload()}>
                      Continue
                    </Button>
                  </div>
                </>
              ) : (
                <Form onSubmit={onSubmit}>
                  <Form.Group className="mb-3" controlId="loginEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="loginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  {error && (
                    <Alert variant="danger" className="mt-2">
                      {error}
                    </Alert>
                  )}

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <Button type="submit" disabled={loading} variant="primary">
                      {loading ? <><Spinner animation="border" size="sm" /> Signing in…</> : 'Sign in'}
                    </Button>
                    <Button variant="link" onClick={clear}>
                      Clear
                    </Button>
                  </div>
                </Form>
              )}
            </Card.Body>
            <Card.Footer className="text-center text-muted" style={{ fontSize: 12 }}>
              Don't share your credentials.
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}