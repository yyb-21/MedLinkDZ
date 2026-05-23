import React from 'react';
import { ChevronLeft, Lock, Database, Search, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeUp from '../components/animations/FadeUp';
import './LegalPages.css';

export default function ConfidentialitePage() {
  const policies = [
    {
      icon: Database,
      title: "Collecte des Données Minimaliste",
      desc: "Dans un souci de respect de votre vie privée, nous collectons uniquement votre nom, prénom, numéro de téléphone, email et votre wilaya. Ces données servent exclusivement à faciliter la mise en relation sécurisée avec d'autres utilisateurs."
    },
    {
      icon: Search,
      title: "Ordonnances et Dossiers Médicaux",
      desc: "Vos données de santé sont ultra-sensibles. Les ordonnances téléchargées sont chiffrées sur nos serveurs et uniquement consultables par l'équipe de modération de MedLink DZ. Elles ne sont jamais partagées, ni visibles par les donateurs de médicaments."
    },
    {
      icon: UserCheck,
      title: "Confidentialité des Contacts",
      desc: "Vos coordonnées directes (téléphone, email) ne sont par défaut jamais affichées publiquement. Le bouton d'appel ne se dévoile qu'aux utilisateurs dûment authentifiés cherchant à vous contacter pour finaliser un échange."
    }
  ];

  return (
    <div className="legal-page">
      <div className="legal-glow" />
      <div className="container">
        
        <div className="legal-header">
          <Link to="/" className="legal-back-btn">
            <ChevronLeft size={18} /> <span>Retour</span>
          </Link>
          <FadeUp>
            <span className="legal-kicker">Engagement</span>
            <h1 className="legal-title">
              <Lock className="legal-title-icon" size={40} />
              Politique de confidentialité
            </h1>
            <p className="legal-subtitle">
              Vos données personnelles et médicales exigent une protection absolue. Découvrez comment nous assurons leur sécurité.
            </p>
          </FadeUp>
        </div>
        
        <div className="legal-content">
          {policies.map((pol, i) => {
            const Icon = pol.icon;
            return (
              <FadeUp key={i} delay={0.1 + (i * 0.1)}>
                <div className="legal-section glass">
                  <div className="legal-section-icon">
                    <Icon size={24} />
                  </div>
                  <div className="legal-section-content">
                    <h3>{pol.title}</h3>
                    <p>{pol.desc}</p>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>

      </div>
    </div>
  );
}
