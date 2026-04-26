import React from 'react';
import './Skeleton.css';

export default function Skeleton({ width, height, borderRadius = 'var(--r-md)', className = '' }) {
  return (
    <div 
      className={`skeleton-box ${className}`}
      style={{ 
        width: width || '100%', 
        height: height || '20px',
        borderRadius: borderRadius
      }}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="annonce-card skeleton glass-bright">
      <Skeleton height="160px" borderRadius="var(--r-md) var(--r-md) 0 0" />
      <div className="annonce-card__content" style={{ padding: '1.25rem' }}>
        <Skeleton width="40%" height="12px" style={{ marginBottom: '0.75rem' }} />
        <Skeleton width="90%" height="20px" style={{ marginBottom: '1rem' }} />
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
          <Skeleton width="30%" height="14px" />
          <Skeleton width="30%" height="14px" />
        </div>
        <Skeleton width="100%" height="44px" borderRadius="var(--r-md)" />
      </div>
    </div>
  );
}
