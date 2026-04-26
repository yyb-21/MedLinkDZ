import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AnnonceCard from '../annonces/AnnonceCard';
import PremiumButton from '../ui/PremiumButton';
import FadeUp from '../animations/FadeUp';
import MagnetButton from '../animations/MagnetButton';
import { CardSkeleton } from '../ui/Skeleton';
import './RecentAnnonces.css';

const MOCK_ANNONCES = [
  { id: '1', type: 'offre', name: 'Doliprane 1000mg × 16 comprimés', category: 'Antalgique', wilaya: 'Alger', date: '2026-04-06' },
  { id: '2', type: 'demande', name: 'Insuline Novomix 30 FlexPen', category: 'Diabète', wilaya: 'Oran', date: '2026-04-05' },
  { id: '3', type: 'offre', name: 'Ventoline 100mcg Spray', category: 'Asthme', wilaya: 'Constantine', date: '2026-04-05' },
  { id: '4', type: 'demande', name: 'Bandelettes Accu-Chek Guide', category: 'Matériel médical', wilaya: 'Annaba', date: '2026-04-04' },
  { id: '5', type: 'offre', name: 'Amoxicilline 500mg × 21 gélules', category: 'Antibiotique', wilaya: 'Blida', date: '2026-04-03' },
  { id: '6', type: 'demande', name: 'Sérum Physiologique 250ml', category: 'Soin', wilaya: 'Tizi Ouzou', date: '2026-04-03' },
];

export default function RecentAnnonces() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="recent-section">
      <div className="container">
        <FadeUp>
          <div className="section-head">
            <div className="section-head__text">
              <p className="section-eyebrow">— Annonces Récentes</p>
              <h2 className="section-title">
                Les dernières <span className="gradient-text">offres & demandes</span>
              </h2>
              <p className="section-subtitle">
                Publiées par la communauté en temps réel à travers toute l'Algérie.
              </p>
            </div>
            <div className="section-head__action">
              <MagnetButton>
                <PremiumButton variant="secondary" iconRight={ArrowRight} onClick={() => navigate('/search')}>
                  Voir tout
                </PremiumButton>
              </MagnetButton>
            </div>
          </div>
        </FadeUp>

        <div className="annonces-masonry">
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <CardSkeleton key={i} />
            ))
          ) : (
            MOCK_ANNONCES.map((a, i) => (
              <AnnonceCard key={a.id} annonce={a} index={i} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
