import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, HeartPulse } from 'lucide-react';
import Input from '../components/ui/Input';
import PremiumButton from '../components/ui/PremiumButton';
import MagnetButton from '../components/animations/MagnetButton';
import AuthNotice from '../components/ui/AuthNotice';
import { authApi } from '../services/api';
import './AuthPages.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage('');
    setLoading(true);

    try {
      const res = await authApi.forgotPassword({ email: email.trim().toLowerCase() });
      setMessage(res.message || 'Un lien de réinitialisation a été envoyé si l’email existe.');
    } catch (err) {
      setError(err?.response?.data?.message || 'Impossible de demander la réinitialisation pour le moment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-glow-top" />

      <div className="container auth-container">
        <motion.div
          className="auth-card glass-bright"
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
            <h1 className="auth-title">Mot de passe oublié</h1>
            <p className="auth-subtitle">Entrez votre email pour recevoir un lien de réinitialisation sécurisé.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <Input
              label="Email"
              type="email"
              id="forgot-email"
              icon={Mail}
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {error && <AuthNotice variant="error" title="Demande impossible" message={error} />}

            {message && <AuthNotice variant="success" title="Lien envoyé" message={message} />}

            <MagnetButton padding={50} className="w-full">
              <PremiumButton type="submit" variant="primary" fullWidth size="lg" loading={loading}>
                Envoyer le lien
              </PremiumButton>
            </MagnetButton>
          </form>

          <div className="auth-divider"><span>ou</span></div>

          <div className="auth-footer">
            Retour à la connexion ?{' '}
            <Link to="/login" className="auth-footer__link">Se connecter</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
