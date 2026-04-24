import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, Globe, ExternalLink } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-brand__logo">
            <HeartPulse size={20} />
          </div>
          <span>MedLink <strong>DZ</strong></span>
        </div>
        <p className="footer-tagline">
          La plateforme solidaire médicale — 58 wilayas d'Algérie.
        </p>

        <div className="footer-links">
          <Link to="/search">Rechercher</Link>
          <Link to="/publier">Publier</Link>
          <Link to="/login">Connexion</Link>
          <a href="#">Confidentialité</a>
          <a href="#">Conditions</a>
        </div>

        <div className="footer-bottom">
          <span>&copy; {year} MedLink DZ. Tous droits réservés.</span>
          <div className="footer-social">
            <a href="#" className="social-btn" aria-label="Website"><Globe size={16} /></a>
            <a href="#" className="social-btn" aria-label="GitHub"><ExternalLink size={16} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
