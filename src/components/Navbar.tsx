import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

// Définition du type pour les éléments de navigation
type NavItem = {
  path: string;
  label: string;
};

// Liste des éléments de navigation
const navItems: NavItem[] = [
  { path: '/', label: 'Accueil' },
  { path: '/translate', label: 'Traduire' },
  { path: '/lexicon', label: 'Lexique' },
  { path: '/courses', label: 'Cours' },
  { path: '/about', label: 'À Propos' },
];

const StyledNavbar = styled(Navbar)`
  background-color: #e8f5e9; // Vert pastel très clair
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
`;

const StyledNavbarBrand = styled(Navbar.Brand)`
  font-family: 'Georgia', serif;
  font-size: 2rem;
  font-weight: bold;
  font-style: italic;
  color: #2e7d32 !important;
  text-decoration: none !important;
  
  span {
    color: #f44336;
  }
`;

const StyledNavLink = styled(Nav.Link)`
  color: #4caf50 !important; // Vert moyen pour inactif
  margin: 0 10px;
  position: relative;
  transition: color 0.3s ease;
  text-decoration: none !important;

  &:hover, &.active {
    color: #2e7d32 !important; // Vert foncé pour actif et survol
  }
`;

const AppNavbar: React.FC = () => {
  const location = useLocation();

  return (
    <StyledNavbar expand="lg" sticky="top">
      <Container>
        <StyledNavbarBrand as={Link} to="/">
          Dico Dz
        </StyledNavbarBrand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {navItems.map((item) => (
              <StyledNavLink
                key={item.path}
                as={Link}
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
              >
                {item.label}
              </StyledNavLink>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  );
};

export default AppNavbar;