import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, PlusSquare, User } from 'lucide-react';
import './MobileNav.css';

export default function MobileNav() {
  return (
    <nav className="mobile-nav glass-bright">
      <NavLink to="/" className={({ isActive }) => `mobile-nav__item ${isActive ? 'active' : ''}`}>
        <Home size={20} />
        <span>Accueil</span>
      </NavLink>
      
      <NavLink to="/search" className={({ isActive }) => `mobile-nav__item ${isActive ? 'active' : ''}`}>
        <Search size={20} />
        <span>Rechercher</span>
      </NavLink>
      
      <NavLink to="/publier" className={({ isActive }) => `mobile-nav__item ${isActive ? 'active' : ''}`}>
        <PlusSquare size={20} />
        <span>Publier</span>
      </NavLink>

      <NavLink to="/profil" className={({ isActive }) => `mobile-nav__item ${isActive ? 'active' : ''}`}>
        <User size={20} />
        <span>Profil</span>
      </NavLink>
    </nav>
  );
}
