
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../services/api';

export default function AdminPerfil() {
  const [perfil, setPerfil] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const cargarPerfil = async () => {
    try {
      setCargando(true);
      setError('');

      const sesion = await apiRequest('/auth/me');
      const usuarios = await apiRequest('/usuarios');

      const usuario = usuarios.find(
        (u) => String(u.idUsuario) === String(sesion.idUsuario)
      );

      if (!usuario) {
        throw new Error('No se encontró la cuenta del administrador.');
      }

      setPerfil({
        ...usuario,
        correo: sesion.email,
        roles: sesion.roles || [],
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarPerfil();
  }, []);

  const cerrarSesion = () => {
    if (!window.confirm('¿Deseas cerrar sesión?')) return;

    sessionStorage.removeItem('motorstore_sesion');
    navigate('/login', { replace: true });
  };

  const iniciales = perfil
    ? `${perfil.nombre?.charAt(0) || ''}${perfil.apellido?.charAt(0) || ''}`.toUpperCase()
    : '';

  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h2 className="h4 fw-bold mb-0">Mi perfil</h2>

          <p className="text-muted small mb-0">
            Información de tu cuenta administrativa
          </p>
        </div>

        <button
          className="btn btn-outline-dark"
          onClick={cargarPerfil}
          disabled={cargando}
        >
          Actualizar
        </button>
      </div>

      {error && (
        <div className="alert alert-danger">
          No se pudo cargar el perfil: {error}
        </div>
      )}

      {cargando ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status" />

          <p className="mt-3">
            Cargando perfil...
          </p>
        </div>
      ) : !error && perfil && (
        <div className="row g-4">

          {/* Tarjeta de perfil */}
          <div className="col-12 col-lg-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center p-4">

                <div
                  className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center mx-auto mb-3 fw-bold"
                  style={{
                    width: '110px',
                    height: '110px',
                    fontSize: '40px',
                  }}
                >
                  {iniciales || 'A'}
                </div>

                <h4 className="fw-bold mb-1">
                  {perfil.nombre} {perfil.apellido}
                </h4>

                <p className="text-muted">
                  {perfil.correo}
                </p>

                <span className="badge bg-warning text-dark fs-6">
                  Administrador
                </span>

                <hr />

                <div className="d-grid gap-2">
                  <Link
                    to={`/admin/usuarios/editar/${encodeURIComponent(perfil.correo)}`}
                    className="btn btn-primary"
                  >
                    ✏️ Editar mi perfil
                  </Link>

                  <button
                    className="btn btn-outline-danger"
                    onClick={cerrarSesion}
                  >
                    Cerrar sesión
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* Información personal */}
          <div className="col-12 col-lg-8">

            <div className="card border-0 shadow-sm mb-4">
              <div className="card-header bg-white py-3">
                <h3 className="h6 fw-bold mb-0">
                  Información personal
                </h3>
              </div>

              <div className="card-body p-4">
                <div className="row g-4">

                  <div className="col-md-6">
                    <label className="form-label text-muted">
                      Nombre
                    </label>

                    <input
                      className="form-control"
                      value={perfil.nombre || ''}
                      readOnly
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-muted">
                      Apellido
                    </label>

                    <input
                      className="form-control"
                      value={perfil.apellido || ''}
                      readOnly
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-muted">
                      Correo electrónico
                    </label>

                    <input
                      className="form-control"
                      value={perfil.correo}
                      readOnly
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-muted">
                      Identificador de usuario
                    </label>

                    <input
                      className="form-control"
                      value={perfil.idUsuario}
                      readOnly
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-muted">
                      Rol de usuario
                    </label>

                    <input
                      className="form-control"
                      value={perfil.roles.join(', ')}
                      readOnly
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-muted">
                      Autenticación
                    </label>

                    <input
                      className="form-control"
                      value="JWT"
                      readOnly
                    />
                  </div>

                </div>
              </div>
            </div>

            {/* Seguridad */}
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white py-3">
                <h3 className="h6 fw-bold mb-0">
                  🔒 Seguridad y permisos
                </h3>
              </div>

              <div className="card-body p-4">

                <div className="alert alert-success">
                  Sesión autenticada correctamente mediante JWT.
                </div>

                <h6 className="fw-bold mb-3">
                  Permisos administrativos
                </h6>

                <ul className="list-group list-group-flush">
                  {[
                    'Administrar productos',
                    'Administrar categorías',
                    'Administrar usuarios',
                    'Administrar pedidos',
                    'Consultar estadísticas y reportes',
                    'Acceder al panel administrativo',
                  ].map((permiso) => (
                    <li
                      key={permiso}
                      className="list-group-item px-0"
                    >
                      <span className="text-success me-2">
                        ✓
                      </span>

                      {permiso}
                    </li>
                  ))}
                </ul>

              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
