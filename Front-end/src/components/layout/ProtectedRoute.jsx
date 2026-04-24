import { Navigate, Outlet } from 'react-router-dom'; export default function ProtectedRoute() { const auth = true; return auth ? <Outlet /> : <Navigate to='/login' />; }
