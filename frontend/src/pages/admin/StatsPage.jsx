import { useEffect, useState } from 'react';
import { Users, FileText, Activity, CheckCircle2, Loader2 } from 'lucide-react';
import { adminApi } from '../../services/api';
import './AdminLayout.css';

const KPIS = [
  { key: 'users', label: 'Utilisateurs', icon: Users },
  { key: 'annonces', label: 'Annonces', icon: FileText },
  { key: 'active', label: 'Actives', icon: Activity },
  { key: 'moderated', label: 'Modérées', icon: CheckCircle2 },
];

export default function StatsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    adminApi.stats()
      .then(data => setStats(data || {}))
      .catch(err => setError(err?.response?.data?.message || 'Erreur de chargement'))
      .finally(() => setLoading(false));
  }, []);

  const val = (k) => stats?.[k] ?? stats?.counts?.[k] ?? 0;

  return (
    <div>
      <h1 className="admin-page-title">Statistiques</h1>
      <p className="admin-page-sub">Vue d'ensemble de la plateforme</p>

      {loading ? (
        <div className="admin-empty"><Loader2 className="profil-spin" /></div>
      ) : error ? (
        <div className="admin-empty">{error}</div>
      ) : (
        <div className="admin-kpi-grid">
          {KPIS.map(({ key, label, icon: Icon }) => (
            <div key={key} className="admin-kpi glass-bright">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#047857' }}>
                <Icon size={16} />
                <span className="admin-kpi__label">{label}</span>
              </div>
              <span className="admin-kpi__value">{val(key)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
