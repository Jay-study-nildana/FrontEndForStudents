import { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useAuth } from '../../context/authContext';
import useTestRoles from '../../hooks/useTestRoles';

function isAdminUser(user: any) {
  if (!user) return false;
  if (user.role === 'admin') return true;
  const roles = user.roles ?? user.roleNames ?? null;
  if (Array.isArray(roles)) return roles.includes('admin');
  return false;
}

export default function AdminEndPoint() {
  const { isAuthenticated, user, logout } = useAuth();
  const { adminMessage, loading, error, fetchAdminOnly } = useTestRoles();

  const canCallAdmin = isAuthenticated && isAdminUser(user);

  useEffect(() => {
    if (canCallAdmin) {
      fetchAdminOnly().catch(() => {});
    }
  }, [canCallAdmin, fetchAdminOnly]);

  let body;
  if (!isAuthenticated) {
    body = <p className="mb-0">Placeholder: authentication required.</p>;
  } else if (!isAdminUser(user)) {
    body = <p className="mb-0">Access denied: admin role required.</p>;
  } else {
    body = (
      <>
        {loading ? (
          <p className="mb-0">Loading...</p>
        ) : error ? (
          <p className="text-danger mb-0">{error}</p>
        ) : (
          <p className="mb-0">{adminMessage ?? 'Placeholder content for admin users.'}</p>
        )}

        <p className="mt-3 mb-0">Admin: {user?.email ?? user?.name ?? 'Unknown'}</p>
        <div className="mt-3 d-flex gap-2">
          <Button variant="primary" onClick={() => fetchAdminOnly().catch(() => {})} disabled={loading}>
            Refresh
          </Button>
          <Button variant="secondary" onClick={logout}>
            Logout
          </Button>
        </div>
      </>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">EndPoint with Auth and Admin Role</h5>
            </Card.Header>
            <Card.Body>{body}</Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}