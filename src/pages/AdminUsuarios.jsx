import { Link } from 'react-router-dom';

export default function AdminUsuarios() {
  // Datos de ejemplo para la tabla de usuarios del panel admin
  const usuariosAdmin = [
    { id: 1, nombre: "Juan Pérez", correo: "juan.perez@duoc.cl", regionComuna: "Región Metropolitana / Santiago" },
    { id: 2, nombre: "María González", correo: "maria.gonzalez@gmail.com", regionComuna: "Región de Valparaíso / Viña del Mar" }
  ];

  return (
    <main className="py-5">
      <div className="container">
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/admin" className="text-decoration-none">Admin Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Usuarios</li>
          </ol>
        </nav>

        <div className="card shadow-sm border-secondary">
          <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
            <span className="fw-bold">Usuarios Registrados</span>
            <Link to="/admin/usuarios/nuevo" className="btn btn-info btn-sm text-dark fw-bold">+ Nuevo Usuario</Link>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Región / Comuna</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuariosAdmin.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td className="fw-semibold">{user.nombre}</td>
                      <td>{user.correo}</td>
                      <td>{user.regionComuna}</td>
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