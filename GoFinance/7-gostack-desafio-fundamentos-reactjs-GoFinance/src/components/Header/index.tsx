import React from 'react';

import { Link } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
  pageName: 'Import' | 'Dashboard';
}

const Header: React.FC<HeaderProps> = ({
  size = 'large',
  pageName = 'Dashboard',
}: HeaderProps) => (
  <Container size={size} pageName={pageName}>
    <header>
      <img src={Logo} alt="GoFinances" />
      <nav>
        <Link to="/">Listagem</Link>
        <Link to="/import">Importar</Link>
      </nav>
    </header>
  </Container>
);

export default Header;
