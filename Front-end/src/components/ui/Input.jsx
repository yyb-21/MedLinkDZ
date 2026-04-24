import React from 'react';
import './Input.css';

export default function Input({
  label,
  id,
  error,
  icon: Icon,
  className = '',
  ...props
}) {
  return (
    <div className={`input-group ${error ? 'has-error' : ''} ${className}`}>
      {label && <label htmlFor={id} className="input-label">{label}</label>}
      
      <div className="input-wrapper">
        {Icon && <Icon className="input-icon" size={18} />}
        <input
          id={id}
          className={`input-field ${Icon ? 'with-icon' : ''}`}
          {...props}
        />
      </div>
      
      {error && <p className="input-error-msg">{error}</p>}
    </div>
  );
}
