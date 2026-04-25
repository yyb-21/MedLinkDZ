import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Home, HeartPulse, Search, PlusCircle, User, ChevronDown, LogIn, LogOut, Shield, UserCircle2 } from 'lucide-react';
import PremiumButton from '../ui/PremiumButton';
import { useAuth } from '../../context/AuthContext';
import { assetUrl } from '../../services/api';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/search', label: 'Rechercher', icon: Search },
  { to: '/publier', label: 'Publier', icon: PlusCircle },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [menuOpen]);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const isHome = location.pathname === '/';
  const { scrollY } = useScroll();
  const navWidth = useTransform(scrollY, [0, 150], isHome ? ['98%', '90%'] : ['90%', '90%']);
  const navMaxWidth = useTransform(scrollY, [0, 150], isHome ? ['1400px', '1000px'] : ['1000px', '1000px']);

  const avatarSrc = assetUrl(user?.avatar);
  const initials = user ? `${(user.prenom || '')[0] || ''}${(user.nom || '')[0] || ''}`.toUpperCase() : '';

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/', { replace: true });
  };

  return (
    <motion.header
      className="navbar"
      style={{ width: navWidth, maxWidth: navMaxWidth }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <div className="brand-icon-wrap">
            <HeartPulse size={22} className="brand-icon" />
          </div>
          <span className="brand-name">
            Med<span className="brand-accent">Link</span>
            <span className="brand-suffix"> DZ</span>
          </span>
        </Link>

        <nav className="navbar-nav">
          {NAV_LINKS.map(({ to, label }) => {
            const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={`nav-link ${isActive ? 'nav-link--active' : ''}`}
              >
                {label}
                {isActive && (
                  <motion.span className="nav-link-indicator" layoutId="nav-indicator" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="navbar-actions">
          {isAuthenticated ? (
            <div className="user-pill-wrap" ref={menuRef}>
              <button className="user-pill glass" onClick={() => setMenuOpen(v => !v)} aria-label="Menu profil">
                <span className="user-pill__avatar">
                  {avatarSrc ? <img src={avatarSrc} alt="" /> : (initials || <User size={14} />)}
                </span>
                <span className="user-pill__name">{user?.prenom || 'Profil'}</span>
                <ChevronDown size={14} className={`user-pill__chev ${menuOpen ? 'is-open' : ''}`} />
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    className="user-menu glass-bright"
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Link to="/profil" className="user-menu__item">
                      <UserCircle2 size={16} /> Mon profil
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" className="user-menu__item">
                        <Shield size={16} /> Console admin
                      </Link>
                    )}
                    <div className="user-menu__sep" />
                    <button className="user-menu__item user-menu__item--danger" onClick={handleLogout}>
                      <LogOut size={16} /> Déconnexion
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <div className="auth-row">
                <Link to="/login" className="nav-link nav-link--quiet">Connexion</Link>
                <PremiumButton variant="primary" size="sm" onClick={() => navigate('/register')}>
                  S'inscrire
                </PremiumButton>
              </div>
              <Link to="/login" className="nav-login-mobile" aria-label="Se connecter">
                <LogIn size={20} />
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}
