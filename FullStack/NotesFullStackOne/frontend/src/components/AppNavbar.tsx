// import React from 'react';
// import React, { useState } from 'react';
import { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function AppNavbar() {
  const [expanded, setExpanded] = useState(false);

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
          <Navbar.Brand className="text-primary fw-bold" onClick={() => setExpanded(false)}>
            NotesApp
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link onClick={() => setExpanded(false)}>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link onClick={() => setExpanded(false)}>About</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link onClick={() => setExpanded(false)}>Contact</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/noteshq">                 
              <Nav.Link onClick={() => setExpanded(false)}>Notes HQ</Nav.Link>
            </LinkContainer>                                
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}