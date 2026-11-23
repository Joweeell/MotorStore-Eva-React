import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { obtenerProductos, eliminarProducto } from '../data/productosCRUD';

export default function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const [mensaje, setMensaje] = useState(
    location.state?.mensaje
      ? { tipo: 'success', texto: location.state.mensaje }
      : null
  );

  const [pendiente, setPendiente] = useState(null);

  const cargarProductos = async () => {
    setCargando(true);
    try {
      const lista = await obtenerProductos();
      setProductos(Array.isArray(lista) ? lista : []);
    } catch (error) {
      console.error('Error al cargar los productos:', error);
      setProductos([]);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleEliminar = (id, nombre) => {
    setMensaje(null);
    setPendiente({ id, nombre });
  };

  const confirmarEliminacion = async () => {
    const { id, nombre } = pendiente;
    setPendiente(null);

    try {
      const eliminado = await eliminarProducto(id);

      if (eliminado) {
        setProductos((actuales) =>
          actuales.filter((producto) => producto.id !== id)
        );
        setMensaje({
          tipo: 'success',
          texto: `"${nombre}" se eliminó correctamente.`,
        });
      } else {
        setMensaje({
          tipo: 'warning',
          texto: 'No se pudo eliminar el producto (puede tener pedidos asociados o faltan permisos).',
        });
        cargarProductos();
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      setMensaje({
        tipo: 'danger',
        texto: 'No se pudo eliminar el producto.',
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
              Productos
            </li>
          </ol>
        </nav>

        {mensaje && (
          <div
            className={`alert alert-${mensaje.tipo} d-flex justify-content-between align-items-center`}
            role="status"
          >
            <span>{mensaje.texto}</span>
            <button
              type="button"
              className="btn-close"
              aria-label="Cerrar"
              onClick={() => setMensaje(null)}
            ></button>
          </div>
        )}

        {pendiente && (
          <div
            className="alert alert-warning d-flex flex-wrap justify-content-between align-items-center gap-2"
            role="alert"
          >
            <span>¿Estás seguro de eliminar "{pendiente.nombre}"?</span>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={() => setPendiente(null)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={confirmarEliminacion}
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        )}

        <div className="card shadow-sm border-secondary">
          <div className="card-header bg-dark text-white d-flex flex-wrap justify-content-between align-items-center gap-2">
            <span className="fw-bold">Catálogo de productos</span>

            <Link
              to="/admin/productos/nuevo"
              className="btn btn-info btn-sm text-dark fw-bold"
            >
              + Nuevo producto
            </Link>
          </div>

          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Stock</th>
                    <th>Precio</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {productos.map((prod) => (
                    <tr key={prod.id}>
                      <td>{prod.id}</td>
                      <td className="fw-semibold">{prod.nombre}</td>
                      <td>{prod.categoria}</td>
                      <td>{prod.stock}</td>
                      <td>${Number(prod.precio).toLocaleString('es-CL')}</td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-dark"
                            onClick={() =>
                              navigate(`/admin/productos/editar/${prod.id}`)
                            }
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() =>
                              handleEliminar(prod.id, prod.nombre)
                            }
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {!cargando && productos.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-muted">
                        No hay productos en el inventario.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card-footer text-muted small">
            {cargando
              ? 'Cargando inventario...'
              : `Productos registrados: ${productos.length}`}
          </div>
        </div>
      </div>
    </main>
  );
}