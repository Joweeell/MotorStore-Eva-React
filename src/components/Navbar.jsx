import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [oscuro, setOscuro] = useState(
    () => localStorage.getItem('modoOscuro') !== 'false'
  );

  useEffect(() => {
    document.body.classList.toggle('modo-oscuro', oscuro);
    localStorage.setItem('modoOscuro', oscuro);
  }, [oscuro]);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-3 shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold fs-3 text-white" to="/">MotorStore</Link>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Enlaces a la izquierda, junto al logo */}
            <ul className="navbar-nav ms-lg-4 me-auto gap-lg-1 mb-3 mb-lg-0 text-center text-lg-start">
              <li className="nav-item"><Link className="nav-link px-2 text-nowrap" to="/">Inicio</Link></li>
              <li className="nav-item"><Link className="nav-link px-2 text-nowrap" to="/productos">Productos</Link></li>
              <li className="nav-item"><Link className="nav-link px-2 text-nowrap" to="/nosotros">Nosotros</Link></li>
              <li className="nav-item"><Link className="nav-link px-2 text-nowrap" to="/blogs">Blogs</Link></li>
              <li className="nav-item"><Link className="nav-link px-2 text-nowrap" to="/contacto">Contacto</Link></li>
            </ul>

            {/* Botones a la derecha */}
            <div className="d-flex flex-column flex-lg-row align-items-center gap-2">
              <Link to="/carrito" className="btn btn-info text-dark fw-bold px-3 py-1 rounded-pill text-nowrap carrito-btn">
                🛒 Carrito (0)
              </Link>
              <button
                className="btn btn-outline-secondary btn-sm px-3 rounded-pill text-nowrap"
                onClick={() => setOscuro(!oscuro)}
              >
                {oscuro ? 'Modo Claro' : 'Modo Oscuro'}
              </button>
              <Link to="/registro" className="btn btn-outline-light fw-bold px-4 rounded-pill text-nowrap btn-registro">
                Registro
              </Link>
              <Link to="/login" className="btn btn-light text-dark fw-bold px-4 rounded-pill text-nowrap">
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}