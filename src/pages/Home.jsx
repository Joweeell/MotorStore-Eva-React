import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main>
      {/* Carrusel a todo el ancho (sin container) */}
      <div id="carouselMotor" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/m1.jpg" className="d-block w-100" alt="Carrera de motos" />
          </div>
          <div className="carousel-item">
            <img src="/m2.webp" className="d-block w-100" alt="Motocicleta deportiva" />
          </div>
          <div className="carousel-item">
            <img src="/m3.jpg" className="d-block w-100" alt="Equipamiento de seguridad" />
          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselMotor" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselMotor" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      {/* Tienda Online: fondo a todo el ancho, contenido dentro del container */}
      <section className="banner-hero text-white py-5">
        <div className="container py-4">
          <div className="row align-items-center g-4">
            <div className="col-lg-6 text-center text-lg-start">
              <h1 className="hero-titulo display-5 fw-bold text-uppercase mb-3">Tienda Online</h1>
              <p className="hero-descripcion text-white-50 mb-4 mx-auto mx-lg-0">
                Nuestra tienda especializada ofrece la mejor selección de vehículos y motocicletas del mercado chileno. Explora modelos exclusivos con stock garantizado y agenda tu prueba de manejo.
              </p>
              <div className="d-flex justify-content-center justify-content-lg-start gap-3">
                <Link to="/productos" className="btn btn-info text-dark fw-bold px-4 py-2 text-uppercase">
                  Ver Catálogo
                </Link>
                <Link to="/contacto" className="btn btn-outline-light px-4 py-2 text-uppercase btn-hero-productos">
                  Contáctanos
                </Link>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="contenedor-imagen-hero">
                <img src="/img/tienda.jpg" className="imagen-hero w-100 h-100" alt="Moto deportiva" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Informativa / Destacados */}
      <section className="py-5 bg-white text-dark">
        <div className="container text-center">
          <h2 className="fw-bold mb-4 text-uppercase">¿Por qué elegir MotorStore?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-4 border rounded shadow-sm h-100">
                <h4>🛡️ Seguridad Certificada</h4>
                <p className="text-muted mb-0">Cascos, chaquetas y guantes de marcas líderes mundiales con máxima protección.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded shadow-sm h-100">
                <h4>⚡ Alto Rendimiento</h4>
                <p className="text-muted mb-0">Motocicletas y repuestos diseñados para entregar potencia y precisión en cada curva.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded shadow-sm h-100">
                <h4>🇨🇱 Envíos a todo Chile</h4>
                <p className="text-muted mb-0">Despachos rápidos y seguros para que no pares de rodar.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}