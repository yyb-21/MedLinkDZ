import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartPulse, Search, PlusCircle, User, Menu, X, ChevronDown } from 'lucide-react';
import PremiumButton from '../ui/PremiumButton';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/search', label: 'Rechercher', icon: Search },
  { to: '/publier', label: 'Publier', icon: PlusCircle },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAuthenticated = false;

  return (
    <>
      <motion.header
        className="navbar"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="container navbar-inner">
          {/* Brand */}
          <Link to="/" className="navbar-brand">
            <div className="brand-icon-wrap">
              <HeartPulse size={22} className="brand-icon" />
            </div>
            <span className="brand-name">
              Med<span className="brand-accent">Link</span>
              <span className="brand-suffix"> DZ</span>
            </span>
          </Link>

          {/* Center Nav */}
          <nav className="navbar-nav">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`nav-link ${location.pathname.startsWith(to) ? 'nav-link--active' : ''}`}
              >
                {label}
                {location.pathname.startsWith(to) && (
                  <motion.span className="nav-link-indicator" layoutId="nav-indicator" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="navbar-actions">
            {isAuthenticated ? (
              <div className="user-pill glass">
                <User size={16} />
                <span>Mon Profil</span>
                <ChevronDown size={14} />
              </div>
            ) : (
              <div className="auth-row">
                <Link to="/login" className="nav-link nav-link--quiet">Connexion</Link>
                <PremiumButton variant="primary" size="sm" onClick={() => navigate('/register')}>
                  S'inscrire
                </PremiumButton>
              </div>
            )}

            {/* Mobile toggle */}
            <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu glass-bright"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            {NAV_LINKS.map(({ to, label, icon: Icon }) => (
              <Link key={to} to={to} className="mobile-link" onClick={() => setMobileOpen(false)}>
                <Icon size={18} />
                {label}
              </Link>
            ))}
            <div className="mobile-auth">
              <Link to="/login" className="mobile-link" onClick={() => setMobileOpen(false)}>Connexion</Link>
              <PremiumButton variant="primary" fullWidth onClick={() => { navigate('/register'); setMobileOpen(false); }}>
                S'inscrire
              </PremiumButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
