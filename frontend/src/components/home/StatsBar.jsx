import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, MapPin, Pill } from 'lucide-react';
import FadeUp from '../animations/FadeUp';
import './StatsBar.css';

function useCountUp(target, inView, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);
  return count;
}

const STATS = [
  { icon: Activity, label: 'Annonces Actives', value: 1245, suffix: '+', color: '#10b981' },
  { icon: MapPin, label: 'Wilayas Couvertes', value: 69, suffix: '', color: '#14b8a6' },
  { icon: Pill, label: 'Médicaments Disponibles', value: 340, suffix: '+', color: '#34d399' },
];

function StatCard({ icon: Icon, label, value, suffix, color, index }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const count = useCountUp(value, inView);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <FadeUp delay={index * 0.1} duration={0.55}>
      <div ref={ref} className="stat-card glass glow-border">
        <div className="stat-card__glow" style={{ '--stat-color': color }} />
        <div className="stat-card__icon-ring" style={{ '--stat-color': color }}>
          <Icon size={22} style={{ color }} />
        </div>
        <div className="stat-card__body">
          <div className="stat-card__value" style={{ color }}>
            {count.toLocaleString('fr-FR')}{suffix}
          </div>
          <div className="stat-card__label">{label}</div>
        </div>
      </div>
    </FadeUp>
  );
}

export default function StatsBar() {
  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {STATS.map((s, i) => <StatCard key={i} {...s} index={i} />)}
        </div>
      </div>
    </section>
  );
}
