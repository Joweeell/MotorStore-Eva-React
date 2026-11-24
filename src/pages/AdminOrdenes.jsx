
import { useEffect, useState } from 'react';
import { apiRequest } from '../services/api';

export default function AdminOrdenes() {
  const [pedidos, setPedidos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [actualizando, setActualizando] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

  const formatoPrecio = (valor) =>
    new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(valor);

  const formatoFecha = (fecha) =>
    new Date(fecha).toLocaleString('es-CL');

  // Cargar pedidos y usuarios desde el backend
  const cargarPedidos = async () => {
    try {
      setCargando(true);
      setError('');

      const [datosPedidos, datosUsuarios] = await Promise.all([
        apiRequest('/pedidos'),
        apiRequest('/usuarios'),
      ]);

      setPedidos(datosPedidos || []);
      setUsuarios(datosUsuarios || []);

      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarPedidos();
  }, []);

  // Actualizar el estado del pedido en MySQL
  const cambiarEstado = async (idPedido, nuevoEstado) => {
    if (!['pagado', 'cancelado'].includes(nuevoEstado)) {
      return;
    }

    const confirmado = window.confirm(
      `¿Deseas cambiar el estado del pedido #${idPedido} a ${nuevoEstado}?`
    );

    if (!confirmado) return;

    try {
      setActualizando(true);
      setError('');
      setMensaje('');

      await apiRequest(`/pedidos/${idPedido}/estado`, {
        method: 'PUT',
        body: JSON.stringify({
          estadoPago: nuevoEstado,
        }),
      });

      setPedidoSeleccionado(null);

      const recargado = await cargarPedidos();

      if (recargado) {
        setMensaje(
          `El pedido #${idPedido} fue actualizado a ${nuevoEstado} correctamente.`
        );
      } else {
        setMensaje(
          'El estado se guardó, pero no se pudo recargar la tabla. Presiona Actualizar.'
        );
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setActualizando(false);
    }
  };

  // Obtener el nombre del cliente
  const obtenerCliente = (idUsuario) => {
    const usuario = usuarios.find(
      (u) => u.idUsuario === idUsuario
    );

    return usuario
      ? `${usuario.nombre} ${usuario.apellido}`
      : `Usuario #${idUsuario}`;
  };

  // Colores según el estado del pedido
  const colorEstado = (estado) => {
    switch (estado) {
      case 'pendiente':
        return 'bg-warning text-dark';
      case 'pagado':
        return 'bg-success';
      case 'cancelado':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  // Indicadores
  const pendientes = pedidos.filter(
    (p) => p.estadoPago === 'pendiente'
  ).length;

  const totalRegistrado = pedidos.reduce(
    (total, pedido) => total + Number(pedido.total),
    0
  );

  return (
    <div className="container-fluid py-4">

      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Órdenes / Boletas</h2>

          <p className="text-muted mb-0">
            Administra los pedidos realizados por los clientes.
          </p>
        </div>

        <button
          className="btn btn-dark"
          onClick={cargarPedidos}
          disabled={cargando || actualizando}
        >
          {cargando ? 'Cargando...' : 'Actualizar'}
        </button>
      </div>

      {/* Indicadores */}
      <div className="row g-3 mb-4">

        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted">Total de pedidos</p>

              <h3 className="fw-bold">
                {pedidos.length}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted">Pedidos pendientes</p>

              <h3 className="fw-bold text-warning">
                {pendientes}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted">Total registrado</p>

              <h3 className="fw-bold text-success">
                {formatoPrecio(totalRegistrado)}
              </h3>
            </div>
          </div>
        </div>

      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Mensaje de actualización exitosa */}
      {mensaje && (
        <div
          className="alert alert-success alert-dismissible"
          role="alert"
        >
          {mensaje}

          <button
            type="button"
            className="btn-close"
            aria-label="Cerrar mensaje"
            onClick={() => setMensaje('')}
          />
        </div>
      )}

      {/* Tabla de pedidos */}
      {cargando ? (
        <div className="text-center py-4">
          <div
            className="spinner-border text-dark"
            role="status"
          />

          <p className="mt-2">Cargando pedidos...</p>
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="table-responsive">

            <table className="table table-hover align-middle mb-0">

              <thead className="table-dark">
                <tr>
                  <th>Pedido</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {pedidos.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      {error
                        ? 'No se pudieron cargar los pedidos.'
                        : 'No hay pedidos registrados.'}
                    </td>
                  </tr>
                ) : (
                  pedidos.map((pedido) => (
                    <tr key={pedido.idPedido}>

                      <td>#{pedido.idPedido}</td>

                      <td>
                        {obtenerCliente(pedido.idUsuario)}
                      </td>

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

                      <td>
                        <div className="d-flex gap-2 flex-wrap">

                          {/* Ver detalle */}
                          <button
                            className="btn btn-outline-dark btn-sm"
                            onClick={() =>
                              setPedidoSeleccionado(pedido)
                            }
                          >
                            Ver detalle
                          </button>

                          {/* Cambiar estado de pedidos pendientes */}
                          {pedido.estadoPago === 'pendiente' && (
                            <select
                              className="form-select form-select-sm w-auto"
                              value=""
                              disabled={actualizando}
                              aria-label={`Cambiar estado del pedido ${pedido.idPedido}`}
                              onChange={(e) =>
                                cambiarEstado(
                                  pedido.idPedido,
                                  e.target.value
                                )
                              }
                            >
                              <option value="" disabled>
                                Cambiar estado
                              </option>

                              <option value="pagado">
                                Pagado
                              </option>

                              <option value="cancelado">
                                Cancelado
                              </option>
                            </select>
                          )}

                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>

            </table>

          </div>
        </div>
      )}

      {/* Modal de detalle del pedido */}
      {pedidoSeleccionado && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="tituloDetallePedido"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">

            <div className="modal-content">

              <div className="modal-header">
                <h5
                  className="modal-title"
                  id="tituloDetallePedido"
                >
                  Detalle del pedido #{pedidoSeleccionado.idPedido}
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  aria-label="Cerrar"
                  onClick={() => setPedidoSeleccionado(null)}
                />
              </div>

              <div className="modal-body">

                <p>
                  <strong>Cliente: </strong>
                  {obtenerCliente(pedidoSeleccionado.idUsuario)}
                </p>

                <p>
                  <strong>Fecha: </strong>
                  {formatoFecha(pedidoSeleccionado.fechaPedido)}
                </p>

                <p>
                  <strong>Dirección: </strong>
                  {pedidoSeleccionado.direccionEnvio}
                </p>

                <p>
                  <strong>Ciudad: </strong>
                  {pedidoSeleccionado.ciudad}
                </p>

                <p>
                  <strong>Estado: </strong>

                  <span
                    className={`badge ${colorEstado(
                      pedidoSeleccionado.estadoPago
                    )}`}
                  >
                    {pedidoSeleccionado.estadoPago}
                  </span>
                </p>

                <h6 className="fw-bold mt-4 mb-3">
                  Productos del pedido
                </h6>

                <div className="table-responsive">

                  <table className="table table-bordered">

                    <thead className="table-light">
                      <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio unitario</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>

                    <tbody>
                      {pedidoSeleccionado.detalles?.map((detalle) => (
                        <tr key={detalle.idDetalle}>

                          <td>
                            {detalle.nombreProducto}
                          </td>

                          <td>
                            {detalle.cantidad}
                          </td>

                          <td>
                            {formatoPrecio(detalle.precioUnitario)}
                          </td>

                          <td>
                            {formatoPrecio(detalle.subtotal)}
                          </td>

                        </tr>
                      ))}
                    </tbody>

                  </table>

                </div>

                <h5 className="text-end fw-bold">
                  Total: {formatoPrecio(pedidoSeleccionado.total)}
                </h5>

              </div>

              <div className="modal-footer">

                {pedidoSeleccionado.estadoPago === 'pendiente' && (
                  <>
                    <button
                      className="btn btn-success"
                      disabled={actualizando}
                      onClick={() =>
                        cambiarEstado(
                          pedidoSeleccionado.idPedido,
                          'pagado'
                        )
                      }
                    >
                      Marcar como pagado
                    </button>

                    <button
                      className="btn btn-outline-danger"
                      disabled={actualizando}
                      onClick={() =>
                        cambiarEstado(
                          pedidoSeleccionado.idPedido,
                          'cancelado'
                        )
                      }
                    >
                      Cancelar pedido
                    </button>
                  </>
                )}

                <button
                  className="btn btn-secondary"
                  onClick={() => setPedidoSeleccionado(null)}
                >
                  Cerrar
                </button>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
