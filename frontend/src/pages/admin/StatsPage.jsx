import { useEffect, useState } from 'react';
import { Users, FileText, Activity, CheckCircle2, Loader2, Mail, Phone, ShieldCheck } from 'lucide-react';
import { adminApi } from '../../services/api';
import './AdminLayout.css';

const KPIS = [
  { key: 'totalUsers', label: 'Utilisateurs', icon: Users },
  { key: 'totalAnnonces', label: 'Annonces', icon: FileText },
  { key: 'publishedAnnonces', label: 'Publiées', icon: Activity },
  { key: 'pendingAnnonces', label: 'En attente', icon: CheckCircle2 },
];

const ROLE_LABELS = {
  ADMIN: { label: 'Admin', color: '#7c3aed' },
  USER: { label: 'Utilisateur', color: '#047857' },
  PHARMACY: { label: 'Pharmacie', color: '#0369a1' },
};

export default function StatsPage() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, usersRes] = await Promise.all([
          adminApi.stats(),
          adminApi.users(),
        ]);
        setStats(statsRes?.stats || statsRes || {});
        setUsers(usersRes?.users || []);
      } catch (err) {
        setError(err?.response?.data?.message || 'Erreur de chargement');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const val = (k) => stats?.[k] ?? stats?.counts?.[k] ?? 0;

  const formatDate = (d) => {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('fr-FR', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  };

  return (
    <div>
      <h1 className="admin-page-title">Statistiques</h1>
      <p className="admin-page-sub">Vue d'ensemble de la plateforme</p>

      {loading ? (
        <div className="admin-empty"><Loader2 className="profil-spin" /></div>
      ) : error ? (
        <div className="admin-empty">{error}</div>
      ) : (
        <>
          {/* KPI Cards */}
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

          {/* Users Table */}
          <div className="admin-card glass-bright" style={{ marginTop: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem', fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Users size={18} style={{ color: '#047857' }} />
              Liste des utilisateurs ({users.length})
            </h3>
            {users.length === 0 ? (
              <div className="admin-empty">Aucun utilisateur trouvé</div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nom complet</th>
                      <th>Email</th>
                      <th>Téléphone</th>
                      <th>Rôle</th>
                      <th>Vérifié</th>
                      <th>Annonces</th>
                      <th>Inscrit le</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, i) => {
                      const role = ROLE_LABELS[u.role] || ROLE_LABELS.USER;
                      return (
                        <tr key={u.id}>
                          <td style={{ color: 'rgba(0,0,0,0.4)', fontWeight: 500 }}>{i + 1}</td>
                          <td style={{ fontWeight: 600 }}>{u.prenom} {u.nom}</td>
                          <td>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                              <Mail size={13} style={{ opacity: 0.5 }} />
                              {u.email}
                            </span>
                          </td>
                          <td>
                            {u.phone ? (
                              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                <Phone size={13} style={{ opacity: 0.5 }} />
                                {u.phone}
                              </span>
                            ) : (
                              <span style={{ color: 'rgba(0,0,0,0.3)' }}>—</span>
                            )}
                          </td>
                          <td>
                            <span style={{
                              display: 'inline-flex', alignItems: 'center', gap: 4,
                              padding: '0.2rem 0.55rem',
                              borderRadius: 6,
                              fontSize: '0.76rem',
                              fontWeight: 600,
                              background: `${role.color}15`,
                              color: role.color,
                              border: `1px solid ${role.color}30`,
                            }}>
                              {u.role === 'ADMIN' && <ShieldCheck size={12} />}
                              {role.label}
                            </span>
                          </td>
                          <td>
                            <span style={{
                              display: 'inline-block',
                              width: 8, height: 8,
                              borderRadius: '50%',
                              background: u.is_verified ? '#10b981' : '#ef4444',
                              boxShadow: u.is_verified ? '0 0 6px rgba(16,185,129,0.4)' : '0 0 6px rgba(239,68,68,0.4)',
                            }} title={u.is_verified ? 'Vérifié' : 'Non vérifié'} />
                          </td>
                          <td>
                            <span style={{
                              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                              minWidth: 28,
                              padding: '0.15rem 0.5rem',
                              borderRadius: 8,
                              fontSize: '0.82rem',
                              fontWeight: 700,
                              background: u.annonce_count > 0 ? 'rgba(16,185,129,0.12)' : 'rgba(0,0,0,0.05)',
                              color: u.annonce_count > 0 ? '#047857' : 'rgba(0,0,0,0.4)',
                            }}>
                              {u.annonce_count}
                            </span>
                          </td>
                          <td style={{ fontSize: '0.82rem', color: 'rgba(0,0,0,0.55)' }}>
                            {formatDate(u.created_at)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
