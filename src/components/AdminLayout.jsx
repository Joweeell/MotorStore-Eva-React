import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { seccionesAdmin } from '../data/adminSecciones';

const SESSION_KEY = 'motorstore_sesion';

// Marco del panel de administración: barra superior + menú lateral + contenido
export default function AdminLayout() {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    sessionStorage.removeItem(SESSION_KEY);
    navigate('/');
  };

  const claseLink = ({ isActive }) =>
    `nav-link d-flex align-items-center gap-2 rounded-pill px-3 py-2 ${
      isActive ? 'active bg-primary text-white' : 'text-dark'
    }`;

  const principales = seccionesAdmin.filter((s) => s.to !== '/admin/perfil');
  const perfil = seccionesAdmin.find((s) => s.to === '/admin/perfil');

  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="bg-dark text-white px-3 py-2 fw-bold">
        MotorStore · Administración
      </header>

      <div className="row g-0 flex-grow-1">
        <aside className="col-12 col-md-3 col-xl-2 bg-white border-end p-3">
          <ul className="nav flex-column gap-1">
            {principales.map((s) => (
              <li className="nav-item" key={s.to}>
                <NavLink to={s.to} end={s.to === '/admin'} className={claseLink}>
                  <span aria-hidden="true">{s.icono}</span>
                  {s.titulo}
                </NavLink>
              </li>
            ))}
          </ul>

          <hr />

          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink to={perfil.to} className={claseLink}>
                <span aria-hidden="true">{perfil.icono}</span>
                {perfil.titulo}
              </NavLink>
            </li>
          </ul>

          <hr />

          <div className="d-grid gap-2">
            <button type="button" className="btn btn-dark btn-sm" onClick={() => navigate('/')}>
              🏪 Tienda
            </button>
            <button type="button" className="btn btn-danger btn-sm" onClick={cerrarSesion}>
              Cerrar sesión
            </button>
          </div>
        </aside>

        <section className="col-12 col-md-9 col-xl-10 bg-light text-dark p-3 p-md-4">
          <Outlet />
        </section>
      </div>
    </div>
  );
}