import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

// Définition du type pour les éléments de navigation
type NavItem = {
  path: string;
  label: string;
  isAdmin?: boolean;
};

// Liste des éléments de navigation
const navItems: NavItem[] = [
  { path: '/', label: 'Accueil' },
  { path: '/translate', label: 'Traduire' },
  { path: '/lexicon', label: 'Lexique' },
  { path: '/courses', label: 'Cours' },
  { path: '/about', label: 'À Propos' },
  { path: '/admin/words', label: 'Gestion du site', isAdmin: true },
];

const StyledNavbar = styled(Navbar)`
  background-color: #d4ebd5;
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
    color: #1b5e20;
  }
`;

const StyledNavLink = styled(Nav.Link)<{ $isAdmin?: boolean }>`
  color: ${props => props.$isAdmin ? '#1b5e20' : '#4caf50'} !important;
  margin: 0 10px;
  position: relative;
  transition: color 0.3s ease;
  text-decoration: none !important;
  font-weight: ${props => props.$isAdmin ? 'bold' : 'normal'};

  &:hover, &.active {
    color: ${props => props.$isAdmin ? '#0a3d0a' : '#2e7d32'} !important;
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
                $isAdmin={item.isAdmin}
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