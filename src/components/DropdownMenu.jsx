import React from 'react';
import { NavLink } from 'react-router-dom';
import './DropdownMenu.css'; // Importe o CSS para estilização

const DropdownMenu = ({ isOpen, toggleMenu }) => {
  return (
    <div className={`dropdown-menu ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
      <ul>
        <li><NavLink to="/posts/create">Criar Publicação</NavLink></li>
        <li><NavLink to="/tournament">Criar Torneio</NavLink></li>
        <li><NavLink to="/ranking">Ver Ranking</NavLink></li>
        {/* Adicione mais opções conforme necessário */}
      </ul>
    </div>
  );
};

export default DropdownMenu;