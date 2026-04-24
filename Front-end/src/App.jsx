import { Routes, Route } from 'react-router-dom';

/* Layouts */
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import AdminRoute from './components/layout/AdminRoute';
import AdminLayout from './pages/admin/AdminLayout';

/* Public Pages */
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SearchPage from './pages/SearchPage';
import AnnonceDetailPage from './pages/AnnonceDetailPage';

/* Protected Pages */
import PublierPage from './pages/PublierPage';
import ProfilPage from './pages/ProfilPage';

/* Admin Pages */
import OrdonnancesPage from './pages/admin/OrdonnancesPage';
import ModerationPage from './pages/admin/ModerationPage';
import StatsPage from './pages/admin/StatsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="annonce/:id" element={<AnnonceDetailPage />} />

        {/* Protected routes (Requires Auth) */}
        <Route element={<ProtectedRoute />}>
          <Route path="publier" element={<PublierPage />} />
          <Route path="profil" element={<ProfilPage />} />
        </Route>

        {/* Admin routes (Requires Admin role) */}
        <Route element={<AdminRoute />}>
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<OrdonnancesPage />} />
            <Route path="moderation" element={<ModerationPage />} />
            <Route path="stats" element={<StatsPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
