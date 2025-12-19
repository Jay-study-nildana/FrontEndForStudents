import { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import useTestRoles from '../../hooks/useTestRoles';

export default function AuthOnlyEndPoint() {
  const { authMessage, loading, error, fetchAuthOnly } = useTestRoles();

  useEffect(() => {
    fetchAuthOnly().catch(() => {});
  }, [fetchAuthOnly]);

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Auth Only EndPoint</h5>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <p className="mb-0">Loading...</p>
              ) : error ? (
                <p className="text-danger mb-0">{error}</p>
              ) : (
                <p className="mb-0">{authMessage ?? 'Placeholder: you must be logged in to view this content.'}</p>
              )}
            </Card.Body>
            <Card.Body>
              <div className="d-flex gap-2">
                <Button variant="primary" onClick={() => fetchAuthOnly().catch(() => {})} disabled={loading}>
                  Refresh
                </Button>
                <div className="flex-grow-1" />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}