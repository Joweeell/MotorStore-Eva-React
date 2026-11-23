
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main>
      {/* Carrusel principal */}
      <div
        id="carouselMotor"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="/m1.jpg"
              className="d-block w-100"
              alt="Carrera de motos"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/GSXR1000.jpg';
              }}
            />
          </div>

          <div className="carousel-item">
            <img
              src="/m2.webp"
              className="d-block w-100"
              alt="Motocicleta deportiva"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/GSXR1000.jpg';
              }}
            />
          </div>

          <div className="carousel-item">
            <img
              src="/m3.jpg"
              className="d-block w-100"
              alt="Equipamiento de seguridad"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/casco.jpg';
              }}
            />
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselMotor"
          data-bs-slide="prev"
          aria-label="Imagen anterior"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          />
          <span className="visually-hidden">Anterior</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselMotor"
          data-bs-slide="next"
          aria-label="Imagen siguiente"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          />
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      {/* Banner principal de la tienda */}
      <section className="banner-hero text-white py-5">
        <div className="container py-4">
          <div className="row align-items-center g-4">
            <div className="col-lg-6 text-center text-lg-start">
              <h1 className="hero-titulo display-5 fw-bold text-uppercase mb-3">
                Tienda Online
              </h1>

              <p className="hero-descripcion text-white-50 mb-4 mx-auto mx-lg-0">
                Nuestra tienda especializada ofrece la mejor selección de
                vehículos y motocicletas del mercado chileno. Explora modelos
                exclusivos con stock garantizado y agenda tu prueba de manejo.
              </p>

              <div className="d-flex justify-content-center justify-content-lg-start gap-3">
                <Link
                  to="/productos"
                  className="btn btn-info text-dark fw-bold px-4 py-2 text-uppercase"
                >
                  Ver Catálogo
                </Link>

                <Link
                  to="/contacto"
                  className="btn btn-outline-light px-4 py-2 text-uppercase btn-hero-productos"
                >
                  Contáctanos
                </Link>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="contenedor-imagen-hero">
                <img
                  src="/GSXR1000.jpg"
                  className="imagen-hero w-100 h-100"
                  alt="Motocicleta deportiva Suzuki GSX-R1000"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/m1.jpg';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección informativa */}
      <section className="py-5 bg-white text-dark">
        <div className="container text-center">
          <h2 className="fw-bold mb-4 text-uppercase">
            ¿Por qué elegir MotorStore?
          </h2>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-4 border rounded shadow-sm h-100">
                <h4>🛡️ Seguridad Certificada</h4>
                <p className="text-muted mb-0">
                  Cascos, chaquetas y guantes de marcas líderes mundiales con
                  máxima protección.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 border rounded shadow-sm h-100">
                <h4>⚡ Alto Rendimiento</h4>
                <p className="text-muted mb-0">
                  Motocicletas y repuestos diseñados para entregar potencia y
                  precisión en cada curva.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 border rounded shadow-sm h-100">
                <h4 className="d-flex align-items-center justify-content-center gap-2">
                  <span
                    role="img"
                    aria-label="Bandera de Chile"
                    style={{
                      display: 'inline-block',
                      width: '28px',
                      height: '18px',
                      background:
                        'linear-gradient(to bottom, white 50%, #d52b1e 50%)',
                      border: '1px solid #ddd',
                      position: 'relative',
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '12px',
                        height: '9px',
                        background: '#0039a6',
                        color: 'white',
                        fontSize: '9px',
                        lineHeight: '9px',
                        textAlign: 'center',
                      }}
                    >
                      ★
                    </span>
                  </span>
                  Envíos a todo Chile
                </h4>

                <p className="text-muted mb-0">
                  Despachos rápidos y seguros para que no pares de rodar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
