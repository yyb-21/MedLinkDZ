import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, Mail, MapPin, Phone, ArrowUpRight, Heart } from 'lucide-react';
import './Footer.css';

const FOOTER_NAV = [
  {
    title: 'Navigation',
    links: [
      { label: 'Accueil', to: '/' },
      { label: 'Rechercher', to: '/search' },
      { label: 'Publier une annonce', to: '/publier' },
      { label: 'Mon Profil', to: '/profil' },
    ],
  },
  {
    title: 'Informations',
    links: [
      { label: 'Comment ça marche', to: '/#how-it-works' },
      { label: 'Conditions d\'utilisation', to: '#' },
      { label: 'Politique de confidentialité', to: '#' },
      { label: 'FAQ', to: '#' },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Top glow decoration */}
      <div className="footer-glow" />
      <div className="footer-gradient-line" />

      <div className="container">
        {/* Main footer grid */}
        <div className="footer-grid">
          {/* Brand column */}
          <div className="footer-col footer-col--brand">
            <Link to="/" className="footer-logo">
              <div className="footer-logo__icon">
                <HeartPulse size={20} />
              </div>
              <span className="footer-logo__text">
                Med<span className="footer-logo__accent">Link</span>
                <span className="footer-logo__suffix"> DZ</span>
              </span>
            </Link>
            <p className="footer-description">
              La plateforme solidaire qui connecte les citoyens algériens pour l'échange gratuit de médicaments à travers les 69 wilayas.
            </p>
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <MapPin size={14} />
                <span>Algérie — 69 wilayas</span>
              </div>
              <div className="footer-contact-item">
                <Mail size={14} />
                <span>contact@medlink.dz</span>
              </div>
              <div className="footer-contact-item">
                <Phone size={14} />
                <span>+213 000 000 000</span>
              </div>
            </div>
          </div>

          {/* Navigation columns */}
          {FOOTER_NAV.map((section) => (
            <div className="footer-col" key={section.title}>
              <h4 className="footer-col__title">{section.title}</h4>
              <ul className="footer-col__list">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="footer-col__link">
                      {link.label}
                      <ArrowUpRight size={12} className="footer-col__link-arrow" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CTA column */}
          <div className="footer-col footer-col--cta">
            <h4 className="footer-col__title">Rejoignez-nous</h4>
            <p className="footer-cta-text">
              Vous avez des médicaments non utilisés ? Aidez votre communauté en les proposant gratuitement.
            </p>
            <Link to="/publier" className="footer-cta-btn">
              <span>Publier une annonce</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <span className="footer-copyright">
            &copy; {year} MedLink DZ. Tous droits réservés.
          </span>
          <span className="footer-made-with">
            Fait avec <Heart size={12} className="footer-heart" /> en Algérie
          </span>
        </div>
      </div>
    </footer>
  );
}
