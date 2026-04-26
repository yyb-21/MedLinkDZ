import React, { useRef, useState } from 'react';

/**
 * MagnetButton - Magnetic hover effect
 * Inspired by ReactBits Magnet component
 */
export default function MagnetButton({ children, padding = 80, className = '', speed = 0.5 }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const dist = Math.sqrt(distX * distX + distY * distY);

    if (dist < padding + Math.max(width, height) / 2) {
      setIsActive(true);
      setPosition({ x: distX * speed, y: distY * speed });
    } else {
      setIsActive(false);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setIsActive(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`magnet-wrapper ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isActive
          ? 'transform 100ms ease'
          : 'transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        display: 'inline-block',
      }}
    >
      {children}
    </div>
  );
}
