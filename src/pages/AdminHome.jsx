import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { obtenerProductos } from '../data/productosCRUD';
import { listarUsuariosAdmin } from '../data/usuariosCRUD';
import { apiRequest } from '../services/api';
import { seccionesAdmin } from '../data/adminSecciones';

export default function AdminHome() {
  const [totales, setTotales] = useState({
    compras: 0,
    productos: 0,
    usuarios: 0,
  });

  useEffect(() => {
    let activo = true;

    const cargarResumen = async () => {
      try {
        const [productos, usuarios, pedidos] = await Promise.all([
          obtenerProductos(),
          listarUsuariosAdmin().catch(() => []),
          apiRequest('/pedidos').catch(() => []),
        ]);

        if (!activo) return;

        setTotales({
          compras: Array.isArray(pedidos) ? pedidos.length : 0,
          productos: Array.isArray(productos) ? productos.length : 0,
          usuarios: Array.isArray(usuarios) ? usuarios.length : 0,
        });
      } catch (error) {
        console.error('Error al cargar resumen admin:', error);
      }
    };

    cargarResumen();
    return () => {
      activo = false;
    };
  }, []);

  const estadisticas = [
    {
      titulo: 'Compras',
      valor: totales.compras,
      icono: '🛒',
      detalle: 'Órdenes realizadas',
      clases: 'bg-primary text-white',
    },
    {
      titulo: 'Productos',
      valor: totales.productos,
      icono: '📦',
      detalle: 'Productos en inventario',
      clases: 'bg-success text-white',
    },
    {
      titulo: 'Usuarios',
      valor: totales.usuarios,
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
      descripcion: 'Visualiza tu tienda en tiempo real y revisa el catálogo público.',
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