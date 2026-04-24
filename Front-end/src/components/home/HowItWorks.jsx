import React from 'react';
import { motion } from 'framer-motion';
import { Search, PenSquare, HeartHandshake } from 'lucide-react';
import FadeUp from '../animations/FadeUp';
import './HowItWorks.css';

const STEPS = [
  { id: 1, icon: Search, title: 'Recherchez', color: '#10b981', desc: 'Trouvez facilement le médicament dont vous avez besoin parmi des centaines d\'annonces vérifiées.' },
  { id: 2, icon: PenSquare, title: 'Publiez', color: '#14b8a6', desc: 'Offrez des médicaments non utilisés ou faites une demande en quelques clics, sans frais.' },
  { id: 3, icon: HeartHandshake, title: 'Connectez-vous', color: '#34d399', desc: 'Entrez en contact sécurisé avec les membres de votre wilaya pour finaliser l\'échange solidaire.' },
];

export default function HowItWorks() {
  return (
    <section className="hiw-section">
      {/* Section divider gradient line */}
      <div className="hiw-gradient-line" />

      <div className="container">
        <FadeUp>
          <div className="hiw-head">
            <p className="section-eyebrow">— Comment ça marche ?</p>
            <h2 className="section-title">
              Simple. Solidaire. <span className="gradient-text">Efficace.</span>
            </h2>
            <p className="section-subtitle">
              Trois étapes pour accéder aux médicaments ou aider votre communauté.
            </p>
          </div>
        </FadeUp>

        <div className="hiw-steps">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <FadeUp key={step.id} delay={i * 0.15}>
                <div className="hiw-step glass glow-border">
                  {/* Step number */}
                  <div className="hiw-step__num">{String(step.id).padStart(2, '0')}</div>

                  {/* Icon */}
                  <div className="hiw-step__icon-ring" style={{ '--step-color': step.color }}>
                    <Icon size={26} style={{ color: step.color }} />
                  </div>

                  <h3 className="hiw-step__title" style={{ color: step.color }}>{step.title}</h3>
                  <p className="hiw-step__desc">{step.desc}</p>

                  {/* Decorative line connector */}
                  {i < STEPS.length - 1 && (
                    <div className="hiw-connector" style={{ '--step-color': step.color }} />
                  )}
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
