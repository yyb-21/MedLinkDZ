import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, HelpCircle, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeUp from '../components/animations/FadeUp';
import './LegalPages.css';

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      q: "MedLink DZ est-il gratuit ?",
      a: "Oui, notre plateforme est 100% gratuite. La vente et l'achat de médicaments sont strictement interdits dans notre écosystème axé sur la solidarité."
    },
    {
      q: "Ai-je besoin d'une ordonnance pour demander un médicament ?",
      a: "Oui, la grande majorité des médicaments nécessitent une ordonnance valide. Celle-ci sera soigneusement vérifiée par notre équipe médicale avant la publication de votre demande afin d'assurer la sécurité de tous."
    },
    {
      q: "Comment fonctionne la livraison ?",
      a: "MedLink DZ agit uniquement comme intermédiaire de mise en relation. L'échange effectif du médicament se fait en main propre entre les deux parties après qu'elles se soient mises d'accord sur le lieu de rendez-vous."
    },
    {
      q: "Puis-je échanger des médicaments entamés ?",
      a: "Pour des raisons de santé publique stricte, seuls les médicaments dans leur emballage d'origine non ouvert ou les plaquettes intactes sont acceptés sur la plateforme."
    }
  ];

  const toggle = (index) => setActiveIndex(activeIndex === index ? null : index);

  return (
    <div className="legal-page">
      <div className="legal-glow" />
      <div className="container">
        
        <div className="legal-header">
          <Link to="/" className="legal-back-btn">
            <ChevronLeft size={18} /> <span>Retour</span>
          </Link>
          <FadeUp>
            <span className="legal-kicker">Informations</span>
            <h1 className="legal-title">
              <HelpCircle className="legal-title-icon" size={40} />
              Foire Aux Questions
            </h1>
            <p className="legal-subtitle">
              Retrouvez les réponses aux questions les plus fréquentes sur l'utilisation et le fonctionnement de MedLink DZ.
            </p>
          </FadeUp>
        </div>

        <div className="faq-list">
          {faqs.map((faq, i) => {
            const isActive = activeIndex === i;
            return (
              <FadeUp key={i} delay={i * 0.1}>
                <div 
                  className={`faq-item glass ${isActive ? 'active' : ''}`}
                  onClick={() => toggle(i)}
                >
                  <div className="faq-question">
                    {faq.q}
                    <ChevronDown size={20} className="faq-icon" />
                  </div>
                  
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className="faq-answer-wrapper"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                      >
                        <div className="faq-answer">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeUp>
            );
          })}
        </div>

      </div>
    </div>
  );
}
