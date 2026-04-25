import { NavLink, Outlet } from 'react-router-dom';
import { FileCheck2, ShieldCheck, BarChart3 } from 'lucide-react';
import './AdminLayout.css';

const LINKS = [
  { to: '/admin', end: true, label: 'Ordonnances', icon: FileCheck2 },
  { to: '/admin/moderation', label: 'Modération', icon: ShieldCheck },
  { to: '/admin/stats', label: 'Statistiques', icon: BarChart3 },
];

export default function AdminLayout() {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar glass-bright">
        <div className="admin-sidebar__brand">
          <ShieldCheck size={18} />
          <span>Console admin</span>
        </div>
        <nav className="admin-nav">
          {LINKS.map(({ to, end, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `admin-nav__link ${isActive ? 'is-active' : ''}`}
            >
              <Icon size={16} /> <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
