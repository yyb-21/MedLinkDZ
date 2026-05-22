import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Package, Plus } from 'lucide-react';
import PremiumButton from '../components/ui/PremiumButton';
import FadeUp from '../components/animations/FadeUp';
import { annonceApi } from '../services/api';
import './ProfilPage.css';
import './ProfilAnnoncesPage.css';

export default function ProfilAnnoncesPage() {
  const navigate = useNavigate();
  const [annonces, setAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const data = await annonceApi.myAnnonces();
        if (!mounted) return;
        setAnnonces(Array.isArray(data) ? data : data?.annonces || []);
      } catch {
        if (mounted) setAnnonces([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="profil-page profil-annonces-page">
      <div className="profil-glow" />
      <div className="container">
        <FadeUp>
          <div className="profil-annonces-header glass-bright">
            <div className="profil-annonces-header__left">
              <div className="profil-annonces-header__icon">
                <Package size={22} />
              </div>
              <div>
                <span className="profil-kicker">Espace personnel</span>
                <h1 className="profil-page-title">Mes annonces</h1>
                <p className="profil-page-subtitle">Consultez l'historique complet de vos annonces dans un espace dédié.</p>
              </div>
            </div>

            <div className="profil-annonces-header__actions">
              <PremiumButton variant="ghost" icon={ArrowLeft} size="sm" onClick={() => navigate('/profil')}>
                Retour au profil
              </PremiumButton>
              <PremiumButton variant="primary" icon={Plus} size="sm" onClick={() => navigate('/publier')}>
                Publier
              </PremiumButton>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="profil-annonces-summary glass">
            <div className="profil-annonces-summary__value">{loading ? '—' : annonces.length}</div>
            <div className="profil-annonces-summary__label">
              {loading ? 'Chargement de vos annonces' : 'annonces disponibles dans votre historique'}
            </div>
          </div>
        </FadeUp>

        <div className="profil-annonces-content">
          {loading ? (
            <div className="profil-empty profil-annonces-empty glass-bright">
              <Loader2 size={24} className="profil-spin" />
              <p>Chargement de vos annonces...</p>
            </div>
          ) : annonces.length === 0 ? (
            <FadeUp delay={0.15}>
              <div className="profil-empty profil-annonces-empty glass-bright">
                <Package size={32} />
                <p>Aucune annonce pour le moment</p>
                <PremiumButton variant="primary" size="sm" onClick={() => navigate('/publier')}>
                  Publier une annonce
                </PremiumButton>
              </div>
            </FadeUp>
          ) : (
            <div className="profil-annonce-list">
              {annonces.map((a, i) => {
                const status = (a.status || a.statut || '').toLowerCase();
                const type = (a.type || '').toLowerCase();
                const date = a.createdAt || a.date;
                return (
                  <motion.div
                    key={a.id}
                    className="profil-annonce-item"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="profil-annonce-item__left">
                      <span className={`pm-badge pm-badge--${type === 'offre' ? 'offre' : 'demande'}`}>
                        {type === 'offre' ? '↑' : '↓'}
                      </span>
                      <div>
                        <span className="profil-annonce-item__name">{a.medicamentNom || a.name || a.titre}</span>
                        <span className="profil-annonce-item__date">
                          {date ? new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }) : ''}
                        </span>
                      </div>
                    </div>
                    <span className={`status-badge status-badge--${status === 'active' ? 'active' : 'closed'}`}>
                      {status === 'active' ? 'Active' : 'Terminée'}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
