import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, User, Phone, ChevronLeft, Share2, Heart, AlertCircle, Package, Loader } from 'lucide-react';
import PremiumButton from '../components/ui/PremiumButton';
import FadeUp from '../components/animations/FadeUp';
import { annonceApi, assetUrl } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './AnnonceDetailPage.css';

const PLACEHOLDER_IMG = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzBmMjMzOCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmaWxsPSIjMjU0ZjVhIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiPk3DqWRpY2FtZW50PC90ZXh0Pjwvc3ZnPg==';

export default function AnnonceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAuthenticated = !!user;
  
  const [annonce, setAnnonce] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    const fetchAnnonce = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await annonceApi.getById(id);
        
        if (response.success && response.annonce) {
          const data = response.annonce;
          // Transform API response to component format
          const transformedAnnonce = {
            id: data.id,
            type: data.type === 'DON' ? 'offre' : 'demande',
            name: `${data.dci || data.marque || 'Médicament'}`,
            category: data.categorie_nom || 'Autre',
            wilaya: data.wilaya_nom || 'N/A',
            date: data.created_at,
            description: data.description || 'Pas de description fournie',
            quantity: data.quantite ? `${data.quantite} ${data.type === 'DON' ? 'unité(s)' : 'unité(s)'}` : null,
            contact: data.user_phone || 'Non disponible',
            author: {
              name: `${data.user_prenom || ''} ${data.user_nom || ''}`.trim() || 'Utilisateur',
              joinDate: data.user_joined ? new Date(data.user_joined).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) : 'Date inconnue',
              annonces: 0, // Could be fetched separately if needed
            },
            imageUrl: data.medias && data.medias.length > 0 ? assetUrl(data.medias[0].url) : null,
          };
          setAnnonce(transformedAnnonce);
        } else {
          setError('Annonce non trouvée');
        }
      } catch (err) {
        console.error('Error fetching annonce:', err);
        setError('Impossible de charger l\'annonce');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchAnnonce();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="detail-page">
        <div className="detail-glow" />
        <div className="container">
          <FadeUp>
            <button className="detail-back" onClick={() => navigate(-1)}>
              <ChevronLeft size={18} />
              <span>Retour</span>
            </button>
          </FadeUp>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
              <Loader size={40} style={{ color: 'var(--c-green-500)' }} />
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !annonce) {
    return (
      <div className="detail-page">
        <div className="detail-glow" />
        <div className="container">
          <FadeUp>
            <button className="detail-back" onClick={() => navigate(-1)}>
              <ChevronLeft size={18} />
              <span>Retour</span>
            </button>
          </FadeUp>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', flexDirection: 'column', gap: '1rem' }}>
            <AlertCircle size={48} style={{ color: 'var(--c-red-500)' }} />
            <h2 style={{ color: 'var(--c-text-primary)' }}>{error || 'Annonce non trouvée'}</h2>
            <PremiumButton variant="secondary" onClick={() => navigate('/search')}>Retour à la recherche</PremiumButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div className="detail-glow" />
      <div className="container">
        {/* Back button */}
        <FadeUp>
          <button className="detail-back" onClick={() => navigate(-1)}>
            <ChevronLeft size={18} />
            <span>Retour</span>
          </button>
        </FadeUp>

        <div className="detail-grid">
          {/* Left — Image + Info */}
          <div className="detail-main">
            <FadeUp>
              <div className="detail-image-wrap glass">
                <img src={annonce.imageUrl || PLACEHOLDER_IMG} alt={annonce.name} className="detail-image" />
                <div className="detail-image__overlay" />
                <span className={`pm-badge pm-badge--${annonce.type} detail-badge`}>
                  {annonce.type === 'offre' ? '↑ Offre' : '↓ Demande'}
                </span>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="detail-body">
                <p className="detail-category">{annonce.category}</p>
                <h1 className="detail-title">{annonce.name}</h1>

                <div className="detail-meta">
                  <span className="detail-meta__item"><MapPin size={14} /> {annonce.wilaya}</span>
                  <span className="detail-meta__item"><Calendar size={14} /> {new Date(annonce.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                </div>

                {/* Description */}
                <div className="detail-section">
                  <h3 className="detail-section__title">Description</h3>
                  <p className="detail-section__text">{annonce.description}</p>
                </div>

                {/* Details grid */}
                <div className="detail-info-grid">
                  {annonce.quantity && (
                    <div className="detail-info-card glass">
                      <Package size={16} />
                      <div>
                        <span className="detail-info-card__label">Quantité</span>
                        <span className="detail-info-card__value">{annonce.quantity}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right — Sidebar */}
          <div className="detail-sidebar">
            <FadeUp delay={0.15}>
              {/* Author Card */}
              <div className="author-card glass-bright">
                <div className="author-card__header">
                  <div className="author-card__avatar">
                    <User size={22} />
                  </div>
                  <div>
                    <h3 className="author-card__name">{annonce.author.name}</h3>
                    <p className="author-card__join">Membre depuis {annonce.author.joinDate}</p>
                  </div>
                </div>

                {/* CTA - Gated Authentication */}
                {!isAuthenticated ? (
                  <PremiumButton variant="primary" fullWidth icon={Phone} onClick={() => navigate('/login')}>
                    Connectez-vous pour voir
                  </PremiumButton>
                ) : !showContact ? (
                  <PremiumButton variant="primary" fullWidth icon={Phone} onClick={() => setShowContact(true)}>
                    Afficher le contact
                  </PremiumButton>
                ) : (
                  <motion.div
                    className="contact-revealed glass"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <Phone size={16} />
                    <span className="contact-revealed__number">{annonce.contact}</span>
                  </motion.div>
                )}

                <div className="author-card__actions">
                  <button className={`action-btn ${liked ? 'liked' : ''}`} onClick={() => setLiked(!liked)}>
                    <Heart size={16} fill={liked ? 'currentColor' : 'none'} /> {liked ? 'Sauvegardé' : 'Sauvegarder'}
                  </button>
                  <button className="action-btn">
                    <Share2 size={16} /> Partager
                  </button>
                </div>
              </div>

              {/* Safety note */}
              <div className="safety-note glass">
                <AlertCircle size={16} />
                <div>
                  <strong>Conseils de sécurité</strong>
                  <p>Vérifiez toujours la date d'expiration et l'intégrité de l'emballage avant tout échange.</p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </div>
  );
}
