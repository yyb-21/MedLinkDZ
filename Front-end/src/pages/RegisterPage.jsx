import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, HeartPulse } from 'lucide-react';
import Input from '../components/ui/Input';
import PremiumButton from '../components/ui/PremiumButton';
import WilayaSelect from '../components/ui/WilayaSelect';
import MagnetButton from '../components/animations/MagnetButton';
import './AuthPages.css';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', wilaya: '' });
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm({...form, [k]: e.target.value});

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate('/'); }, 1500);
  };

  return (
    <div className="auth-page">
      <div className="auth-glow-top" />

      <div className="container auth-container">
        <motion.div
          className="auth-card auth-card--wide glass-bright"
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="auth-logo">
            <div className="auth-logo__icon">
              <HeartPulse size={22} />
            </div>
            <span className="auth-logo__text">MedLink <strong>DZ</strong></span>
          </div>

          <div className="auth-header">
            <h1 className="auth-title">Rejoindre la communauté 💚</h1>
            <p className="auth-subtitle">Créez votre compte gratuit et commencez à aider</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-row">
              <Input label="Prénom" id="reg-fname" icon={User} placeholder="Votre prénom" required value={form.firstName} onChange={set('firstName')} />
              <Input label="Nom" id="reg-lname" icon={User} placeholder="Votre nom" required value={form.lastName} onChange={set('lastName')} />
            </div>

            <Input label="Email" type="email" id="reg-email" icon={Mail} placeholder="votre@email.com" required value={form.email} onChange={set('email')} />

            <div className="form-row">
              <Input label="Téléphone" type="tel" id="reg-phone" icon={Phone} placeholder="05xx xx xx xx" required value={form.phone} onChange={set('phone')} />
              <WilayaSelect label="Wilaya" value={form.wilaya} onChange={(v) => setForm({...form, wilaya: v})} required />
            </div>

            <Input label="Mot de passe" type="password" id="reg-pass" icon={Lock} placeholder="Min. 8 caractères" required value={form.password} onChange={set('password')} />

            <div className="auth-terms">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">J'accepte les <a href="#">conditions d'utilisation</a> et la <a href="#">politique de confidentialité</a></label>
            </div>

            <MagnetButton padding={50} className="w-full">
              <PremiumButton type="submit" variant="primary" fullWidth size="lg" loading={loading}>
                Créer mon compte
              </PremiumButton>
            </MagnetButton>
          </form>

          <div className="auth-divider"><span>ou</span></div>

          <div className="auth-footer">
            Déjà un compte ?{' '}
            <Link to="/login" className="auth-footer__link">Connectez-vous</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
