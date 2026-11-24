
import { useEffect, useState } from 'react';
import { apiRequest } from '../services/api';

const formatoPrecio = (valor) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(valor);

export default function AdminReportes() {
  const [pedidos, setPedidos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const cargarDatos = async () => {
    try {
      setCargando(true);
      setError('');

      const [datosPedidos, datosProductos] = await Promise.all([
        apiRequest('/pedidos'),
        apiRequest('/productos'),
      ]);

      setPedidos(datosPedidos);
      setProductos(datosProductos);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // Filtrar pedidos por fecha
  const pedidosFiltrados = pedidos.filter((pedido) => {
    const fecha = pedido.fechaPedido?.slice(0, 10) || '';

    if (desde && fecha < desde) return false;
    if (hasta && fecha > hasta) return false;

    return true;
  });

  const pagados = pedidosFiltrados.filter(
    (p) => p.estadoPago === 'pagado'
  );

  const pendientes = pedidosFiltrados.filter(
    (p) => p.estadoPago === 'pendiente'
  );

  const cancelados = pedidosFiltrados.filter(
    (p) => p.estadoPago === 'cancelado'
  );

  const ingresos = pagados.reduce(
    (total, p) => total + Number(p.total),
    0
  );

  const valorInventario = productos.reduce(
    (total, p) => total + Number(p.precio) * Number(p.stock),
    0
  );

  const unidadesInventario = productos.reduce(
    (total, p) => total + Number(p.stock),
    0
  );

  // Productos más vendidos: solo pedidos pagados
  const ventasPorProducto = {};

  pagados.forEach((pedido) => {
    (pedido.detalles || []).forEach((detalle) => {
      const id = detalle.idProducto;

      if (!ventasPorProducto[id]) {
        ventasPorProducto[id] = {
          id,
          nombre: detalle.nombreProducto,
          cantidad: 0,
          ingresos: 0,
        };
      }

      ventasPorProducto[id].cantidad += Number(detalle.cantidad);

      ventasPorProducto[id].ingresos += Number(
        detalle.subtotal ??
        detalle.precioUnitario * detalle.cantidad
      );
    });
  });

  const masVendidos = Object.values(ventasPorProducto).sort(
    (a, b) => b.cantidad - a.cantidad
  );

  const indicadores = [
    {
      titulo: 'Ingresos por ventas',
      valor: formatoPrecio(ingresos),
      icono: '💰',
      clase: 'bg-success text-white',
    },
    {
      titulo: 'Pedidos pagados',
      valor: pagados.length,
      icono: '✅',
      clase: 'bg-primary text-white',
    },
    {
      titulo: 'Pedidos pendientes',
      valor: pendientes.length,
      icono: '⏳',
      clase: 'bg-warning text-dark',
    },
    {
      titulo: 'Pedidos cancelados',
      valor: cancelados.length,
      icono: '❌',
      clase: 'bg-danger text-white',
    },
    {
      titulo: 'Valor del inventario',
      valor: formatoPrecio(valorInventario),
      icono: '📦',
      clase: 'bg-dark text-white',
    },
    {
      titulo: 'Unidades en inventario',
      valor: unidadesInventario,
      icono: '🏪',
      clase: 'bg-info text-dark',
    },
  ];

  // Exportar reporte compatible con Excel
  const exportarCSV = () => {
    const filas = [
      ['REPORTE MOTORSTORE'],
      ['Desde', desde || 'Sin límite'],
      ['Hasta', hasta || 'Sin límite'],
      [],
      ['Indicador', 'Valor'],
      ['Ingresos por ventas', ingresos],
      ['Pedidos pagados', pagados.length],
      ['Pedidos pendientes', pendientes.length],
      ['Pedidos cancelados', cancelados.length],
      ['Valor del inventario actual', valorInventario],
      ['Unidades en inventario actual', unidadesInventario],
      [],
      ['PRODUCTOS MÁS VENDIDOS'],
      ['Producto', 'Unidades vendidas', 'Ingresos'],
      ...masVendidos.map((p) => [
        p.nombre,
        p.cantidad,
        p.ingresos,
      ]),
      [],
      ['DETALLE DE PEDIDOS'],
      ['ID Pedido', 'Fecha', 'Total', 'Estado'],
      ...pedidosFiltrados.map((p) => [
        p.idPedido,
        p.fechaPedido,
        p.total,
        p.estadoPago,
      ]),
    ];

    const escaparCSV = (valor) => {
      let texto = String(valor ?? '');

      if (/^[=+\-@\t\r\n]/.test(texto)) {
        texto = "'" + texto;
      }

      return `"${texto.replace(/"/g, '""')}"`;
    };

    const contenido = filas
      .map((fila) => fila.map(escaparCSV).join(';'))
      .join('\r\n');

    const archivo = new Blob(
      ['\uFEFF' + contenido],
      { type: 'text/csv;charset=utf-8;' }
    );

    const url = URL.createObjectURL(archivo);
    const enlace = document.createElement('a');

    enlace.href = url;
    enlace.download = `reporte_motorstore_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(enlace);
    enlace.click();
    enlace.remove();

    URL.revokeObjectURL(url);
  };

  const estados = [
    {
      nombre: 'Pagados',
      cantidad: pagados.length,
      clase: 'bg-success',
    },
    {
      nombre: 'Pendientes',
      cantidad: pendientes.length,
      clase: 'bg-warning',
    },
    {
      nombre: 'Cancelados',
      cantidad: cancelados.length,
      clase: 'bg-danger',
    },
  ];

  const fechasInvalidas = desde && hasta && desde > hasta;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h2 className="h4 fw-bold mb-0">Reportes</h2>

          <p className="text-muted small mb-0">
            Estadísticas de ventas e inventario de MotorStore
          </p>
        </div>

        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-dark"
            onClick={cargarDatos}
            disabled={cargando}
          >
            Actualizar
          </button>

          <button
            className="btn btn-success"
            onClick={exportarCSV}
            disabled={cargando || !!error || !!fechasInvalidas}
          >
            📥 Exportar CSV
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger">
          No se pudieron cargar los reportes: {error}
        </div>
      )}

      {cargando ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status" />
          <p className="mt-3">Cargando reportes...</p>
        </div>
      ) : !error && (
        <>
          {/* Filtros */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h3 className="h6 fw-bold mb-3">
                Filtrar ventas por fecha
              </h3>

              <div className="row g-3 align-items-end">
                <div className="col-12 col-md-4">
                  <label className="form-label">Desde</label>

                  <input
                    type="date"
                    className="form-control"
                    value={desde}
                    onChange={(e) => setDesde(e.target.value)}
                  />
                </div>

                <div className="col-12 col-md-4">
                  <label className="form-label">Hasta</label>

                  <input
                    type="date"
                    className="form-control"
                    value={hasta}
                    onChange={(e) => setHasta(e.target.value)}
                  />
                </div>

                <div className="col-12 col-md-4">
                  <button
                    className="btn btn-outline-secondary w-100"
                    onClick={() => {
                      setDesde('');
                      setHasta('');
                    }}
                  >
                    Limpiar filtros
                  </button>
                </div>
              </div>

              <small className="text-muted d-block mt-3">
                Los indicadores de inventario muestran el stock
                actual y no dependen del filtro de fechas.
              </small>

              {fechasInvalidas && (
                <div className="alert alert-warning mt-3 mb-0">
                  La fecha inicial no puede ser posterior a la final.
                </div>
              )}
            </div>
          </div>

          {!fechasInvalidas && (
            <>
              {/* Indicadores */}
              <div className="row g-3 mb-4">
                {indicadores.map((item) => (
                  <div
                    className="col-12 col-sm-6 col-xl-4"
                    key={item.titulo}
                  >
                    <div
                      className={`card border-0 shadow-sm h-100 ${item.clase}`}
                    >
                      <div className="card-body d-flex align-items-center gap-3">
                        <span className="fs-1">
                          {item.icono}
                        </span>

                        <div>
                          <div className="fw-semibold">
                            {item.titulo}
                          </div>

                          <div className="fs-3 fw-bold">
                            {item.valor}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Distribución de pedidos */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <h3 className="h6 fw-bold mb-4">
                    Distribución de pedidos por estado
                  </h3>

                  {estados.map((estado) => {
                    const porcentaje = pedidosFiltrados.length
                      ? (estado.cantidad / pedidosFiltrados.length) * 100
                      : 0;

                    return (
                      <div className="mb-3" key={estado.nombre}>
                        <div className="d-flex justify-content-between mb-1">
                          <span>{estado.nombre}</span>

                          <span className="fw-bold">
                            {estado.cantidad} ({porcentaje.toFixed(1)}%)
                          </span>
                        </div>

                        <div className="progress" style={{ height: 22 }}>
                          <div
                            className={`progress-bar ${estado.clase}`}
                            style={{ width: `${porcentaje}%` }}
                            role="progressbar"
                            aria-valuenow={porcentaje}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={estado.nombre}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Productos más vendidos */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white">
                  <h3 className="h6 fw-bold mb-0">
                    🏆 Productos más vendidos
                  </h3>
                </div>

                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th>Posición</th>
                        <th>Producto</th>
                        <th>Unidades vendidas</th>
                        <th>Ingresos</th>
                      </tr>
                    </thead>

                    <tbody>
                      {masVendidos.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center py-4">
                            No hay ventas pagadas en este período.
                          </td>
                        </tr>
                      ) : (
                        masVendidos.map((producto, index) => (
                          <tr key={producto.id}>
                            <td>#{index + 1}</td>

                            <td className="fw-semibold">
                              {producto.nombre}
                            </td>

                            <td>{producto.cantidad}</td>

                            <td className="text-success fw-bold">
                              {formatoPrecio(producto.ingresos)}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Inventario */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white">
                  <h3 className="h6 fw-bold mb-0">
                    Inventario valorizado actual
                  </h3>
                </div>

                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th>Producto</th>
                        <th>Stock</th>
                        <th>Precio unitario</th>
                        <th>Valor total</th>
                      </tr>
                    </thead>

                    <tbody>
                      {productos.map((producto) => (
                        <tr key={producto.idProducto}>
                          <td>{producto.nombreProducto}</td>
                          <td>{producto.stock}</td>
                          <td>{formatoPrecio(producto.precio)}</td>

                          <td className="fw-bold">
                            {formatoPrecio(
                              producto.precio * producto.stock
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>

                    <tfoot className="table-light">
                      <tr>
                        <th>Total</th>
                        <th>{unidadesInventario}</th>
                        <th></th>
                        <th>{formatoPrecio(valorInventario)}</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
