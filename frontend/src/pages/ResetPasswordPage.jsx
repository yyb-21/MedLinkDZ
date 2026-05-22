import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, HeartPulse } from 'lucide-react';
import Input from '../components/ui/Input';
import PremiumButton from '../components/ui/PremiumButton';
import MagnetButton from '../components/animations/MagnetButton';
import AuthNotice from '../components/ui/AuthNotice';
import { authApi } from '../services/api';
import './AuthPages.css';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [token, setToken] = useState(searchParams.get('token') || '');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage('');
    setLoading(true);

    try {
      await authApi.resetPassword({ token, newPassword });
      setMessage('Votre mot de passe a bien été réinitialisé.');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setError(err?.response?.data?.message || 'Impossible de réinitialiser le mot de passe.');
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
            <h1 className="auth-title">Réinitialiser le mot de passe</h1>
            <p className="auth-subtitle">Entrez le jeton reçu et définissez un nouveau mot de passe.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <Input
              label="Jeton de réinitialisation"
              type="text"
              id="reset-token"
              placeholder="Collez le jeton ici"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />

            <Input
              label="Nouveau mot de passe"
              type="password"
              id="reset-password"
              icon={Lock}
              placeholder="••••••••"
              minLength={8}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            {error && <AuthNotice variant="error" title="Réinitialisation impossible" message={error} />}

            {message && <AuthNotice variant="success" title="Mot de passe mis à jour" message={message} />}

            <MagnetButton padding={50} className="w-full">
              <PremiumButton type="submit" variant="primary" fullWidth size="lg" loading={loading}>
                Réinitialiser
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
