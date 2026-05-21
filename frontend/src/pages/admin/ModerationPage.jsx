import { useEffect, useState } from 'react';
import { Loader2, Check, X, AlertCircle } from 'lucide-react';
import { adminApi } from '../../services/api';
import './AdminLayout.css';

export default function ModerationPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminApi.pending();
      const list = Array.isArray(data?.annonces) ? data.annonces : [];
      setItems(list);
    } catch (err) {
      setError('Erreur au chargement des annonces');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const moderate = async (id, action) => {
    setBusyId(id);
    setError(null);
    try {
      const statut = action === 'approve' ? 'PUBLIEE' : 'REJETEE';
      await adminApi.moderateAnnonce(id, statut);
      setItems(prev => prev.filter(i => i.id !== id));
    } catch (err) {
      setError(`Erreur lors de ${action === 'approve' ? 'l\'approbation' : 'le rejet'}`);
      console.error(err);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <h1 className="admin-page-title">Modération</h1>
      <p className="admin-page-sub">Annonces en attente de validation</p>

      {error && (
        <div style={{ marginBottom: '1rem', padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgb(239, 68, 68)', color: 'rgb(239, 68, 68)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={16} />
          {error}
        </div>
      )}

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
                  <td>{a.marque || a.dci || '—'}</td>
                  <td>{a.type}</td>
                  <td>{a.user_prenom && a.user_nom ? `${a.user_prenom} ${a.user_nom}` : '—'}</td>
                  <td>{a.created_at ? new Date(a.created_at).toLocaleDateString('fr-FR') : '—'}</td>
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
