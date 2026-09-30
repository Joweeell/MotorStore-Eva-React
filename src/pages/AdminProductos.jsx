import { Link } from 'react-router-dom';

export default function AdminProductos() {
  // Datos de ejemplo para la tabla del panel admin
  const productosAdmin = [
    { id: 1, nombre: "Suzuki GSXR 1000", categoria: "Deportiva", precio: 15000000 },
    { id: 2, nombre: "Kawasaki Ninja", categoria: "Deportiva", precio: 14500000 },
    { id: 3, nombre: "Yamaha R9", categoria: "Deportiva", precio: 16000000 },
    { id: 4, nombre: "Porta Patente", categoria: "Accesorio", precio: 40000 }
  ];

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
                  {productosAdmin.map((prod) => (
                    <tr key={prod.id}>
                      <td>{prod.id}</td>
                      <td className="fw-semibold">{prod.nombre}</td>
                      <td>{prod.categoria}</td>
                      <td>${prod.precio.toLocaleString('es-CL')}</td>
                      <td className="text-center">
                        <button className="btn btn-sm btn-outline-dark me-2">Editar</button>
                        <button className="btn btn-sm btn-outline-danger">Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}