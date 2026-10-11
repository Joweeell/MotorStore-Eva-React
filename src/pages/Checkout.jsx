
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CART_KEY = 'motorstore_carrito';

const formatoPrecio = (precio) =>
  `$${Number(precio).toLocaleString('es-CL')}`;

const leerCarrito = () => {
  try {
    const datos = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    if (!Array.isArray(datos)) return [];

    return datos.filter(
      (p) =>
        p &&
        p.id !== undefined &&
        Number.isFinite(Number(p.precio)) &&
        Number(p.precio) >= 0
    ).map((p) => ({
      ...p,
      cantidad: Math.max(1, Math.floor(Number(p.cantidad) || 1)),
    }));
  } catch {
    return [];
  }
};

export default function Checkout() {
  const navigate = useNavigate();
  const carrito = leerCarrito();

  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    calle: '',
    depto: '',
    region: '',
    comuna: '',
    indicaciones: '',
  });

  const [tipoEnvio, setTipoEnvio] = useState('estandar');

  const opcionesEnvio = {
    estandar: { nombre: 'Envío estándar', precio: 2990 },
    express: { nombre: 'Envío express', precio: 5990 },
    retiro: { nombre: 'Retiro en tienda', precio: 0 },
  };

  const subtotal = carrito.reduce(
    (total, producto) =>
      total + Number(producto.precio) * producto.cantidad,
    0
  );

  const envio = opcionesEnvio[tipoEnvio].precio;
  const total = subtotal + envio;

  const handleChange = (e) => {
    setFormData((anterior) => ({
      ...anterior,
      [e.target.name]: e.target.value,
    }));
  };

  const simularPagoExitoso = (e) => {
    e.preventDefault();

    if (carrito.length === 0) return;

    const compra = {
      formData,
      carrito,
      subtotal,
      envio,
      tipoEnvio: opcionesEnvio[tipoEnvio].nombre,
      total,
      nroOrden: `MS-${Date.now()}`,
    };

    // Guardar el resumen de la compra realizada.
    localStorage.setItem('motorstore_ultima_compra', JSON.stringify(compra));

    // Vaciar el carrito solo cuando la compra resulta exitosa.
    localStorage.setItem(CART_KEY, '[]');
    window.dispatchEvent(new Event('carritoActualizado'));

    navigate('/pago-correcto', { state: compra });
  };

  const simularPagoError = () => {
    navigate('/pago-error', {
      state: { formData, carrito, subtotal, envio, total },
    });
  };

  if (carrito.length === 0) {
    return (
      <main className="container py-5">
        <div className="alert alert-info">
          <h4>Tu carrito está vacío</h4>
          <p>Agrega productos antes de continuar con la compra.</p>
          <Link to="/productos" className="btn btn-primary">
            Ir al catálogo
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="py-5 bg-light">
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="card shadow-sm border-0 p-4">
          <h2 className="fw-bold mb-2">Finalizar compra</h2>
          <p className="text-muted">
            Completa tus datos y revisa el pedido antes de pagar.
          </p>

          <form onSubmit={simularPagoExitoso}>
            <h5 className="fw-bold mt-4 mb-3 border-bottom pb-2">
              Información del cliente
            </h5>

            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="nombre" className="form-label">Nombre *</label>
                <input
                  id="nombre"
                  className="form-control"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  autoComplete="given-name"
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="apellidos" className="form-label">Apellidos *</label>
                <input
                  id="apellidos"
                  className="form-control"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  autoComplete="family-name"
                  required
                />
              </div>

              <div className="col-12">
                <label htmlFor="correo" className="form-label">Correo electrónico *</label>
                <input
                  id="correo"
                  type="email"
                  className="form-control"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <h5 className="fw-bold mt-4 mb-3 border-bottom pb-2">
              Dirección de entrega
            </h5>

            <div className="row g-3">
              <div className="col-md-8">
                <label htmlFor="calle" className="form-label">Calle y número *</label>
                <input
                  id="calle"
                  className="form-control"
                  name="calle"
                  value={formData.calle}
                  onChange={handleChange}
                  autoComplete="street-address"
                  required
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="depto" className="form-label">Departamento</label>
                <input
                  id="depto"
                  className="form-control"
                  name="depto"
                  value={formData.depto}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="region" className="form-label">Región *</label>
                <input
                  id="region"
                  className="form-control"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="comuna" className="form-label">Comuna *</label>
                <input
                  id="comuna"
                  className="form-control"
                  name="comuna"
                  value={formData.comuna}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12">
                <label htmlFor="indicaciones" className="form-label">
                  Indicaciones para la entrega
                </label>
                <textarea
                  id="indicaciones"
                  className="form-control"
                  name="indicaciones"
                  rows="3"
                  value={formData.indicaciones}
                  onChange={handleChange}
                />
              </div>
            </div>

            <h5 className="fw-bold mt-4 mb-3 border-bottom pb-2">
              Método de envío
            </h5>

            <div className="d-flex flex-column gap-2">
              <label className="border rounded p-3">
                <input
                  className="form-check-input me-2"
                  type="radio"
                  name="tipoEnvio"
                  value="estandar"
                  checked={tipoEnvio === 'estandar'}
                  onChange={(e) => setTipoEnvio(e.target.value)}
                />
                Envío estándar — {formatoPrecio(2990)}
              </label>

              <label className="border rounded p-3">
                <input
                  className="form-check-input me-2"
                  type="radio"
                  name="tipoEnvio"
                  value="express"
                  checked={tipoEnvio === 'express'}
                  onChange={(e) => setTipoEnvio(e.target.value)}
                />
                Envío express — {formatoPrecio(5990)}
              </label>

              <label className="border rounded p-3">
                <input
                  className="form-check-input me-2"
                  type="radio"
                  name="tipoEnvio"
                  value="retiro"
                  checked={tipoEnvio === 'retiro'}
                  onChange={(e) => setTipoEnvio(e.target.value)}
                />
                Retiro en tienda — Gratis
              </label>
            </div>

            <h5 className="fw-bold mt-4 mb-3 border-bottom pb-2">
              Resumen del pedido
            </h5>

            {carrito.map((producto) => (
              <div
                key={producto.id}
                className="d-flex justify-content-between gap-3 py-2 border-bottom"
              >
                <span>
                  {producto.nombre || 'Producto'} × {producto.cantidad}
                </span>
                <strong>
                  {formatoPrecio(Number(producto.precio) * producto.cantidad)}
                </strong>
              </div>
            ))}

            <div className="d-flex justify-content-between mt-3">
              <span>Subtotal</span>
              <span>{formatoPrecio(subtotal)}</span>
            </div>

            <div className="d-flex justify-content-between mt-2">
              <span>{opcionesEnvio[tipoEnvio].nombre}</span>
              <span>{formatoPrecio(envio)}</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between mb-4">
              <strong className="fs-5">Total a pagar</strong>
              <strong className="fs-5 text-success">
                {formatoPrecio(total)}
              </strong>
            </div>

            <div className="d-flex flex-wrap gap-3 justify-content-between">
              <Link to="/carrito" className="btn btn-outline-secondary">
                Volver al carrito
              </Link>

              <div className="d-flex flex-wrap gap-2">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={simularPagoError}
                >
                  Simular error de pago
                </button>

                <button type="submit" className="btn btn-success fw-bold">
                  Confirmar compra · {formatoPrecio(total)}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
