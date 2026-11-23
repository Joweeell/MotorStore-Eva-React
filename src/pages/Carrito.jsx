
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CART_KEY = 'motorstore_carrito';

const formatoPrecio = (precio) =>
  `$${Number(precio).toLocaleString('es-CL')}`;

const leerCarrito = () => {
  try {
    const datos = localStorage.getItem(CART_KEY);
    const carrito = datos ? JSON.parse(datos) : [];

    if (!Array.isArray(carrito)) {
      return [];
    }

    return carrito.filter(
      (producto) =>
        producto &&
        producto.id !== undefined &&
        Number.isFinite(Number(producto.precio)) &&
        Number(producto.precio) >= 0
    ).map((producto) => ({
      ...producto,
      cantidad: Math.max(1, Math.floor(Number(producto.cantidad) || 1)),
    }));
  } catch (error) {
    console.error('No se pudo leer el carrito:', error);
    return [];
  }
};

export default function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCarrito(leerCarrito());
  }, []);

const guardarCarrito = (nuevoCarrito) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(nuevoCarrito));

    setCarrito(nuevoCarrito);

    // Avisar al Navbar para actualizar el contador inmediatamente.
    window.dispatchEvent(new Event('carritoActualizado'));
  } catch (error) {
    console.error('No se pudo guardar el carrito:', error);
  }
};

  const cambiarCantidad = (id, cantidad) => {
    const nuevaCantidad = Math.floor(Number(cantidad));

    if (!Number.isFinite(nuevaCantidad) || nuevaCantidad < 1) {
      return;
    }

    const actualizado = carrito.map((producto) =>
      producto.id === id
        ? { ...producto, cantidad: nuevaCantidad }
        : producto
    );

    guardarCarrito(actualizado);
  };

  const eliminarProducto = (id) => {
    const actualizado = carrito.filter((producto) => producto.id !== id);
    guardarCarrito(actualizado);
  };

  const vaciarCarrito = () => {
    guardarCarrito([]);
  };

  const totalUnidades = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  const totalCompra = carrito.reduce(
    (total, producto) =>
      total + Number(producto.precio) * producto.cantidad,
    0
  );

  const irAlCheckout = () => {
    if (carrito.length === 0) {
      return;
    }

    navigate('/checkout');
  };

  return (
    <main className="py-5">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
          <div>
            <h2 className="fw-bold mb-1">Mi carrito de compras</h2>
            <p className="text-muted mb-0">
              {totalUnidades} artículo(s) en tu carrito
            </p>
          </div>

          {carrito.length > 0 && (
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={vaciarCarrito}
            >
              Vaciar carrito
            </button>
          )}
        </div>

        <div className="row g-4">
          <div className="col-12 col-lg-8">
            {carrito.length === 0 ? (
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center py-5">
                  <h4>Tu carrito está vacío</h4>
                  <p className="text-muted">
                    Explora el catálogo y agrega los productos que te interesen.
                  </p>
                  <Link to="/productos" className="btn btn-dark">
                    Ir al catálogo
                  </Link>
                </div>
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {carrito.map((producto) => (
                  <div className="card shadow-sm" key={producto.id}>
                    <div className="card-body">
                      <div className="row align-items-center g-3">
                        <div className="col-4 col-md-3">
                          <img
                            src={
                              producto.img ||
                              'https://placehold.co/400x300?text=Producto'
                            }
                            alt={producto.nombre}
                            className="img-fluid rounded"
                            style={{
                              width: '100%',
                              height: '120px',
                              objectFit: 'cover',
                            }}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src =
                                'https://placehold.co/400x300?text=Producto';
                            }}
                          />
                        </div>

                        <div className="col-8 col-md-9">
                          <div className="d-flex flex-wrap justify-content-between gap-2">
                            <div>
                              <h5 className="fw-bold mb-1">
                                {producto.nombre}
                              </h5>
                              <p className="text-muted mb-2">
                                {producto.categoria}
                              </p>
                              <p className="mb-2">
                                Precio unitario:{' '}
                                <strong>{formatoPrecio(producto.precio)}</strong>
                              </p>
                            </div>

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger align-self-start"
                              onClick={() => eliminarProducto(producto.id)}
                              aria-label={`Eliminar ${producto.nombre}`}
                            >
                              Eliminar
                            </button>
                          </div>

                          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mt-2">
                            <div>
                              <label
                                htmlFor={`cantidad-${producto.id}`}
                                className="form-label me-2 mb-0"
                              >
                                Cantidad:
                              </label>
                              <input
                                id={`cantidad-${producto.id}`}
                                type="number"
                                className="form-control d-inline-block"
                                style={{ width: '90px' }}
                                min="1"
                                step="1"
                                value={producto.cantidad}
                                onChange={(e) =>
                                  cambiarCantidad(
                                    producto.id,
                                    e.target.value
                                  )
                                }
                              />
                            </div>

                            <div className="fw-bold text-success">
                              Subtotal:{' '}
                              {formatoPrecio(
                                Number(producto.precio) * producto.cantidad
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-12 col-lg-4">
            <div className="card border-dark shadow-sm">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">Resumen de compra</h4>

                <div className="d-flex justify-content-between mb-3">
                  <span>Productos</span>
                  <span>{totalUnidades}</span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span>Subtotal</span>
                  <span>{formatoPrecio(totalCompra)}</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-4">
                  <strong>Total</strong>
                  <strong className="text-success fs-5">
                    {formatoPrecio(totalCompra)}
                  </strong>
                </div>

                <button
                  type="button"
                  className="btn btn-success w-100 fw-bold py-2"
                  onClick={irAlCheckout}
                  disabled={carrito.length === 0}
                >
                  CONTINUAR AL PAGO
                </button>

                <Link
                  to="/productos"
                  className="btn btn-outline-dark w-100 mt-2"
                >
                  Seguir comprando
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
