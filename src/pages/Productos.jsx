import { Link } from 'react-router-dom';

// Inventario oficial extraído de tu proyecto original de MotorStore
const productosMotorStore = [
  { id: 1, nombre: "Suzuki GSXR 1000", categoria: "Deportiva", precio: 15000000, img: "img/GSXR1000.jpg", descripcion: "Motocicleta deportiva de alto rendimiento." },
  { id: 2, nombre: "Kawasaki Ninja", categoria: "Deportiva", precio: 14500000, img: "img/kawa.webp", descripcion: "Ícono deportivo con motor potente y ágil." },
  { id: 3, nombre: "Yamaha R9", categoria: "Deportiva", precio: 16000000, img: "img/r9.jpeg", descripcion: "Superdeportiva de última generación con chasis liviano." },
  { id: 4, nombre: "Porta Patente", categoria: "Accesorio", precio: 40000, img: "img/pl.jpg", descripcion: "Accesorio resistente y de alta durabilidad." },
  { id: 5, nombre: "Escape Yoshimura", categoria: "Indumentaria", precio: 160000, img: "img/escape.webp", descripcion: "Escape de fibra de carbono real, excelente sonido." },
  { id: 6, nombre: "Guantes Alpinestar", categoria: "Seguridad", precio: 139900, img: "img/guantes.jpg", descripcion: "Guantes racing de piel de cabra de primera calidad." },
  { id: 7, nombre: "Chaqueta MotorStore", categoria: "Indumentaria", precio: 120000, img: "img/chaqueta.jpg", descripcion: "Chaqueta de moto con protecciones reforzadas." },
  { id: 8, nombre: "Casco Integral", categoria: "Seguridad", precio: 430990, img: "img/casco.jpg", descripcion: "Casco integral certificado con excelente ventilación." }
];

export default function Productos() {
  return (
    <main className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-uppercase">Catálogo de Productos</h2>
          <p className="text-muted">Explora nuestra selección exclusiva para motociclistas.</p>
        </div>

        <div className="row">
          {productosMotorStore.map((prod) => (
            <div className="col-12 col-sm-6 col-md-3 mb-4" key={prod.id}>
              <div className="card h-100 bg-dark text-white border-secondary shadow">
                {/* Enlace al detalle del producto */}
                <Link to={`/producto/${prod.id}`}>
                  <img src={prod.img} className="card-img-top bg-secondary img-producto" alt={prod.nombre} style={{ height: '240px', objectFit: 'cover' }} />
                </Link>
                <div className="card-body d-flex flex-column justify-content-between text-center">
                  <Link to={`/producto/${prod.id}`} className="text-decoration-none">
                    <h5 className="card-title text-info fs-6 mb-2">{prod.nombre}</h5>
                  </Link>
                  <div className="d-flex justify-content-between align-items-center mt-auto mb-3">
                    <small className="text-muted">{prod.categoria}</small>
                    <span className="fw-bold text-light">${prod.precio.toLocaleString('es-CL')}</span>
                  </div>
                  <button className="btn btn-outline-light w-100 btn-agregar">Añadir al carrito</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}