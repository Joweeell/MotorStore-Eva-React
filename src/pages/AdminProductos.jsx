
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  obtenerProductos,
  eliminarProducto,
} from '../data/productosCRUD';

export default function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  const cargarProductos = () => {
    try {
      setProductos(obtenerProductos());
    } catch (error) {
      console.error('Error al cargar los productos:', error);
      setProductos([]);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleEliminar = (id, nombre) => {
    const confirmar = window.confirm(
      `¿Estás seguro de eliminar "${nombre}"?`
    );

    if (!confirmar) return;

    try {
      const eliminado = eliminarProducto(id);

      if (eliminado) {
        setProductos((actuales) =>
          actuales.filter((producto) => producto.id !== id)
        );
      } else {
        window.alert('No se encontró el producto para eliminar.');
        cargarProductos();
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      window.alert('No se pudo eliminar el producto.');
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
            <li
              className="breadcrumb-item active"
              aria-current="page"
            >
              Productos
            </li>
          </ol>
        </nav>

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
                      <td>
                        ${Number(prod.precio).toLocaleString('es-CL')}
                      </td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-dark"
                            onClick={() =>
                              navigate(
                                `/admin/productos/editar/${prod.id}`
                              )
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

                  {productos.length === 0 && (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-4 text-muted"
                      >
                        No hay productos en el inventario.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card-footer text-muted small">
            Productos registrados: {productos.length}
          </div>
        </div>
      </div>
    </main>
  );
}
