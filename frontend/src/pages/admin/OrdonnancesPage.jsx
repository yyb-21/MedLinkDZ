import { useEffect, useState } from 'react';
import { Loader2, Check, X, FileText } from 'lucide-react';
import { adminApi, assetUrl } from '../../services/api';
import './AdminLayout.css';

export default function OrdonnancesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await adminApi.pending();
      const list = Array.isArray(data) ? data : data?.ordonnances || data?.items || [];
      const ordonnances = list.filter(i => i.ordonnance || i.ordonnanceUrl || i.type === 'ordonnance');
      setItems(ordonnances.length ? ordonnances : list);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const moderate = async (id, action) => {
    setBusyId(id);
    try {
      await adminApi.moderateOrdonnance(id, action);
      setItems(prev => prev.filter(i => i.id !== id));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <h1 className="admin-page-title">Ordonnances</h1>
      <p className="admin-page-sub">Validation des ordonnances médicales</p>

      <div className="admin-card glass-bright">
        {loading ? (
          <div className="admin-empty"><Loader2 className="profil-spin" /></div>
        ) : items.length === 0 ? (
          <div className="admin-empty">Aucune ordonnance à valider</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Document</th>
                <th>Médicament</th>
                <th>Auteur</th>
                <th>Date</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(a => {
                const url = assetUrl(a.ordonnance || a.ordonnanceUrl);
                return (
                  <tr key={a.id}>
                    <td>
                      {url ? (
                        <a href={url} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#047857' }}>
                          <FileText size={14} /> Voir
                        </a>
                      ) : '—'}
                    </td>
                    <td>{a.medicamentNom || a.titre || '—'}</td>
                    <td>{a.user?.prenom || a.author?.prenom || '—'}</td>
                    <td>{a.createdAt ? new Date(a.createdAt).toLocaleDateString('fr-FR') : ''}</td>
                    <td>
                      <div className="admin-actions" style={{ justifyContent: 'flex-end' }}>
                        <button
                          className="admin-btn admin-btn--approve"
                          disabled={busyId === a.id}
                          onClick={() => moderate(a.id, 'approve')}
                        >
                          <Check size={14} /> Valider
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
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
