import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';

const categorias = [
  { nombre: 'Cascos', slug: 'cascos' },
  { nombre: 'Chaquetas', slug: 'chaquetas' },
  { nombre: 'Guantes', slug: 'guantes' },
  { nombre: 'Accesorios', slug: 'accesorios' },
];

export default function Navbar() {
  const [oscuro, setOscuro] = useState(
    () => localStorage.getItem('modoOscuro') === 'true'
  );
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [catAbierto, setCatAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const catRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    document.body.classList.toggle('modo-oscuro', oscuro);
    localStorage.setItem('modoOscuro', oscuro);
  }, [oscuro]);

  // cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const cerrar = (e) => {
      if (catRef.current && !catRef.current.contains(e.target)) setCatAbierto(false);
    };
    document.addEventListener('mousedown', cerrar);
    return () => document.removeEventListener('mousedown', cerrar);
  }, []);

  const buscar = (e) => {
    e.preventDefault();
    if (busqueda.trim()) {
      navigate(`/productos?q=${encodeURIComponent(busqueda)}`);
      setMenuAbierto(false);
    }
  };

  const tema = oscuro ? 'navbar-dark bg-dark' : 'navbar-light bg-white';
  const linkClass = ({ isActive }) =>
    'nav-link px-2 text-nowrap ' + (isActive ? 'fw-bold active' : '');
  const enCategoria = pathname.startsWith('/categoria');

  const cerrarTodo = () => {
    setMenuAbierto(false);
    setCatAbierto(false);
  };

  return (
    <header className={`border-bottom shadow-sm ${oscuro ? 'bg-dark' : 'bg-white'}`}>
      <nav className={`navbar navbar-expand-lg ${tema} flex-column p-0`}>
        {/* ===== FILA SUPERIOR: logo | buscador | botones ===== */}
        <div className="container-fluid w-100 px-4 py-2 d-flex align-items-center justify-content-between gap-3">
          <Link className="navbar-brand fw-bold fs-3 m-0" to="/" onClick={cerrarTodo}>
            MotorStore
          </Link>

          <form className="d-none d-lg-flex gap-2 mx-auto" onSubmit={buscar}>
            <input
              className="form-control"
              type="search"
              placeholder="Buscar"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">Buscar</button>
          </form>

          <div className="d-none d-lg-flex gap-2">
            <Link to="/login" className={`btn ${oscuro ? 'btn-outline-light' : 'btn-outline-primary'}`}>
              Iniciar Sesión
            </Link>
            <Link to="/registro" className="btn btn-primary">Crear Cuenta</Link>
          </div>

          <button
            className="navbar-toggler border-0 d-lg-none"
            type="button"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        {/* ===== FILA INFERIOR: enlaces centrados ===== */}
        <div className={`w-100 pb-2 ${menuAbierto ? 'd-block' : 'd-none'} d-lg-block`}>
          {/* buscador y sesión en móvil */}
          <div className="d-lg-none px-4 pb-2">
            <form className="d-flex gap-2 mb-2" onSubmit={buscar}>
              <input
                className="form-control"
                type="search"
                placeholder="Buscar"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">Buscar</button>
            </form>
            <div className="d-flex gap-2">
              <Link to="/login" onClick={cerrarTodo}
                className={`btn flex-fill ${oscuro ? 'btn-outline-light' : 'btn-outline-primary'}`}>
                Iniciar Sesión
              </Link>
              <Link to="/registro" onClick={cerrarTodo} className="btn btn-primary flex-fill">
                Crear Cuenta
              </Link>
            </div>
          </div>

          <ul className="navbar-nav flex-row flex-wrap justify-content-center align-items-center gap-lg-1 mx-auto">
            <li className="nav-item">
              <NavLink className={linkClass} to="/" end onClick={cerrarTodo}>Home</NavLink>
            </li>

            {/* Categorías (dropdown) */}
            <li className="nav-item position-relative" ref={catRef}>
              <button
                type="button"
                className={`nav-link px-2 text-nowrap border-0 bg-transparent ${enCategoria ? 'fw-bold active' : ''}`}
                onClick={() => setCatAbierto(!catAbierto)}
              >
                Categorías ▾
              </button>
              {catAbierto && (
                <ul
                  className={`dropdown-menu show ${oscuro ? 'dropdown-menu-dark' : ''}`}
                  style={{ position: 'absolute', top: '100%', left: 0, zIndex: 1000 }}
                >
                  {categorias.map((c) => (
                    <li key={c.slug}>
                      <Link
                        className="dropdown-item"
                        to={`/categoria/${c.slug}`}
                        onClick={cerrarTodo}
                      >
                        {c.nombre}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li className="nav-item"><NavLink className={linkClass} to="/ofertas" onClick={cerrarTodo}>Ofertas</NavLink></li>
            <li className="nav-item"><NavLink className={linkClass} to="/productos" onClick={cerrarTodo}>Productos</NavLink></li>
            <li className="nav-item"><NavLink className={linkClass} to="/nosotros" onClick={cerrarTodo}>Nosotros</NavLink></li>
            <li className="nav-item"><NavLink className={linkClass} to="/blogs" onClick={cerrarTodo}>Blogs</NavLink></li>
            <li className="nav-item"><NavLink className={linkClass} to="/contacto" onClick={cerrarTodo}>Contacto</NavLink></li>

            <li className="nav-item ms-lg-2">
              <Link to="/carrito" onClick={cerrarTodo} className="btn btn-success btn-sm fw-bold text-nowrap carrito-btn">
                🛒 Carrito (0)
              </Link>
            </li>
            <li className="nav-item ms-lg-1">
              <button
                className="btn btn-outline-secondary btn-sm rounded-pill text-nowrap"
                onClick={() => setOscuro(!oscuro)}
              >
                {oscuro ? 'Modo Claro' : 'Modo Oscuro'}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}