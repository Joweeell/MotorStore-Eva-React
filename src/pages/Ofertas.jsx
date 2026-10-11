
const ofertas = [
  {
    id: 1,
    nombre: 'Casco Integral',
    imagen: '/casco.jpg',
    precioOriginal: 200000,
    precioOferta: 160000,
  },
  {
    id: 2,
    nombre: 'Chaqueta MotorStore',
    imagen: '/chaqueta.jpg',
    precioOriginal: 150000,
    precioOferta: 120000,
  },
  {
    id: 3,
    nombre: 'Guantes de Protección',
    imagen: '/guantes.jpg',
    precioOriginal: 50000,
    precioOferta: 40000,
  },
  {
    id: 4,
    nombre: 'Escape Deportivo',
    imagen: '/escape.webp',
    precioOriginal: 200000,
    precioOferta: 160000,
  },
];

const formatoPrecio = (precio) =>
  `$${Number(precio).toLocaleString('es-CL')}`;

export default function Ofertas() {
  const agregarAlCarrito = (oferta) => {
    const clave = 'motorstore_carrito';

    try {
      const guardado = JSON.parse(localStorage.getItem(clave) || '[]');
      const carrito = Array.isArray(guardado) ? guardado : [];
      const idCarrito = `oferta-${oferta.id}`;
      const existente = carrito.find((item) => item.id === idCarrito);

      const producto = {
        id: idCarrito,
        nombre: oferta.nombre,
        categoria: 'Oferta',
        precio: oferta.precioOferta,
        img: oferta.imagen,
      };

      const actualizado = existente
        ? carrito.map((item) =>
            item.id === idCarrito
              ? { ...item, cantidad: (Number(item.cantidad) || 1) + 1 }
              : item
          )
        : [...carrito, { ...producto, cantidad: 1 }];

      localStorage.setItem(clave, JSON.stringify(actualizado));
      window.dispatchEvent(new Event('carritoActualizado'));
      alert(`${oferta.nombre} se agregó al carrito.`);
    } catch (error) {
      console.error('No se pudo actualizar el carrito:', error);
      alert('No se pudo agregar la oferta. Inténtalo nuevamente.');
    }
  };

  return (
    <main className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-uppercase text-danger">
            🔥 Ofertas Especiales
          </h2>
          <p className="text-muted">
            Aprovecha estos descuentos exclusivos en MotorStore por tiempo limitado.
          </p>
        </div>

        <div className="row g-4">
          {ofertas.map((oferta) => (
            <div className="col-12 col-sm-6 col-lg-3" key={oferta.id}>
              <div className="card h-100 shadow-sm border-danger position-relative">
                <div className="position-absolute top-0 end-0 bg-danger text-white px-2 py-1 m-2 rounded fw-bold">
                  -20%
                </div>

                <img
                  src={oferta.imagen}
                  className="card-img-top"
                  alt={oferta.nombre}
                  style={{ height: '240px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/m1.jpg';
                  }}
                />

                <div className="card-body text-center d-flex flex-column">
                  <h5 className="card-title fw-bold">{oferta.nombre}</h5>

                  <div className="mt-auto mb-3">
                    <span className="text-muted text-decoration-line-through me-2">
                      {formatoPrecio(oferta.precioOriginal)}
                    </span>
                    <span className="text-danger fw-bold fs-5">
                      {formatoPrecio(oferta.precioOferta)}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="btn btn-outline-danger w-100 fw-bold"
                    onClick={() => agregarAlCarrito(oferta)}
                  >
                    🛒 Añadir Oferta
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
