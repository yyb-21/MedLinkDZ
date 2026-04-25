import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, HeartPulse, AlertCircle } from 'lucide-react';
import Input from '../components/ui/Input';
import PremiumButton from '../components/ui/PremiumButton';
import MagnetButton from '../components/animations/MagnetButton';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || 'Email ou mot de passe incorrect.');
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
            <h1 className="auth-title">Bon retour 👋</h1>
            <p className="auth-subtitle">Connectez-vous à votre compte MedLink DZ</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <Input label="Email" type="email" id="login-email" icon={Mail}
              placeholder="votre@email.com" value={email}
              onChange={(e) => setEmail(e.target.value)} required />

            <Input label="Mot de passe" type="password" id="login-pass" icon={Lock}
              placeholder="••••••••" value={password}
              onChange={(e) => setPassword(e.target.value)} required />

            {error && (
              <div className="auth-error" role="alert">
                <AlertCircle size={14} /> {error}
              </div>
            )}

            <div className="auth-forgot">
              <a href="#" className="forgot-link">Mot de passe oublié ?</a>
            </div>

            <MagnetButton padding={50} className="w-full">
              <PremiumButton type="submit" variant="primary" fullWidth size="lg" loading={loading}>
                Se connecter
              </PremiumButton>
            </MagnetButton>
          </form>

          <div className="auth-divider"><span>ou</span></div>

          <div className="auth-footer">
            Nouveau sur MedLink DZ ?{' '}
            <Link to="/register" className="auth-footer__link">Créer un compte</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
