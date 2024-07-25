import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap'; // Import des composants de React Bootstrap
import { Link } from 'react-router-dom'; // Import du composant Link de react-router-dom pour la navigation

// Déclaration du composant fonctionnel AppNavbar
const AppNavbar: React.FC = () => {
  return (
    // Composant Navbar de React Bootstrap
    <Navbar bg='dark' variant='dark' expand='lg'>
      {/* Conteneur pour centrer et espacer les éléments de la barre de navigation */}
      <Container>
        {/* Composant Navbar.Brand utilisé pour le titre ou le logo de la navbar */}
        <Navbar.Brand as={Link} to='/'>
          Dico Dz {/* Texte du logo ou titre */}
        </Navbar.Brand>

        {/* Composant Navbar.Toggle pour afficher le bouton de menu dans les petits écrans */}
        <Navbar.Toggle aria-controls='basic-navbar-nav' />

        {/* Composant Navbar.Collapse pour contenir les éléments de navigation qui seront cachés dans les petits écrans */}
        <Navbar.Collapse id='basic-navbar-nav'>
          {/* Composant Nav utilisé pour les éléments de navigation */}
          <Nav className='me-auto'>
            {/* Chaque Nav.Link est un lien de navigation */}
            <Nav.Link as={Link} to='/'>
              Accueil {/* Lien vers la page d'accueil */}
            </Nav.Link>
            <Nav.Link as={Link} to='/translate'>
              Traduire {/* Lien vers la page de traduction */}
            </Nav.Link>
            <Nav.Link as={Link} to='/lexicon'>
              Lexique {/* Lien vers la page de lexique */}
            </Nav.Link>
            <Nav.Link as={Link} to='/courses'>
              Cours {/* Lien vers la page des cours */}
            </Nav.Link>

            {/* Lien vers la page "À Propos" */}
            <Nav.Link as={Link} to='/about'>
              À Propos
            </Nav.Link>
            {/* Ajoutez d'autres liens ici si nécessaire */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// Exportation du composant AppNavbar pour utilisation dans d'autres parties de l'application
export default AppNavbar;
