import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import './PremiumButton.css';

/**
 * PremiumButton - Premium animated button with glow, gradient, magnetic feel
 */
export default function PremiumButton({
  children,
  variant = 'primary',  // 'primary' | 'secondary' | 'ghost' | 'danger' | 'glass'
  size = 'md',          // 'sm' | 'md' | 'lg'
  fullWidth = false,
  loading = false,
  disabled = false,
  icon: Icon,
  iconRight: IconRight,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const cls = [
    'prem-btn',
    `prem-btn--${variant}`,
    `prem-btn--${size}`,
    fullWidth ? 'prem-btn--full' : '',
    loading ? 'prem-btn--loading' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <motion.button
      type={type}
      className={cls}
      disabled={disabled || loading}
      onClick={onClick}
      whileTap={!disabled && !loading ? { scale: 0.97 } : {}}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      {...props}
    >
      {loading ? (
        <Loader2 className="prem-btn__spinner" size={18} />
      ) : Icon ? (
        <Icon className="prem-btn__icon" size={18} />
      ) : null}
      <span className="prem-btn__label">{children}</span>
      {!loading && IconRight && <IconRight className="prem-btn__icon-right" size={18} />}
      {variant === 'primary' && <span className="prem-btn__shimmer" />}
    </motion.button>
  );
}
