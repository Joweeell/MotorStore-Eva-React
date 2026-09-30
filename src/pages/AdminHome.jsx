import { Link } from 'react-router-dom';

export default function AdminHome() {
  return (
    <main className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold text-uppercase">Panel de Administración</h2>
          <p className="text-muted">Selecciona qué quieres gestionar.</p>
        </div>

        <div className="row g-4 justify-content-center">
          
          {/* Tarjeta de Gestión de Productos */}
          <div className="col-12 col-md-5">
            <Link to="/admin/productos" className="text-decoration-none">
              <div className="card h-100 shadow-sm border-secondary text-center">
                <div className="card-body p-5">
                  <div className="fs-1 mb-3">🏍️</div>
                  <h4 className="fw-bold text-dark">Productos</h4>
                  <p className="text-muted mb-0">Ver, crear y editar el catálogo de la tienda.</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Tarjeta de Gestión de Usuarios */}
          <div className="col-12 col-md-5">
            <Link to="/admin/usuarios" className="text-decoration-none">
              <div className="card h-100 shadow-sm border-secondary text-center">
                <div className="card-body p-5">
                  <div className="fs-1 mb-3">👤</div>
                  <h4 className="fw-bold text-dark">Usuarios</h4>
                  <p className="text-muted mb-0">Ver, crear y editar los usuarios registrados.</p>
                </div>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}