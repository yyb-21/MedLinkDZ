import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Package, Plus, Search, User } from 'lucide-react';
import './MobileNav.css';

export default function MobileNav() {
  return (
    <nav className="mobile-nav glass-bright" aria-label="Navigation mobile principale">
      <NavLink to="/" end className={({ isActive }) => `mobile-nav__item ${isActive ? 'active' : ''}`}>
        <Home size={22} />
        <span>Accueil</span>
      </NavLink>
      
      <NavLink to="/search" end className={({ isActive }) => `mobile-nav__item ${isActive ? 'active' : ''}`}>
        <Search size={22} />
        <span>Rechercher</span>
      </NavLink>
      
      <NavLink to="/publier" end className={({ isActive }) => `mobile-nav__item mobile-nav__item--center ${isActive ? 'active' : ''}`}>
        <div className="plus-icon-wrap">
          <Plus size={22} strokeWidth={2.5} />
        </div>
        <span>Publier</span>
      </NavLink>

      <NavLink to="/profil/annonces" end className={({ isActive }) => `mobile-nav__item ${isActive ? 'active' : ''}`}>
        <Package size={22} />
        <span>Annonces</span>
      </NavLink>

      <NavLink to="/profil" end className={({ isActive }) => `mobile-nav__item ${isActive ? 'active' : ''}`}>
        <User size={22} />
        <span>Profil</span>
      </NavLink>
    </nav>
  );
}
