import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, MapPin, ArrowRight, Sparkles, Shield, Clock } from 'lucide-react';
import BlurText from '../animations/BlurText';
import MagnetButton from '../animations/MagnetButton';
import PremiumButton from '../ui/PremiumButton';
import WilayaSelect from '../ui/WilayaSelect';
import './HeroSection.css';

const FLOATING_PILLS = [
  { label: 'Doliprane 1000mg', color: '#10b981', top: '20%', left: '6%', delay: 0 },
  { label: 'Insuline Novomix', color: '#14b8a6', top: '55%', left: '2%', delay: 0.4 },
  { label: 'Ventoline', color: '#34d399', top: '75%', left: '10%', delay: 0.8 },
  { label: 'Amoxicilline 500', color: '#10b981', top: '15%', right: '4%', delay: 0.2 },
  { label: 'Levothyrox 50', color: '#2dd4bf', top: '45%', right: '2%', delay: 0.6 },
  { label: 'Serum Physio', color: '#6ee7b7', top: '70%', right: '8%', delay: 1 },
];

const TRUST_BADGES = [
  { icon: Shield, label: 'Sécurisé & Vérifié' },
  { icon: Sparkles, label: '1200+ Annonces' },
  { icon: Clock, label: 'En temps réel' },
];

export default function HeroSection() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [wilaya, setWilaya] = useState('');

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, -80]);
  const pillScale = useTransform(scrollY, [0, 300], [1, 0.85]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append('q', searchQuery);
    if (wilaya) params.append('wilaya', wilaya);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <section className="hero">
      {/* Scroll-linked content */}
      <motion.div className="hero-body" style={{ opacity: heroOpacity, y: heroY }}>

        {/* Floating pill badges */}
        {FLOATING_PILLS.map((pill, i) => (
          <motion.div
            key={i}
            className="floating-pill glass"
            style={{
              top: pill.top,
              left: pill.left,
              right: pill.right,
              scale: pillScale,
            }}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: pill.delay + 0.8, duration: 0.6 }}
          >
            <span className="pill-dot" style={{ background: pill.color }} />
            <span className="pill-label">{pill.label}</span>
          </motion.div>
        ))}

        {/* Center Content */}
        <div className="container hero-center">
          {/* Badge */}
          <motion.div
            className="hero-badge-wrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="hero-badge glass-bright">
              <Sparkles size={14} className="badge-icon" />
              <span>Plateforme N°1 de partage médicaments — Algérie</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <BlurText text="Trouvez les médicaments" delay={60} />
            <br />
            <BlurText text="dont vous avez besoin," delay={60} className="hero-teal-text" />
            <br />
            <BlurText text="rapidement." delay={60} />
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            MedLink DZ connecte patients, pharmacies et donateurs pour faciliter l'accès aux traitements essentiels à travers les 69 wilayas d'Algérie.
          </motion.p>

          {/* Search Box */}
          <motion.form
            className="hero-search glass-bright"
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.85, duration: 0.5 }}
          >
            <div className="search-field">
              <Search className="search-field__icon" size={18} />
              <input
                type="text"
                className="search-field__input"
                placeholder="Médicament, DCI, marque..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="search-divider" />

            <div className="search-wilaya">
              <MapPin size={16} className="search-wilaya__icon" />
              <WilayaSelect
                value={wilaya}
                onChange={setWilaya}
                label=""
                placeholder="Toutes wilayas"
              />
            </div>

            <MagnetButton padding={60}>
              <PremiumButton type="submit" variant="primary" size="lg" iconRight={ArrowRight}>
                Rechercher
              </PremiumButton>
            </MagnetButton>
          </motion.form>

          {/* Trust Badges */}
          <motion.div
            className="trust-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            {TRUST_BADGES.map(({ icon: Icon, label }, i) => (
              <div key={i} className="trust-item">
                <Icon size={14} className="trust-icon" />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="scroll-dot"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
