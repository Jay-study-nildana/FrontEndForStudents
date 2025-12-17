// import React from 'react';

import { Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function Home() {
  return (
    <Container className="py-3">
      <h3>Home</h3>
      <p>Welcome — frontend is ready. Add components and connect to API.</p>
      <LinkContainer to="/noteshq">
        <Button variant="primary">Go to Notes HQ</Button>
      </LinkContainer>
    </Container>
  );
}