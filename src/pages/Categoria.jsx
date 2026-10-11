
import { Link, useParams } from 'react-router-dom';

const categorias = [
  { slug: 'cascos', nombre: 'Cascos', imagen: '/casco.jpg' },
  { slug: 'chaquetas', nombre: 'Chaquetas', imagen: '/chaqueta.jpg' },
  { slug: 'guantes', nombre: 'Guantes', imagen: '/guantes.jpg' },
  { slug: 'accesorios', nombre: 'Accesorios', imagen: '/escape.webp' },
];

const productos = [
  { id: 1, categoria: 'cascos', nombre: 'Casco Integral Modelo 1', precio: 120000, img: '/casco.jpg' },
  { id: 2, categoria: 'cascos', nombre: 'Casco Integral Modelo 2', precio: 135000, img: '/casco.jpg' },
  { id: 3, categoria: 'cascos', nombre: 'Casco Modular Modelo 3', precio: 150000, img: '/casco.jpg' },
  { id: 4, categoria: 'cascos', nombre: 'Casco Abierto Modelo 4', precio: 90000, img: '/casco.jpg' },
  { id: 5, categoria: 'chaquetas', nombre: 'Chaqueta Cuero Racing', precio: 180000, img: '/chaqueta.jpg' },
  { id: 6, categoria: 'chaquetas', nombre: 'Chaqueta Textil Touring', precio: 130000, img: '/chaqueta.jpg' },
  { id: 7, categoria: 'guantes', nombre: 'Guantes Carbono Pro', precio: 45000, img: '/guantes.jpg' },
  { id: 8, categoria: 'guantes', nombre: 'Guantes Invierno', precio: 35000, img: '/guantes.jpg' },
  { id: 9, categoria: 'accesorios', nombre: 'Candado Disco', precio: 25000, img: '/mochila.webp' },
  { id: 10, categoria: 'accesorios', nombre: 'Soporte para Celular', precio: 15000, img: '/inter.webp' },
];

const formatoPrecio = (precio) =>
  `$${Number(precio).toLocaleString('es-CL')}`;

export default function Categoria() {
  const { slug } = useParams();
  const activa = categorias.find((cat) => cat.slug === slug) || categorias[0];
  const filtrados = productos.filter((p) => p.categoria === activa.slug);

  const agregarAlCarrito = (producto) => {
    const clave = 'motorstore_carrito';

    try {
      const carritoGuardado = JSON.parse(localStorage.getItem(clave) || '[]');
      const carrito = Array.isArray(carritoGuardado) ? carritoGuardado : [];
      const existente = carrito.find((item) => item.id === producto.id);

      const actualizado = existente
        ? carrito.map((item) =>
            item.id === producto.id
              ? { ...item, cantidad: (Number(item.cantidad) || 1) + 1 }
              : item
          )
        : [...carrito, { ...producto, cantidad: 1 }];

      localStorage.setItem(clave, JSON.stringify(actualizado));
      window.dispatchEvent(new Event('carritoActualizado'));
      alert(`${producto.nombre} se agregó al carrito.`);
    } catch (error) {
      console.error('No se pudo actualizar el carrito:', error);
      alert('No se pudo agregar el producto. Inténtalo nuevamente.');
    }
  };

  return (
    <main className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-uppercase">Categorías de MotorStore</h2>
          <p className="text-muted">
            Filtra nuestros productos según lo que necesites para tu moto.
          </p>
        </div>

        <div className="d-flex justify-content-center gap-4 mb-5 flex-wrap">
          {categorias.map((cat) => (
            <Link
              key={cat.slug}
              to={`/categoria/${cat.slug}`}
              className={`card text-center shadow-sm p-3 text-decoration-none ${
                cat.slug === activa.slug ? 'border-primary border-2' : 'border-0'
              }`}
              style={{ width: '210px', color: '#212529' }}
            >
              <img
                src={cat.imagen}
                alt={cat.nombre}
                className="rounded mb-2"
                style={{ width: '100%', height: '115px', objectFit: 'cover' }}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/m1.jpg';
                }}
              />
              <h5 className="mb-0 fw-bold">{cat.nombre}</h5>
            </Link>
          ))}
        </div>

        <h3 className="fw-bold mb-4 border-bottom pb-2">
          Resultados para: {activa.nombre}
        </h3>

        {filtrados.length === 0 ? (
          <p className="text-muted">
            No hay productos en esta categoría todavía.
          </p>
        ) : (
          <div className="row g-4">
            {filtrados.map((producto) => (
              <div className="col-6 col-md-3" key={producto.id}>
                <div className="card h-100 shadow-sm border-0">
                  <img
                    src={producto.img}
                    className="card-img-top"
                    alt={producto.nombre}
                    style={{ height: '220px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/m1.jpg';
                    }}
                  />

                  <div className="card-body text-center d-flex flex-column">
                    <h5 className="card-title fw-bold">{producto.nombre}</h5>
                    <p className="text-info fw-bold fs-5 mt-auto mb-3">
                      {formatoPrecio(producto.precio)}
                    </p>
                    <button
                      type="button"
                      className="btn btn-dark w-100 fw-bold"
                      onClick={() => agregarAlCarrito(producto)}
                    >
                      🛒 Añadir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
