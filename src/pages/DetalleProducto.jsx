import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { obtenerProductos } from '../data/productosCRUD';

const CART_KEY = 'motorstore_carrito';

export default function DetalleProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    let activo = true;

    const cargar = async () => {
      try {
        const productos = await obtenerProductos();
        if (!activo) return;
        const encontrado = productos.find((p) => String(p.id) === String(id));
        setProducto(encontrado || null);
      } catch {
        if (activo) setProducto(null);
      } finally {
        if (activo) setCargando(false);
      }
    };

    cargar();
    return () => {
      activo = false;
    };
  }, [id]);

  const agregarAlCarrito = () => {
    if (!producto) return;
    try {
      const carrito = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
      const lista = Array.isArray(carrito) ? carrito : [];
      const existente = lista.find((item) => item.id === producto.id);

      const actualizado = existente
        ? lista.map((item) =>
            item.id === producto.id
              ? { ...item, cantidad: (Number(item.cantidad) || 1) + 1 }
              : item
          )
        : [...lista, { ...producto, cantidad: 1 }];

      localStorage.setItem(CART_KEY, JSON.stringify(actualizado));
      window.dispatchEvent(new Event('carritoActualizado'));
      setMensaje(`${producto.nombre} se agregó al carrito.`);
    } catch {
      setMensaje('No se pudo agregar el producto al carrito.');
    }
  };

  if (cargando) {
    return (
      <main className="container py-5 text-center">
        <p>Cargando detalle del producto...</p>
      </main>
    );
  }

  if (!producto) {
    return (
      <main className="container py-5 text-center">
        <h2>Producto no encontrado</h2>
        <p className="text-muted">
          El producto que buscas no existe o ya no está disponible.
        </p>
        <Link to="/productos" className="btn btn-dark">
          Volver al catálogo
        </Link>
      </main>
    );
  }

  return (
    <main className="container py-5">
      <nav aria-label="breadcrumb" className="mb-4">
        <Link to="/productos" className="text-decoration-none">
          ← Volver al catálogo
        </Link>
      </nav>

      {mensaje && (
        <div className="alert alert-info" role="status">
          {mensaje}
        </div>
      )}

      <div className="row g-4 align-items-center">
        <div className="col-12 col-md-6">
          <img
            src={producto.img || 'https://placehold.co/600x450?text=Producto'}
            alt={producto.nombre}
            className="img-fluid rounded-4 shadow-sm w-100"
            style={{ maxHeight: '420px', objectFit: 'cover' }}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://placehold.co/600x450?text=Producto';
            }}
          />
        </div>

        <div className="col-12 col-md-6">
          <span className="badge bg-secondary mb-2">{producto.categoria}</span>
          <h2 className="fw-bold mb-2">{producto.nombre}</h2>
          <p className="text-muted mb-3">
            {producto.descripcion || 'Producto disponible en MotorStore.'}
          </p>

          <p className="fs-3 fw-bold text-success mb-2">
            ${Number(producto.precio).toLocaleString('es-CL')}
          </p>

          <p className="small text-muted mb-4">
            Stock disponible: <strong>{producto.stock} unidades</strong>
          </p>

          <button
            type="button"
            className="btn btn-dark btn-lg px-4 fw-bold"
            disabled={producto.stock <= 0}
            onClick={agregarAlCarrito}
          >
            {producto.stock > 0 ? 'Añadir al carrito' : 'Sin stock'}
          </button>
        </div>
      </div>
    </main>
  );
}