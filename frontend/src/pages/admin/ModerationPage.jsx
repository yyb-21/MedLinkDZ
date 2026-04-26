import { useEffect, useState } from 'react';
import { Loader2, Check, X } from 'lucide-react';
import { adminApi } from '../../services/api';
import './AdminLayout.css';

export default function ModerationPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await adminApi.pending();
      const list = Array.isArray(data) ? data : data?.annonces || data?.items || [];
      setItems(list);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const moderate = async (id, action) => {
    setBusyId(id);
    try {
      await adminApi.moderateAnnonce(id, action);
      setItems(prev => prev.filter(i => i.id !== id));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <h1 className="admin-page-title">Modération</h1>
      <p className="admin-page-sub">Annonces en attente de validation</p>

      <div className="admin-card glass-bright">
        {loading ? (
          <div className="admin-empty"><Loader2 className="profil-spin" /></div>
        ) : items.length === 0 ? (
          <div className="admin-empty">Aucune annonce à modérer</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Médicament</th>
                <th>Type</th>
                <th>Auteur</th>
                <th>Date</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(a => (
                <tr key={a.id}>
                  <td>{a.medicamentNom || a.titre || a.name}</td>
                  <td>{a.type}</td>
                  <td>{a.user?.prenom || a.author?.prenom || '—'}</td>
                  <td>{a.createdAt ? new Date(a.createdAt).toLocaleDateString('fr-FR') : ''}</td>
                  <td>
                    <div className="admin-actions" style={{ justifyContent: 'flex-end' }}>
                      <button
                        className="admin-btn admin-btn--approve"
                        disabled={busyId === a.id}
                        onClick={() => moderate(a.id, 'approve')}
                      >
                        <Check size={14} /> Approuver
                      </button>
                      <button
                        className="admin-btn admin-btn--reject"
                        disabled={busyId === a.id}
                        onClick={() => moderate(a.id, 'reject')}
                      >
                        <X size={14} /> Rejeter
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
