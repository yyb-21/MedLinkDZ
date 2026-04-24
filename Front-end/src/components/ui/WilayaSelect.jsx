import React, { useState } from 'react';
import { WILAYAS } from '../../data/wilayas';
import { MapPin, ChevronDown } from 'lucide-react';
import './WilayaSelect.css';

export default function WilayaSelect({
  value,
  onChange,
  label = "Wilaya",
  placeholder = "Sélectionner une wilaya...",
  error,
  className = ''
}) {
  return (
    <div className={`input-group ${error ? 'has-error' : ''} ${className}`}>
      {label && <label className="input-label">{label}</label>}
      
      <div className="select-wrapper">
        <MapPin className="select-icon-left" size={18} />
        <select
          className="select-field"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled hidden>{placeholder}</option>
          {WILAYAS.map(w => (
            <option key={w.id} value={w.id}>
              {w.id} - {w.name}
            </option>
          ))}
        </select>
        <ChevronDown className="select-icon-right" size={16} />
      </div>
      
      {error && <p className="input-error-msg">{error}</p>}
    </div>
  );
}
