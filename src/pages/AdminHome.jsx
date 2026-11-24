
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../services/api';
import { seccionesAdmin } from '../data/adminSecciones';

export default function AdminHome() {
  const [totales, setTotales] = useState({
    compras: 0,
    productos: 0,
    usuarios: 0,
    ingresos: 0,
    pendientes: 0,
    pocoStock: 0,
  });

  const [pedidosRecientes, setPedidosRecientes] = useState([]);
  const [productosBajoStock, setProductosBajoStock] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const formatoPrecio = (valor) =>
    new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(valor);

  const formatoFecha = (fecha) =>
    new Date(fecha).toLocaleString('es-CL');

  // Obtener datos reales desde Spring Boot
  const cargarResumen = async () => {
    try {
      setCargando(true);
      setError('');

      const [productos, usuarios, pedidos] = await Promise.all([
        apiRequest('/productos'),
        apiRequest('/usuarios'),
        apiRequest('/pedidos'),
      ]);

      const pagados = pedidos.filter(
        (pedido) => pedido.estadoPago === 'pagado'
      );

      const pendientes = pedidos.filter(
        (pedido) => pedido.estadoPago === 'pendiente'
      );

      const ingresos = pagados.reduce(
        (total, pedido) => total + Number(pedido.total),
        0
      );

      const bajoStock = productos
        .filter((producto) => Number(producto.stock) <= 5)
        .sort((a, b) => a.stock - b.stock);

      setTotales({
        compras: pedidos.length,
        productos: productos.length,
        usuarios: usuarios.length,
        ingresos: ingresos,
        pendientes: pendientes.length,
        pocoStock: bajoStock.length,
      });

      setPedidosRecientes(
        [...pedidos]
          .sort(
            (a, b) =>
              new Date(b.fechaPedido) - new Date(a.fechaPedido)
          )
          .slice(0, 5)
          .map((pedido) => {
            const cliente = usuarios.find(
              (u) => u.idUsuario === pedido.idUsuario
            );

            return {
              ...pedido,
              cliente: cliente
                ? `${cliente.nombre} ${cliente.apellido}`
                : `Usuario #${pedido.idUsuario}`,
            };
          })
      );

      setProductosBajoStock(bajoStock);

    } catch (err) {
      setError(err.message);
      console.error('Error al cargar dashboard:', err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarResumen();
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
    {
      titulo: 'Ingresos',
      valor: formatoPrecio(totales.ingresos),
      icono: '💰',
      detalle: 'Pedidos pagados',
      clases: 'bg-dark text-white',
    },
    {
      titulo: 'Pedidos pendientes',
      valor: totales.pendientes,
      icono: '⏳',
      detalle: 'Pendientes de pago',
      clases: 'bg-info text-dark',
    },
    {
      titulo: 'Productos con poco stock',
      valor: totales.pocoStock,
      icono: '⚠️',
      detalle: '5 unidades o menos',
      clases: 'bg-danger text-white',
    },
  ];

  const accesos = [
    ...seccionesAdmin,
    {
      to: '/',
      titulo: 'Tienda',
      icono: '🏪',
      descripcion:
        'Visualiza tu tienda y revisa el catálogo público.',
    },
  ];

  const colorEstado = (estado) => {
    switch (estado) {
      case 'pagado':
        return 'bg-success';
      case 'pendiente':
        return 'bg-warning text-dark';
      case 'cancelado':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <>

      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

        <div>
          <h2 className="h4 fw-bold mb-0">
            Dashboard
          </h2>

          <p className="text-muted small mb-0">
            Resumen general de MotorStore
          </p>
        </div>

        <button
          className="btn btn-dark"
          onClick={cargarResumen}
          disabled={cargando}
        >
          {cargando ? 'Cargando...' : 'Actualizar'}
        </button>

      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="alert alert-danger">
          No se pudo actualizar el dashboard: {error}
        </div>
      )}

      {cargando ? (
        <div className="text-center py-5">
          <div
            className="spinner-border text-dark"
            role="status"
          />

          <p className="mt-3">
            Cargando información...
          </p>
        </div>
      ) : (
        <>

          {/* Indicadores */}
          <div className="row g-3 mb-4">

            {estadisticas.map((e) => (
              <div
                className="col-12 col-sm-6 col-xl-4"
                key={e.titulo}
              >

                <div
                  className={`card border-0 shadow-sm h-100 ${e.clases}`}
                >

                  <div className="card-body d-flex align-items-center gap-3">

                    <span
                      className="fs-1"
                      aria-hidden="true"
                    >
                      {e.icono}
                    </span>

                    <div>
                      <div className="fw-semibold">
                        {e.titulo}
                      </div>

                      <div className="fs-3 fw-bold lh-1 my-1">
                        {e.valor}
                      </div>

                      <small>{e.detalle}</small>
                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>

          {/* Pedidos recientes */}
          <div className="card border-0 shadow-sm mb-4">

            <div className="card-header bg-white d-flex justify-content-between align-items-center">

              <h3 className="h6 fw-bold mb-0">
                Pedidos recientes
              </h3>

              <Link
                to="/admin/ordenes"
                className="btn btn-outline-dark btn-sm"
              >
                Ver todos
              </Link>

            </div>

            <div className="table-responsive">

              <table className="table table-hover align-middle mb-0">

                <thead className="table-dark">
                  <tr>
                    <th>Pedido</th>
                    <th>Cliente</th>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Estado</th>
                  </tr>
                </thead>

                <tbody>

                  {pedidosRecientes.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-4"
                      >
                        No hay pedidos disponibles.
                      </td>
                    </tr>
                  ) : (
                    pedidosRecientes.map((pedido) => (
                      <tr key={pedido.idPedido}>

                        <td>#{pedido.idPedido}</td>

                        <td>{pedido.cliente}</td>

                        <td>
                          {formatoFecha(pedido.fechaPedido)}
                        </td>

                        <td className="fw-bold">
                          {formatoPrecio(pedido.total)}
                        </td>

                        <td>
                          <span
                            className={`badge ${colorEstado(
                              pedido.estadoPago
                            )}`}
                          >
                            {pedido.estadoPago}
                          </span>
                        </td>

                      </tr>
                    ))
                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* Alertas de inventario */}
          <div className="card border-0 shadow-sm mb-4">

            <div className="card-header bg-white d-flex justify-content-between align-items-center">

              <h3 className="h6 fw-bold mb-0">
                Alertas de inventario
              </h3>

              <Link
                to="/admin/productos"
                className="btn btn-outline-dark btn-sm"
              >
                Administrar productos
              </Link>

            </div>

            <div className="card-body">

              {productosBajoStock.length === 0 ? (
                <div className="alert alert-success mb-0">
                  No hay productos con stock bajo.
                </div>
              ) : (
                <div className="table-responsive">

                  <table className="table table-hover align-middle mb-0">

                    <thead className="table-light">
                      <tr>
                        <th>Producto</th>
                        <th>Categoría</th>
                        <th>Stock</th>
                        <th>Acción</th>
                      </tr>
                    </thead>

                    <tbody>

                      {productosBajoStock.map((producto) => (
                        <tr key={producto.idProducto}>

                          <td className="fw-semibold">
                            {producto.nombreProducto}
                          </td>

                          <td>
                            {producto.categoria?.nombreCategoria ||
                              'Sin categoría'}
                          </td>

                          <td>
                            <span
                              className={`badge ${
                                producto.stock <= 0
                                  ? 'bg-danger'
                                  : 'bg-warning text-dark'
                              }`}
                            >
                              {producto.stock <= 0
                                ? 'Sin stock'
                                : `${producto.stock} unidades`}
                            </span>
                          </td>

                          <td>
                            <Link
                              to={`/admin/productos/editar/${producto.idProducto}`}
                              className="btn btn-outline-primary btn-sm"
                            >
                              Editar
                            </Link>
                          </td>

                        </tr>
                      ))}

                    </tbody>

                  </table>

                </div>
              )}

            </div>

          </div>

        </>
      )}

      {/* Accesos directos */}
      <h3 className="h5 fw-bold mb-3">
        Accesos rápidos
      </h3>

      <div className="row g-3">

        {accesos.map((a) => (
          <div
            className="col-12 col-sm-6 col-xl-3"
            key={a.titulo}
          >

            <Link
              to={a.to}
              className="text-decoration-none"
            >

              <div className="card h-100 border-0 shadow-sm text-center">

                <div className="card-body">

                  <div
                    className="fs-3 mb-1"
                    aria-hidden="true"
                  >
                    {a.icono}
                  </div>

                  <h3 className="h6 fw-bold text-dark">
                    {a.titulo}
                  </h3>

                  <p className="small text-muted mb-0">
                    {a.descripcion}
                  </p>

                </div>

              </div>

            </Link>

          </div>
        ))}

      </div>

    </>
  );
}
