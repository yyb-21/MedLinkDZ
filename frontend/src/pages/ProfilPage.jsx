import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  User, Mail, Phone, MapPin, Calendar, Package, Settings, LogOut,
  Edit3, Shield, Camera, X, Loader2,
} from 'lucide-react';
import PremiumButton from '../components/ui/PremiumButton';
import Input from '../components/ui/Input';
import WilayaSelect from '../components/ui/WilayaSelect';
import FadeUp from '../components/animations/FadeUp';
import { useAuth } from '../context/AuthContext';
import { annonceApi, assetUrl } from '../services/api';
import './ProfilPage.css';

export default function ProfilPage() {
  const { user, loading: authLoading, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('annonces');
  const [annonces, setAnnonces] = useState([]);
  const [loadingAnnonces, setLoadingAnnonces] = useState(true);

  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({ nom: '', prenom: '', telephone: '', wilaya: '' });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState(null);
  const fileRef = useRef(null);

  useEffect(() => {
    if (user) {
      setForm({
        nom: user.nom || '',
        prenom: user.prenom || '',
        telephone: user.telephone || '',
        wilaya: user.wilaya || '',
      });
    }
  }, [user]);

  useEffect(() => {
    let mounted = true;
    if (!user) return;
    (async () => {
      try {
        const data = await annonceApi.myAnnonces();
        if (mounted) setAnnonces(Array.isArray(data) ? data : data?.annonces || []);
      } catch {
        if (mounted) setAnnonces([]);
      } finally {
        if (mounted) setLoadingAnnonces(false);
      }
    })();
    return () => { mounted = false; };
  }, [user]);

  const stats = useMemo(() => {
    const active = annonces.filter(a => (a.status || a.statut) === 'active' || (a.status || a.statut) === 'ACTIVE').length;
    const closed = annonces.length - active;
    return [
      { label: 'Annonces', value: annonces.length, icon: Package },
      { label: 'Actives', value: active, icon: Shield },
      { label: 'Terminées', value: closed, icon: Package },
    ];
  }, [annonces]);

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
    : '—';

  const onPickAvatar = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setAvatarFile(f);
    setAvatarPreview(URL.createObjectURL(f));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setEditError(null);
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v ?? ''));
      if (avatarFile) fd.append('avatar', avatarFile);
      await updateProfile(fd);
      setEditOpen(false);
      setAvatarFile(null);
      setAvatarPreview(null);
    } catch (err) {
      setEditError(err?.response?.data?.message || 'Impossible d\'enregistrer.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  if (authLoading || !user) {
    return (
      <div className="profil-page">
        <div className="container" style={{ padding: '4rem 0', display: 'flex', justifyContent: 'center' }}>
          <Loader2 size={28} className="profil-spin" />
        </div>
      </div>
    );
  }

  const avatarSrc = avatarPreview || assetUrl(user.avatar);

  return (
    <div className="profil-page">
      <div className="profil-glow" />
      <div className="container">
        <FadeUp>
          <div className="profil-hero glass-bright">
            <div className="profil-hero__left">
              <div className="profil-avatar">
                {avatarSrc ? <img src={avatarSrc} alt="avatar" /> : <User size={36} />}
              </div>
              <div className="profil-info">
                <h1 className="profil-name">{user.prenom} {user.nom}</h1>
                <div className="profil-meta">
                  {user.wilaya && <span><MapPin size={13} /> {user.wilaya}</span>}
                  <span><Calendar size={13} /> Membre depuis {joinDate}</span>
                </div>
              </div>
            </div>
            <div className="profil-hero__right">
              <PremiumButton variant="ghost" icon={Edit3} size="sm" onClick={() => setEditOpen(true)}>
                Modifier
              </PremiumButton>
              {user.role === 'ADMIN' && (
                <PremiumButton variant="ghost" icon={Shield} size="sm" onClick={() => navigate('/admin')}>
                  Admin
                </PremiumButton>
              )}
            </div>
          </div>
        </FadeUp>

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

        <div className="profil-grid">
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
                {user.telephone && (
                  <div className="profil-info-row">
                    <Phone size={16} />
                    <div>
                      <span className="profil-info-row__label">Téléphone</span>
                      <span className="profil-info-row__value">{user.telephone}</span>
                    </div>
                  </div>
                )}
                {user.wilaya && (
                  <div className="profil-info-row">
                    <MapPin size={16} />
                    <div>
                      <span className="profil-info-row__label">Wilaya</span>
                      <span className="profil-info-row__value">{user.wilaya}</span>
                    </div>
                  </div>
                )}
              </div>

              <button className="logout-btn" onClick={handleLogout}>
                <LogOut size={16} />
                Se déconnecter
              </button>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="profil-annonces-card glass-bright">
              <div className="profil-tabs">
                <button className={`profil-tab ${activeTab === 'annonces' ? 'active' : ''}`} onClick={() => setActiveTab('annonces')}>
                  Mes annonces
                </button>
              </div>

              {loadingAnnonces ? (
                <div className="profil-empty"><Loader2 size={24} className="profil-spin" /></div>
              ) : annonces.length === 0 ? (
                <div className="profil-empty">
                  <Package size={32} />
                  <p>Aucune annonce pour le moment</p>
                </div>
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
          </FadeUp>
        </div>
      </div>

      <AnimatePresence>
        {editOpen && (
          <motion.div
            className="profil-modal-backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setEditOpen(false)}
          >
            <motion.div
              className="profil-modal glass-bright"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="profil-modal__close" onClick={() => setEditOpen(false)} aria-label="Fermer">
                <X size={18} />
              </button>
              <h3 className="profil-modal__title">Modifier mon profil</h3>

              <form onSubmit={handleSave} className="profil-edit-form">
                <div className="profil-avatar-edit">
                  <div className="profil-avatar profil-avatar--lg">
                    {avatarSrc ? <img src={avatarSrc} alt="avatar" /> : <User size={40} />}
                  </div>
                  <button type="button" className="profil-avatar-btn" onClick={() => fileRef.current?.click()}>
                    <Camera size={14} /> Changer la photo
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" hidden onChange={onPickAvatar} />
                </div>

                <div className="form-row">
                  <Input label="Prénom" id="ed-prenom" icon={User} value={form.prenom}
                    onChange={(e) => setForm({ ...form, prenom: e.target.value })} />
                  <Input label="Nom" id="ed-nom" icon={User} value={form.nom}
                    onChange={(e) => setForm({ ...form, nom: e.target.value })} />
                </div>

                <Input label="Téléphone" id="ed-tel" icon={Phone} value={form.telephone}
                  onChange={(e) => setForm({ ...form, telephone: e.target.value })} />

                <WilayaSelect label="Wilaya" value={form.wilaya}
                  onChange={(v) => setForm({ ...form, wilaya: v })} />

                {editError && <div className="auth-error">{editError}</div>}

                <div className="profil-modal__actions">
                  <PremiumButton type="button" variant="ghost" onClick={() => setEditOpen(false)}>
                    Annuler
                  </PremiumButton>
                  <PremiumButton type="submit" variant="primary" loading={saving}>
                    Enregistrer
                  </PremiumButton>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
