import { Navigate, Outlet } from 'react-router-dom';

export default function RequireAdmin() {
  let sesion = null;
  try {
    sesion = JSON.parse(sessionStorage.getItem('motorstore_sesion') || 'null');
  } catch {
    sesion = null;
  }
  return sesion?.rol === 'admin' ? <Outlet /> : <Navigate to="/iniciar-sesion" replace />;
}