import React from 'react';
import { PackageOpen } from 'lucide-react';
import './EmptyState.css';

export default function EmptyState({ 
  title = "Aucun résultat trouvé", 
  message = "Nous n'avons trouvé aucune donnée correspondant à votre recherche.",
  icon: Icon = PackageOpen,
  action 
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon-wrapper">
        <Icon size={48} className="empty-state-icon" />
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-message">{message}</p>
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  );
}
