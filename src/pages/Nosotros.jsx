export default function Nosotros() {
  return (
    <div className="container my-5">
      <div className="row align-items-center">
        <div className="col-lg-6 mb-4 mb-lg-0">
          <h2 className="fw-bold mb-3 text-uppercase">
            Sobre <span className="text-info">MotorStore</span>
          </h2>
          <p className="text-muted lead">
            Somos una tienda apasionada por las motocicletas, comprometida con ofrecer motos, accesorios y equipamiento de calidad para todos los amantes de las dos ruedas.
          </p>
          <p className="text-muted">
            Nuestro objetivo es conectar a cada motociclista con su pasión, ofreciendo productos garantizados y una experiencia de compra simple y confiable. ¡Porque la carretera se disfruta mejor con el equipo correcto!
          </p>
        </div>
        <div className="col-lg-6 text-center">
          <div className="p-5 bg-dark text-white rounded-4 shadow">
            <h3 className="text-info fw-bold mb-3">🏍️ Nuestra Misión</h3>
            <p className="opacity-75 mb-0">
              Equipar e inspirar a motociclistas con productos de excelencia, fomentando la cultura del motor y la seguridad en cada viaje.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}