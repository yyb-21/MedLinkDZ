import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, User, Phone, ChevronLeft, Share2, Heart, AlertCircle, Package } from 'lucide-react';
import PremiumButton from '../components/ui/PremiumButton';
import FadeUp from '../components/animations/FadeUp';
import './AnnonceDetailPage.css';

const MOCK_ANNONCE = {
  id: 1,
  type: 'offre',
  name: 'Doliprane 1000mg — Boîte de 8 comprimés',
  category: 'Antibiotiques',
  wilaya: 'Alger',
  date: '2026-04-04',
  description: 'Médicament non ouvert, acheté en pharmacie. Date d\'expiration en 2027. Je le donne gratuitement à toute personne qui en a besoin dans la wilaya d\'Alger ou ses environs.',
  quantity: '2 boîtes',
  expiryDate: '2027-06-15',
  contact: '05 55 12 34 56',
  author: {
    name: 'Ahmed B.',
    joinDate: 'Mars 2026',
    annonces: 12,
  },
  imageUrl: null,
};

const PLACEHOLDER_IMG = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzBmMjMzOCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmaWxsPSIjMjU0ZjVhIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiPk3DqWRpY2FtZW50PC90ZXh0Pjwvc3ZnPg==';

export default function AnnonceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [showContact, setShowContact] = useState(false);

  // Use a hardcoded value for now to match ProtectedRoute logic
  const isAuthenticated = true;

  // In real app, fetch by id. Using mock data for now.
  const annonce = MOCK_ANNONCE;

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
                  {annonce.expiryDate && (
                    <div className="detail-info-card glass">
                      <Clock size={16} />
                      <div>
                        <span className="detail-info-card__label">Expiration</span>
                        <span className="detail-info-card__value">{new Date(annonce.expiryDate).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</span>
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
                <div className="author-card__stat">
                  <span className="author-card__stat-num">{annonce.author.annonces}</span>
                  <span className="author-card__stat-lbl">annonces publiées</span>
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
