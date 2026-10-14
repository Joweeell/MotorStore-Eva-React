import { Link } from 'react-router-dom';
import { obtenerProductos } from '../data/productosCRUD';
import { obtenerUsuarios } from '../data/usuariosCRUD';
import { seccionesAdmin } from '../data/adminSecciones';

// Cantidad de compras guardadas (se llenará cuando el checkout registre las órdenes)
const contarCompras = () => {
  try {
    const compras = JSON.parse(localStorage.getItem('motorstore_compras') || '[]');
    return Array.isArray(compras) ? compras.length : 0;
  } catch {
    return 0;
  }
};

export default function AdminHome() {
  const estadisticas = [
    {
      titulo: 'Compras',
      valor: contarCompras(),
      icono: '🛒',
      detalle: 'Órdenes realizadas',
      clases: 'bg-primary text-white',
    },
    {
      titulo: 'Productos',
      valor: obtenerProductos().length,
      icono: '📦',
      detalle: 'Productos en inventario',
      clases: 'bg-success text-white',
    },
    {
      titulo: 'Usuarios',
      // + 1 por el administrador predefinido, que no se guarda en localStorage
      valor: obtenerUsuarios().length + 1,
      icono: '👥',
      detalle: 'Usuarios registrados',
      clases: 'bg-warning text-dark',
    },
  ];

  const accesos = [
    ...seccionesAdmin,
    {
      to: '/',
      titulo: 'Tienda',
      icono: '🏪',
      descripcion: 'Visualiza tu tienda en tiempo real, visualiza los reportes de los usuarios.',
    },
  ];

  return (
    <>
      <h2 className="h4 fw-bold mb-0">Dashboard</h2>
      <p className="text-muted small mb-4">Resumen de las actividades diarias</p>

      <div className="row g-3 mb-4">
        {estadisticas.map((e) => (
          <div className="col-12 col-md-4" key={e.titulo}>
            <div className={`card border-0 shadow-sm h-100 ${e.clases}`}>
              <div className="card-body d-flex align-items-center gap-3">
                <span className="fs-1" aria-hidden="true">{e.icono}</span>
                <div>
                  <div className="fw-semibold">{e.titulo}</div>
                  <div className="fs-3 fw-bold lh-1">{e.valor}</div>
                  <small>{e.detalle}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-3">
        {accesos.map((a) => (
          <div className="col-12 col-sm-6 col-xl-3" key={a.titulo}>
            <Link to={a.to} className="text-decoration-none">
              <div className="card h-100 border-0 shadow-sm text-center">
                <div className="card-body">
                  <div className="fs-3 mb-1" aria-hidden="true">{a.icono}</div>
                  <h3 className="h6 fw-bold text-dark">{a.titulo}</h3>
                  <p className="small text-muted mb-0">{a.descripcion}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}