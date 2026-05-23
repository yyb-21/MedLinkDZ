import React from 'react';
import { ChevronLeft, ShieldAlert, Scale, Gem, FileWarning, Handshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeUp from '../components/animations/FadeUp';
import './LegalPages.css';

export default function ConditionsPage() {
  const sections = [
    {
      icon: Scale,
      title: "1. Introduction et consentement",
      content: "MedLink DZ est une plateforme solidaire d'échange de médicaments en Algérie. En utilisant notre service, vous vous engagez à respecter l'ensemble de ces termes conçus pour protéger les utilisateurs."
    },
    {
      icon: Gem,
      title: "2. Accords et Transactions",
      content: "La plateforme agit uniquement comme un intermédiaire facilitant la mise en relation. MedLink DZ n'intervient pas dans la fixation des prix. L'accord sur la valeur du médicament ou toute éventuelle compensation financière se fait directement et librement entre les utilisateurs."
    },
    {
      icon: ShieldAlert,
      title: "3. Exigence Médicale et Ordonnances",
      content: "La santé prime avant tout. Les demandeurs doivent soumettre des ordonnances légitimes et à jour pour les médicaments la nécessitant. L'équipe médicale de MedLink effectue une modération manuelle pour prévenir les abus et vérifier l'authenticité des prescriptions."
    },
    {
      icon: FileWarning,
      title: "4. Décharge de responsabilité",
      content: "MedLink DZ agit comme facilitateur de mise en relation et non comme une pharmacie. Nous déclinons toute responsabilité concernant l'efficacité, les conditions de conservation ou les éventuels effets secondaires des médicaments échangés."
    },
    {
      icon: Handshake,
      title: "5. Bonnes pratiques d'échange",
      content: "Les utilisateurs s'engagent à vérifier la date d'expiration ainsi que l'intégrité absolue de l'emballage lors de la rencontre. L'échange doit idéalement se dérouler dans un lieu public sécurisé."
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
            <span className="legal-kicker">Légal & Sécurité</span>
            <h1 className="legal-title">
              <ShieldAlert className="legal-title-icon" size={40} />
              Conditions d'utilisation
            </h1>
            <p className="legal-subtitle">
              Prenez connaissance des règles et principes fondamentaux régissant l'utilisation responsable de MedLink DZ.
            </p>
          </FadeUp>
        </div>
        
        <div className="legal-content">
          {sections.map((sec, i) => {
            const Icon = sec.icon;
            return (
              <FadeUp key={i} delay={0.1 + (i * 0.1)}>
                <div className="legal-section glass">
                  <div className="legal-section-icon">
                    <Icon size={24} />
                  </div>
                  <div className="legal-section-content">
                    <h3>{sec.title}</h3>
                    <p>{sec.content}</p>
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
