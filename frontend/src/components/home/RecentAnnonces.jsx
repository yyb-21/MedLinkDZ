import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AnnonceCard from '../annonces/AnnonceCard';
import PremiumButton from '../ui/PremiumButton';
import FadeUp from '../animations/FadeUp';
import MagnetButton from '../animations/MagnetButton';
import { CardSkeleton } from '../ui/Skeleton';
import { annonceApi, assetUrl } from '../../services/api';
import './RecentAnnonces.css';

export default function RecentAnnonces() {
  const navigate = useNavigate();
  const [annonces, setAnnonces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Fetch only published annonces (limit to 6 for display)
        const response = await annonceApi.list();
        
        if (response.success && Array.isArray(response.annonces)) {
          // Take first 6 annonces for the home page preview
          const recentAnnonces = response.annonces.slice(0, 6).map(annonce => ({
            id: annonce.id,
            type: annonce.type === 'DON' ? 'offre' : 'demande',
            name: annonce.dci || annonce.marque || 'Médicament',
            category: annonce.categorie_nom || 'Autre',
            wilaya: annonce.wilaya_nom || 'N/A',
            date: annonce.created_at || new Date().toISOString(),
            imageUrl: annonce.imageUrl ? assetUrl(annonce.imageUrl) : null,
            description: annonce.description,
          }));
          setAnnonces(recentAnnonces);
        } else {
          setAnnonces([]);
        }
      } catch (err) {
        console.error('Error fetching annonces:', err);
        setError('Impossible de charger les annonces');
        setAnnonces([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnonces();
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
          ) : error ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '2rem', color: 'var(--c-text-secondary)' }}>
              <p>{error}</p>
            </div>
          ) : annonces.length > 0 ? (
            annonces.map((a, i) => (
              <AnnonceCard key={a.id} annonce={a} index={i} />
            ))
          ) : (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '2rem', color: 'var(--c-text-secondary)' }}>
              <p>Aucune annonce disponible pour le moment</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
