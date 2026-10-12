import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerProductos } from "../data/productosCRUD";

export default function DetalleProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const productos = obtenerProductos();
    const encontrado = productos.find((p) => String(p.id) === id);
    setProducto(encontrado || null);
  }, [id]);

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

      <div className="row g-4 align-items-center">
        <div className="col-12 col-md-6">
          <img
            src={`/${producto.img}`}
            alt={producto.nombre}
            className="img-fluid rounded shadow"
            style={{
              width: "100%",
              maxHeight: "450px",
              objectFit: "contain",
              backgroundColor: "#f8f9fa",
            }}
          />
        </div>

        <div className="col-12 col-md-6">
          <span className="badge bg-secondary mb-3">
            {producto.categoria}
          </span>

          <h1 className="fw-bold">{producto.nombre}</h1>

          <p className="fs-3 fw-bold text-success">
            ${Number(producto.precio).toLocaleString("es-CL")}
          </p>

          <p className="text-muted">{producto.descripcion}</p>

          <button
            type="button"
            className="btn btn-success btn-lg"
            disabled
            title="La funcionalidad del carrito se implementará en el siguiente paso"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </main>
  );
}