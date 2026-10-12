
import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { obtenerProductos } from '../data/productosCRUD';

const CART_KEY = 'motorstore_carrito';

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  // Leer el término enviado desde el buscador del Navbar
  const terminoBusqueda = searchParams.get('q') || '';

  useEffect(() => {
    setProductos(obtenerProductos());
  }, []);

  // Filtrar por nombre, descripción o categoría
  const productosFiltrados = useMemo(() => {
    const termino = terminoBusqueda.trim().toLocaleLowerCase('es');

    if (!termino) return productos;

    return productos.filter((producto) => {
      const nombre = String(producto.nombre || '').toLocaleLowerCase('es');
      const descripcion = String(
        producto.descripcion || ''
      ).toLocaleLowerCase('es');
      const categoria = String(
        producto.categoria || ''
      ).toLocaleLowerCase('es');

      return (
        nombre.includes(termino) ||
        descripcion.includes(termino) ||
        categoria.includes(termino)
      );
    });
  }, [productos, terminoBusqueda]);

  const limpiarBusqueda = () => {
    setSearchParams({});
  };

  const agregarAlCarrito = (producto) => {
    try {
      const datosGuardados = localStorage.getItem(CART_KEY);
      const carrito = datosGuardados
        ? JSON.parse(datosGuardados)
        : [];

      if (!Array.isArray(carrito)) {
        throw new Error('El carrito guardado no es válido.');
      }

      const existente = carrito.find(
        (item) => item.id === producto.id
      );

      let carritoActualizado;

      if (existente) {
        carritoActualizado = carrito.map((item) =>
          item.id === producto.id
            ? {
                ...item,
                cantidad: (Number(item.cantidad) || 1) + 1,
              }
            : item
        );
      } else {
        carritoActualizado = [
          ...carrito,
          { ...producto, cantidad: 1 },
        ];
      }

      localStorage.setItem(
        CART_KEY,
        JSON.stringify(carritoActualizado)
      );

      window.dispatchEvent(new Event('carritoActualizado'));
      setMensaje(`${producto.nombre} se agregó al carrito.`);
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      setMensaje('No se pudo agregar el producto al carrito.');
    }
  };

  return (
    <main className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-uppercase">
            Catálogo de Productos
          </h2>

          <p className="text-muted">
            Explora nuestra selección exclusiva para motociclistas.
          </p>
        </div>

        {terminoBusqueda.trim() && (
          <div className="alert alert-secondary d-flex justify-content-between align-items-center flex-wrap gap-2">
            <span>
              Resultados para: <strong>{terminoBusqueda}</strong>
              {' — '}
              {productosFiltrados.length}{' '}
              {productosFiltrados.length === 1
                ? 'producto encontrado'
                : 'productos encontrados'}
            </span>

            <button
              type="button"
              className="btn btn-outline-dark btn-sm"
              onClick={limpiarBusqueda}
            >
              Limpiar búsqueda
            </button>
          </div>
        )}

        {mensaje && (
          <div className="alert alert-info" role="status">
            {mensaje}
          </div>
        )}

        <div className="row">
          {productosFiltrados.map((prod) => (
            <div
              className="col-12 col-sm-6 col-md-3 mb-4"
              key={prod.id}
            >
              <div className="card h-100 bg-dark text-white border-secondary shadow">
                <Link to={`/producto/${prod.id}`}>
                  <img
                    src={
                      prod.img ||
                      'https://placehold.co/400x300?text=Producto'
                    }
                    className="card-img-top bg-secondary img-producto"
                    alt={prod.nombre}
                    style={{
                      height: '240px',
                      objectFit: 'cover',
                    }}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        'https://placehold.co/400x300?text=Producto';
                    }}
                  />
                </Link>

                <div className="card-body d-flex flex-column text-center">
                  <h5 className="card-title text-info fs-6 mb-2">
                    {prod.nombre}
                  </h5>

                  <p className="small text-light flex-grow-1">
                    {prod.descripcion ||
                      'Producto disponible en MotorStore.'}
                  </p>

                  <div className="d-flex justify-content-between align-items-center mt-auto mb-3">
                    <small className="text-muted">
                      {prod.categoria}
                    </small>

                    <span className="fw-bold text-light">
                      ${Number(prod.precio).toLocaleString('es-CL')}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="btn btn-outline-light w-100"
                    onClick={() => agregarAlCarrito(prod)}
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}

          {productosFiltrados.length === 0 && (
            <div className="col-12 text-center py-5">
              <h4>
                {terminoBusqueda.trim()
                  ? 'No encontramos productos'
                  : 'No hay productos disponibles'}
              </h4>

              <p className="text-muted">
                {terminoBusqueda.trim()
                  ? 'Prueba con otro nombre o categoría.'
                  : 'Actualmente no hay productos en el catálogo.'}
              </p>

              {terminoBusqueda.trim() && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={limpiarBusqueda}
                >
                  Ver todos los productos
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
