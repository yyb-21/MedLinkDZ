import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeartPulse } from 'lucide-react';
import AuthNotice from '../components/ui/AuthNotice';
import { authApi } from '../services/api';
import './AuthPages.css';

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setError('Token de vérification manquant.');
      setLoading(false);
      return;
    }

    authApi.verifyEmail(token)
      .then((res) => {
        setMessage(res.message || 'Email vérifié avec succès.');
      })
      .catch((err) => {
        setError(err?.response?.data?.message || 'Impossible de vérifier cet email.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchParams]);

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
            <h1 className="auth-title">Vérification de l'email</h1>
            <p className="auth-subtitle">Nous validons votre compte maintenant.</p>
          </div>

          <div className="auth-form">
            {loading && <p>Vérification en cours...</p>}
            {message && <AuthNotice variant="success" title="Email vérifié" message={message} />}
            {error && <AuthNotice variant="error" title="Vérification impossible" message={error} />}

            <div className="auth-divider"><span>ou</span></div>
            <div className="auth-footer">
              <Link to="/login" className="auth-footer__link">Retour à la connexion</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
