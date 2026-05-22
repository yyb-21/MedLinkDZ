import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

/* Layouts (eager — always mounted) */
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import AdminRoute from './components/layout/AdminRoute';
import RouteFallback from './components/layout/RouteFallback';
import ScrollToTop from './components/layout/ScrollToTop';

/* Public pages — eager (likely landing) */
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

/* Public pages — lazy */
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'));
const VerifyEmailPage = lazy(() => import('./pages/VerifyEmailPage'));
const ResendVerificationPage = lazy(() => import('./pages/ResendVerificationPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const AnnonceDetailPage = lazy(() => import('./pages/AnnonceDetailPage'));

/* Protected pages — lazy (auth gate skips cold path for anon) */
const PublierPage = lazy(() => import('./pages/PublierPage'));
const ProfilPage = lazy(() => import('./pages/ProfilPage'));
const ProfilAnnoncesPage = lazy(() => import('./pages/ProfilAnnoncesPage'));

/* Admin — lazy (rarely used by most users) */
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const ModerationPage = lazy(() => import('./pages/admin/ModerationPage'));
const StatsPage = lazy(() => import('./pages/admin/StatsPage'));

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          
          <Route path="forgot-password" element={<Suspense fallback={<RouteFallback />}><ForgotPasswordPage /></Suspense>} />
          <Route path="reset-password" element={<Suspense fallback={<RouteFallback />}><ResetPasswordPage /></Suspense>} />
          <Route path="verify-email" element={<Suspense fallback={<RouteFallback />}><VerifyEmailPage /></Suspense>} />
          <Route path="resend-verification" element={<Suspense fallback={<RouteFallback />}><ResendVerificationPage /></Suspense>} />

          <Route
            path="search"
            element={
              <Suspense fallback={<RouteFallback />}>
                <SearchPage />
              </Suspense>
            }
          />
          <Route
            path="annonce/:id"
            element={
              <Suspense fallback={<RouteFallback />}>
                <AnnonceDetailPage />
              </Suspense>
            }
          />

          <Route element={<ProtectedRoute />}>
            <Route
              path="publier"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <PublierPage />
                </Suspense>
              }
            />
            <Route
              path="profil"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <ProfilPage />
                </Suspense>
              }
            />
            <Route
              path="profil/annonces"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <ProfilAnnoncesPage />
                </Suspense>
              }
            />
          </Route>

          <Route element={<AdminRoute />}>
            <Route
              path="admin"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <AdminLayout />
                </Suspense>
              }
            >
              <Route
                index
                element={
                  <Suspense fallback={<RouteFallback />}>
                    <ModerationPage />
                  </Suspense>
                }
              />
              <Route
                path="stats"
                element={
                  <Suspense fallback={<RouteFallback />}>
                    <StatsPage />
                  </Suspense>
                }
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
