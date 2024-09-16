import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <Container className='py-5'>
      <Row className='justify-content-center mb-4'>
        <Col md={8} className='text-center'>
          <h1 className='display-4 mb-3 text-primary'>Bienvenue sur Dico Dz</h1>
          <p className='lead'>
            Découvrez la richesse de la langue algérienne avec notre
            dictionnaire interactif.
          </p>
        </Col>
      </Row>
      <Row className='justify-content-center'>
        {['Traduire', 'Lexique', 'Cours'].map((title, index) => (
          <Col key={index} md={4} className='mb-4'>
            <Card className='h-100 shadow-sm'>
              <Card.Body className='d-flex flex-column'>
                <Card.Title className='text-primary'>{title}</Card.Title>
                <Card.Text>{getCardDescription(title)}</Card.Text>
                <Link 
                  to={getPath(title)} 
                  className='mt-auto'
                >
                  <Button
                    variant='outline-primary'
                    className='w-100'
                  >
                    {getButtonText(title)}
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

const getPath = (title: string): string => {
  switch (title) {
    case 'Traduire':
      return '/translate';
    case 'Lexique':
      return '/lexicon';
    case 'Cours':
      return '/courses';
    default:
      return '/';
  }
};

const getCardDescription = (title: string) => {
  switch (title) {
    case 'Traduire':
      return "Trouvez rapidement les traductions entre le français et l'algérien.";
    case 'Lexique':
      return 'Explorez notre vaste collection de mots et expressions algériennes.';
    case 'Cours':
      return "Apprenez l'algérien avec nos cours interactifs et exercices pratiques.";
    default:
      return '';
  }
};

const getButtonText = (title: string) => {
  switch (title) {
    case 'Traduire':
      return 'Commencer la traduction';
    case 'Lexique':
      return 'Parcourir le lexique';
    case 'Cours':
      return 'Accéder aux cours';
    default:
      return 'En savoir plus';
  }
};

export default Home;