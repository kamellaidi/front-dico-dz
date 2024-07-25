import React from 'react';
import { Container } from 'react-bootstrap';

const Home: React.FC = () => {
  return (
    <Container className="bg-light p-5 rounded">
      <h1>Bienvenue sur mon application</h1>
      <p>Ceci est une application simple utilisant React, TypeScript et Bootstrap.</p>
    </Container>
  );
};

export default Home;
