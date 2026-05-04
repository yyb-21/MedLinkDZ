import React from 'react';
import './RouteFallback.css';

export default function RouteFallback() {
  return (
    <div className="route-fallback">
      <div className="loader-ring">
        <div></div><div></div><div></div><div></div>
      </div>
    </div>
  );
}
