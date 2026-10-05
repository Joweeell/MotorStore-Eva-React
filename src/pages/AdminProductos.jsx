import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { obtenerProductos, eliminarProducto } from '../data/productosCRUD';

export default function AdminProductos() {
  // Estado para guardar los productos que vienen del CRUD
  const [productos, setProductos] = useState([]);

  // LEER: Carga inicial de productos al montar el componente
  useEffect(() => {
    setProductos(obtenerProductos());
  }, []);

  // ELIMINAR: Borra el registro y actualiza la tabla
  const handleEliminar = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      eliminarProducto(id);
      setProductos(obtenerProductos()); // Recarga los datos en tiempo real
    }
  };

  return (
    <main className="py-5">
      <div className="container">
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/admin" className="text-decoration-none">Admin Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Productos</li>
          </ol>
        </nav>

        <div className="card shadow-sm border-secondary">
          <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
            <span className="fw-bold">Catálogo de Productos</span>
            <Link to="/admin/productos/nuevo" className="btn btn-info btn-sm text-dark fw-bold">+ Nuevo Producto</Link>
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
                      <td>${Number(prod.precio).toLocaleString('es-CL')}</td>
                      <td className="text-center">
                        <button className="btn btn-sm btn-outline-dark me-2">Editar</button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleEliminar(prod.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                  {productos.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">No hay productos en el inventario.</td>
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