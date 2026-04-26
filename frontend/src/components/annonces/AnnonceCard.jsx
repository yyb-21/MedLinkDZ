/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, ArrowUpRight } from 'lucide-react';
import './AnnonceCard.css';

const PLACEHOLDER_IMG = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzBmMjMzOCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmaWxsPSIjMjU0ZjVhIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiPk3DqWRpY2FtZW50PC90ZXh0Pjwvc3ZnPg==';

export default function AnnonceCard({ annonce, index = 0 }) {
  const navigate = useNavigate();
  const { id, type, name, category, wilaya, date, imageUrl } = annonce;

  return (
    <motion.div
      className="acard glow-border"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.4, 0, 0.2, 1] }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      onClick={() => navigate(`/annonce/${id}`)}
      role="button"
      tabIndex={0}
    >
      {/* Image */}
      <div className="acard__img-wrap">
        <img
          src={imageUrl || PLACEHOLDER_IMG}
          alt={name}
          className="acard__img"
          onError={(e) => { e.target.src = PLACEHOLDER_IMG; }}
        />
        <div className="acard__img-overlay" />
        <div className="acard__type-badge">
          <PremiumBadge variant={type}>{type === 'offre' ? '↑ Offre' : '↓ Demande'}</PremiumBadge>
        </div>
      </div>

      {/* Content */}
      <div className="acard__body">
        <p className="acard__category">{category}</p>
        <h3 className="acard__title">{name}</h3>

        <div className="acard__meta">
          <span className="acard__meta-item">
            <MapPin size={12} />
            {wilaya}
          </span>
          <span className="acard__meta-item">
            <Calendar size={12} />
            {new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
          </span>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="acard__footer">
        <span className="acard__cta">
          Voir les détails
          <ArrowUpRight size={14} />
        </span>
      </div>

      {/* Hover glow */}
      <div className="acard__hover-glow" />
    </motion.div>
  );
}

// Inline badge since it needs dark styles
function PremiumBadge({ children, variant }) {
  return (
    <span className={`pm-badge pm-badge--${variant}`}>{children}</span>
  );
}
