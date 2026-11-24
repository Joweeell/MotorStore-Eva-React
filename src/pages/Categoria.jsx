import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiRequest } from '../services/api';

const CART_KEY = 'motorstore_carrito';

const formatoPrecio = (precio) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(precio);

const obtenerImagen = (imagen) => {
  if (!imagen) return '/m1.jpg';

  if (imagen.startsWith('http://') || imagen.startsWith('https://')) {
    return imagen;
  }

  return imagen.startsWith('/') ? imagen : `/${imagen}`;
};

export default function Categoria() {
  const { slug } = useParams();

  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let activo = true;

    const cargarDatos = async () => {
      try {
        setCargando(true);
        setError('');

        const [datosCategorias, datosProductos] = await Promise.all([
          apiRequest('/categorias'),
          apiRequest('/productos'),
        ]);

        if (activo) {
          setCategorias(datosCategorias || []);
          setProductos(datosProductos || []);
        }
      } catch (err) {
        if (activo) setError(err.message);
      } finally {
        if (activo) setCargando(false);
      }
    };

    cargarDatos();

    return () => {
      activo = false;
    };
  }, [slug]);

  const activa = slug
    ? categorias.find((cat) => String(cat.idCategoria) === slug)
    : categorias[0];

  const filtrados = activa
    ? productos.filter(
        (p) => p.categoria?.idCategoria === activa.idCategoria
      )
    : [];

  const imagenCategoria = (idCategoria) => {
    const producto = productos.find(
      (p) => p.categoria?.idCategoria === idCategoria
    );

    return obtenerImagen(producto?.imagenUrl);
  };

  const agregarAlCarrito = (producto) => {
    try {
      const datos = JSON.parse(
        localStorage.getItem(CART_KEY) || '[]'
      );

      const carrito = Array.isArray(datos) ? datos : [];

      const existente = carrito.find(
        (item) => Number(item.id) === producto.idProducto
      );

      const cantidadActual = existente
        ? Number(existente.cantidad) || 1
        : 0;

      if (cantidadActual >= producto.stock) {
        alert('No hay más unidades disponibles.');
        return;
      }

      const productoCarrito = {
        id: producto.idProducto,
        idProducto: producto.idProducto,
        nombre: producto.nombreProducto,
        descripcion: producto.descripcion,
        precio: producto.precioOferta ?? producto.precio,
        img: obtenerImagen(producto.imagenUrl),
        imagen: obtenerImagen(producto.imagenUrl),
        stock: producto.stock,
        categoria: producto.categoria?.nombreCategoria,
        cantidad: cantidadActual + 1,
      };

      const actualizado = existente
        ? carrito.map((item) =>
            Number(item.id) === producto.idProducto
              ? { ...item, ...productoCarrito }
              : item
          )
        : [...carrito, productoCarrito];

      localStorage.setItem(
        CART_KEY,
        JSON.stringify(actualizado)
      );

      window.dispatchEvent(
        new Event('carritoActualizado')
      );

      alert(`${producto.nombreProducto} se agregó al carrito.`);
    } catch (err) {
      console.error(err);
      alert('No se pudo agregar el producto.');
    }
  };

  if (cargando) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border" role="status" />
        <p className="mt-3">Cargando categorías...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <main className="py-5">
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="fw-bold text-uppercase">
            Categorías de MotorStore
          </h2>

          <p className="text-muted">
            Filtra nuestros productos según lo que necesites para tu moto.
          </p>
        </div>

        <div className="d-flex justify-content-center gap-4 mb-5 flex-wrap">

          {categorias.map((cat) => (
            <Link
              key={cat.idCategoria}
              to={`/categoria/${cat.idCategoria}`}
              className={`card text-center shadow-sm p-3 text-decoration-none ${
                cat.idCategoria === activa?.idCategoria
                  ? 'border-primary border-2'
                  : 'border-0'
              }`}
              style={{ width: '210px', color: '#212529' }}
            >
              <img
                src={imagenCategoria(cat.idCategoria)}
                alt={cat.nombreCategoria}
                className="rounded mb-2"
                style={{
                  width: '100%',
                  height: '115px',
                  objectFit: 'cover',
                }}
                onError={(e) => {
                  if (!e.currentTarget.src.endsWith('/m1.jpg')) {
                    e.currentTarget.src = '/m1.jpg';
                  }
                }}
              />

              <h5 className="mb-0 fw-bold">
                {cat.nombreCategoria}
              </h5>
            </Link>
          ))}

        </div>

        {!activa ? (
          <div className="alert alert-info">
            No se encontró la categoría solicitada.
          </div>
        ) : (
          <>
            <h3 className="fw-bold mb-3 border-bottom pb-2">
              Resultados para: {activa.nombreCategoria}
            </h3>

            <p className="text-muted mb-4">
              {activa.descripcion}
            </p>

            {filtrados.length === 0 ? (
              <p className="text-muted">
                No hay productos en esta categoría todavía.
              </p>
            ) : (
              <div className="row g-4">

                {filtrados.map((producto) => (
                  <div
                    className="col-6 col-md-3"
                    key={producto.idProducto}
                  >
                    <div className="card h-100 shadow-sm border-0">

                      <Link to={`/producto/${producto.idProducto}`}>
                        <img
                          src={obtenerImagen(producto.imagenUrl)}
                          className="card-img-top"
                          alt={producto.nombreProducto}
                          style={{
                            height: '220px',
                            objectFit: 'cover',
                          }}
                          onError={(e) => {
                            if (!e.currentTarget.src.endsWith('/m1.jpg')) {
                              e.currentTarget.src = '/m1.jpg';
                            }
                          }}
                        />
                      </Link>

                      <div className="card-body text-center d-flex flex-column">

                        <h5 className="card-title fw-bold">
                          {producto.nombreProducto}
                        </h5>

                        {producto.precioOferta != null && (
                          <small className="text-muted text-decoration-line-through">
                            {formatoPrecio(producto.precio)}
                          </small>
                        )}

                        <p className="text-info fw-bold fs-5 mt-auto mb-2">
                          {formatoPrecio(
                            producto.precioOferta ?? producto.precio
                          )}
                        </p>

                        <p className="text-muted small">
                          Stock disponible: {producto.stock}
                        </p>

                        <button
                          type="button"
                          className="btn btn-dark w-100 fw-bold"
                          disabled={producto.stock <= 0}
                          onClick={() => agregarAlCarrito(producto)}
                        >
                          {producto.stock > 0
                            ? '🛒 Añadir'
                            : 'Sin stock'}
                        </button>

                      </div>
                    </div>
                  </div>
                ))}

              </div>
            )}
          </>
        )}

      </div>
    </main>
  );
}