import { useState } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../context/authContext';

export default function AppNavbar() {
  const [expanded, setExpanded] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const close = () => setExpanded(false);

  return (
    <Navbar
      bg="light"
      variant="light"
      expand="md"
      className="shadow-sm mb-3 rounded"
      sticky="top"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="text-primary fw-bold" onClick={close}>
            NotesApp
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link onClick={close}>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link onClick={close}>About</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link onClick={close}>Contact</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/noteshq">
              <Nav.Link onClick={close}>Notes HQ</Nav.Link>
            </LinkContainer>
          </Nav>

          <Nav className="align-items-center">
            {!isAuthenticated ? (
              <>
                <LinkContainer to="/login">
                  <Nav.Link onClick={close}>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link onClick={close}>Register</Nav.Link>
                </LinkContainer>
              </>
            ) : (
              <>
                <LinkContainer to="/profile">
                  <Nav.Link onClick={close}>Profile</Nav.Link>
                </LinkContainer>
                <Nav.Item className="me-2 align-self-center text-muted">
                  {user?.name}
                </Nav.Item>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => {
                    logout();
                    close();
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
