// ...existing code...
import { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import useTestRoles from '../../hooks/useTestRoles';

export default function PublicEndPoint() {
  const { publicMessage, loading, error, fetchPublic } = useTestRoles();

  useEffect(() => {
    fetchPublic().catch(() => {});
  }, [fetchPublic]);

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Public EndPoint</h5>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <p className="mb-0">Loading...</p>
              ) : error ? (
                <p className="text-danger mb-0">{error}</p>
              ) : (
                <p className="mb-0">{publicMessage ?? 'Placeholder content: this page is accessible to anyone.'}</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
// ...existing code...