import React from 'react';
import { Loader2 } from 'lucide-react';
import './Button.css';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  icon: Icon,
  className = '',
  ...props
}) {
  const baseClass = `btn btn-${variant} btn-${size} ${fullWidth ? 'w-full' : ''} ${className}`;
  
  return (
    <button
      className={baseClass}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="btn-spinner" size={16} />}
      {!loading && Icon && <Icon className="btn-icon" size={18} />}
      <span>{children}</span>
    </button>
  );
}
