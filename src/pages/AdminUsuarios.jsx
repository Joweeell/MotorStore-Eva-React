import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  listarUsuariosAdmin,
  eliminarUsuario,
  esAdminPredefinido,
} from '../data/usuariosCRUD';

export default function AdminUsuarios() {
  const location = useLocation();

  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState(() =>
    location.state?.mensaje
      ? { tipo: 'success', texto: location.state.mensaje }
      : null
  );
  const [pendiente, setPendiente] = useState(null);

  const cargarUsuarios = async () => {
    setCargando(true);
    try {
      const lista = await listarUsuariosAdmin();
      setUsuarios(lista);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      setMensaje({
        tipo: 'danger',
        texto: 'No se pudieron cargar los usuarios. Verifica tu sesión de administrador.',
      });
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const confirmarEliminacion = async () => {
    const { idUsuario, nombre } = pendiente;
    setPendiente(null);

    const eliminado = await eliminarUsuario(idUsuario);
    if (eliminado) {
      await cargarUsuarios();
      setMensaje({
        tipo: 'warning',
        texto: `Se eliminó al usuario "${nombre}".`,
      });
    } else {
      setMensaje({
        tipo: 'danger',
        texto: 'No se pudo eliminar el usuario (puede tener pedidos asociados).',
      });
    }
  };

  return (
    <main className="py-5">
      <div className="container">
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/admin" className="text-decoration-none">
                Admin Home
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Usuarios
            </li>
          </ol>
        </nav>

        {mensaje && (
          <div
            className={`alert alert-${mensaje.tipo} alert-dismissible`}
            role="status"
          >
            {mensaje.texto}
            <button
              type="button"
              className="btn-close"
              aria-label="Cerrar"
              onClick={() => setMensaje(null)}
            />
          </div>
        )}

        {pendiente && (
          <div
            className="alert alert-warning d-flex justify-content-between align-items-center"
            role="alert"
          >
            <span>
              ¿Seguro que quieres eliminar a <strong>{pendiente.nombre}</strong>?
            </span>
            <span>
              <button
                className="btn btn-sm btn-outline-secondary me-2"
                onClick={() => setPendiente(null)}
              >
                Cancelar
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={confirmarEliminacion}
              >
                Sí, eliminar
              </button>
            </span>
          </div>
        )}

        <div className="card shadow-sm border-secondary">
          <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
            <span className="fw-bold">Usuarios Registrados</span>
            <Link
              to="/admin/usuarios/nuevo"
              className="btn btn-info btn-sm text-dark fw-bold"
            >
              + Nuevo Usuario
            </Link>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Teléfono</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((user) => {
                    const esSesionActual = esAdminPredefinido(user.correo);
                    return (
                      <tr key={user.idUsuario}>
                        <td>{user.idUsuario}</td>
                        <td className="fw-semibold">{user.nombre}</td>
                        <td>{user.correo}</td>
                        <td>
                          <span
                            className={`badge ${
                              user.rol === 'admin'
                                ? 'bg-warning text-dark'
                                : user.rol === 'vendedor'
                                ? 'bg-info text-dark'
                                : 'bg-secondary'
                            }`}
                          >
                            {user.rol}
                          </span>
                        </td>
                        <td>{user.telefono || '—'}</td>
                        <td className="text-center">
                          <Link
                            to={`/admin/usuarios/editar/${encodeURIComponent(user.correo)}`}
                            className="btn btn-sm btn-outline-dark me-2"
                          >
                            Editar
                          </Link>
                          {esSesionActual ? (
                            <span className="text-muted small">Sesión actual</span>
                          ) : (
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() =>
                                setPendiente({
                                  idUsuario: user.idUsuario,
                                  nombre: user.nombre,
                                })
                              }
                            >
                              Eliminar
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}

                  {!cargando && usuarios.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-muted">
                        No hay usuarios registrados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}