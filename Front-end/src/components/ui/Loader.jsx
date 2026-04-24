import React from 'react';
import { Loader2 } from 'lucide-react';
import './Loader.css';

export default function Loader({ fullPage = false, size = 32, text = 'Chargement...' }) {
  if (fullPage) {
    return (
      <div className="loader-fullpage">
        <Loader2 className="loader-spinner" size={size} />
        {text && <p className="loader-text">{text}</p>}
      </div>
    );
  }

  return (
    <div className="loader-inline">
      <Loader2 className="loader-spinner" size={size} />
      {text && <span className="loader-text-inline">{text}</span>}
    </div>
  );
}
