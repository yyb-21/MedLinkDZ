import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, Package, Settings, LogOut, Edit3, Shield, Bell } from 'lucide-react';
import PremiumButton from '../components/ui/PremiumButton';
import FadeUp from '../components/animations/FadeUp';
import './ProfilPage.css';

const MOCK_USER = {
  firstName: 'Ahmed',
  lastName: 'Benali',
  email: 'ahmed.benali@email.com',
  phone: '05 55 12 34 56',
  wilaya: 'Alger',
  joinDate: 'Mars 2026',
  annonces: [
    { id: 1, type: 'offre', name: 'Doliprane 1000mg', date: '2026-04-04', status: 'active' },
    { id: 2, type: 'demande', name: 'Insuline NovoMix 30', date: '2026-04-01', status: 'active' },
    { id: 3, type: 'offre', name: 'Augmentin 1g', date: '2026-03-25', status: 'closed' },
  ],
};

export default function ProfilPage() {
  const [activeTab, setActiveTab] = useState('annonces');
  const user = MOCK_USER;
  const stats = [
    { label: 'Annonces', value: user.annonces.length, icon: Package },
    { label: 'Actives', value: user.annonces.filter(a => a.status === 'active').length, icon: Bell },
    { label: 'Terminées', value: user.annonces.filter(a => a.status === 'closed').length, icon: Shield },
  ];

  return (
    <div className="profil-page">
      <div className="profil-glow" />
      <div className="container">
        {/* Profile Hero / Header */}
        <FadeUp>
          <div className="profil-hero glass-bright">
            <div className="profil-hero__left">
              <div className="profil-avatar">
                <User size={36} />
              </div>
              <div className="profil-info">
                <h1 className="profil-name">{user.firstName} {user.lastName}</h1>
                <div className="profil-meta">
                  <span><MapPin size={13} /> {user.wilaya}</span>
                  <span><Calendar size={13} /> Membre depuis {user.joinDate}</span>
                </div>
              </div>
            </div>
            <div className="profil-hero__right">
              <PremiumButton variant="ghost" icon={Edit3} size="sm">
                Modifier
              </PremiumButton>
              <PremiumButton variant="ghost" icon={Settings} size="sm">
                Paramètres
              </PremiumButton>
            </div>
          </div>
        </FadeUp>

        {/* Stats Row */}
        <FadeUp delay={0.1}>
          <div className="profil-stats">
            {stats.map((s, i) => {
              const StatIcon = s.icon;
              return (
                <div key={i} className="profil-stat glass glow-border">
                  <div className="profil-stat__icon"><StatIcon size={18} /></div>
                  <span className="profil-stat__value">{s.value}</span>
                  <span className="profil-stat__label">{s.label}</span>
                </div>
              );
            })}
          </div>
        </FadeUp>

        {/* Content Grid */}
        <div className="profil-grid">
          {/* Left — Info Card */}
          <FadeUp delay={0.15}>
            <div className="profil-info-card glass-bright">
              <h3 className="profil-card-title">Informations personnelles</h3>
              <div className="profil-info-rows">
                <div className="profil-info-row">
                  <Mail size={16} />
                  <div>
                    <span className="profil-info-row__label">Email</span>
                    <span className="profil-info-row__value">{user.email}</span>
                  </div>
                </div>
                <div className="profil-info-row">
                  <Phone size={16} />
                  <div>
                    <span className="profil-info-row__label">Téléphone</span>
                    <span className="profil-info-row__value">{user.phone}</span>
                  </div>
                </div>
                <div className="profil-info-row">
                  <MapPin size={16} />
                  <div>
                    <span className="profil-info-row__label">Wilaya</span>
                    <span className="profil-info-row__value">{user.wilaya}</span>
                  </div>
                </div>
              </div>

              <button className="logout-btn">
                <LogOut size={16} />
                Se déconnecter
              </button>
            </div>
          </FadeUp>

          {/* Right — Annonces */}
          <FadeUp delay={0.2}>
            <div className="profil-annonces-card glass-bright">
              <div className="profil-tabs">
                <button className={`profil-tab ${activeTab === 'annonces' ? 'active' : ''}`} onClick={() => setActiveTab('annonces')}>
                  Mes annonces
                </button>
                <button className={`profil-tab ${activeTab === 'saved' ? 'active' : ''}`} onClick={() => setActiveTab('saved')}>
                  Sauvegardées
                </button>
              </div>

              {activeTab === 'annonces' && (
                <div className="profil-annonce-list">
                  {user.annonces.map((a, i) => (
                    <motion.div
                      key={a.id}
                      className="profil-annonce-item"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div className="profil-annonce-item__left">
                        <span className={`pm-badge pm-badge--${a.type}`}>
                          {a.type === 'offre' ? '↑' : '↓'}
                        </span>
                        <div>
                          <span className="profil-annonce-item__name">{a.name}</span>
                          <span className="profil-annonce-item__date">{new Date(a.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}</span>
                        </div>
                      </div>
                      <span className={`status-badge status-badge--${a.status}`}>
                        {a.status === 'active' ? 'Active' : 'Terminée'}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 'saved' && (
                <div className="profil-empty">
                  <Package size={32} />
                  <p>Aucune annonce sauvegardée</p>
                </div>
              )}
            </div>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}
