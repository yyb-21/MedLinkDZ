import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, CheckCircle, Mail } from 'lucide-react';

const VARIANT_CONFIG = {
  error: {
    icon: AlertCircle,
    role: 'alert',
    tone: 'error',
  },
  success: {
    icon: CheckCircle,
    role: 'status',
    tone: 'success',
  },
  info: {
    icon: Mail,
    role: 'status',
    tone: 'info',
  },
};

export default function AuthNotice({
  variant = 'info',
  title,
  message,
  actionLabel,
  actionTo,
  className = '',
}) {
  const config = VARIANT_CONFIG[variant] || VARIANT_CONFIG.info;
  const Icon = config.icon;

  return (
    <div
      className={`auth-alert auth-alert--${config.tone} ${className}`.trim()}
      role={config.role}
      aria-live={config.role === 'alert' ? 'assertive' : 'polite'}
    >
      <div className="auth-alert__icon">
        <Icon size={18} />
      </div>

      <div className="auth-alert__content">
        {title && <strong className="auth-alert__title">{title}</strong>}
        {message && <p className="auth-alert__text">{message}</p>}
        {actionLabel && actionTo && (
          <Link to={actionTo} className="auth-alert__action">
            {actionLabel}
          </Link>
        )}
      </div>
    </div>
  );
}