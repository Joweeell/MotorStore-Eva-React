
import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';

const categorias = [
  { nombre: 'Cascos', slug: 'cascos' },
  { nombre: 'Chaquetas', slug: 'chaquetas' },
  { nombre: 'Guantes', slug: 'guantes' },
  { nombre: 'Accesorios', slug: 'accesorios' },
];

const CART_KEY = 'motorstore_carrito';
const SESSION_KEY = 'motorstore_sesion';

function obtenerCantidadCarrito() {
  try {
    const carrito = JSON.parse(localStorage.getItem(CART_KEY) || '[]');

    if (!Array.isArray(carrito)) return 0;

    return carrito.reduce(
      (total, producto) => total + (Number(producto.cantidad) || 1),
      0
    );
  } catch {
    return 0;
  }
}

function obtenerSesion() {
  try {
    const sesion = JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null');

    if (sesion && typeof sesion.nombre === 'string' && sesion.correo) {
      return sesion;
    }

    return null;
  } catch {
    return null;
  }
}

export default function Navbar() {
  const [oscuro, setOscuro] = useState(
    () => localStorage.getItem('modoOscuro') === 'true'
  );
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [catAbierto, setCatAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [cantidadCarrito, setCantidadCarrito] = useState(
    obtenerCantidadCarrito
  );
  const [usuario, setUsuario] = useState(obtenerSesion);

  const catRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    document.body.classList.toggle('modo-oscuro', oscuro);
    localStorage.setItem('modoOscuro', String(oscuro));
  }, [oscuro]);

  useEffect(() => {
    const actualizarCarrito = () => {
      setCantidadCarrito(obtenerCantidadCarrito());
    };

    actualizarCarrito();

    window.addEventListener('storage', actualizarCarrito);
    window.addEventListener('carritoActualizado', actualizarCarrito);

    return () => {
      window.removeEventListener('storage', actualizarCarrito);
      window.removeEventListener('carritoActualizado', actualizarCarrito);
    };
  }, [pathname]);

  useEffect(() => {
    setUsuario(obtenerSesion());
  }, [pathname]);

  useEffect(() => {
    const cerrar = (e) => {
      if (catRef.current && !catRef.current.contains(e.target)) {
        setCatAbierto(false);
      }
    };

    document.addEventListener('mousedown', cerrar);

    return () => {
      document.removeEventListener('mousedown', cerrar);
    };
  }, []);

  const cerrarTodo = () => {
    setMenuAbierto(false);
    setCatAbierto(false);
  };

  const navegarA = (ruta) => {
    cerrarTodo();
    navigate(ruta);
  };

  const cerrarSesion = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setUsuario(null);
    cerrarTodo();
    navigate('/');
  };

  const buscar = (e) => {
    e.preventDefault();

    const termino = busqueda.trim();

    if (termino) {
      cerrarTodo();
      navigate(`/productos?q=${encodeURIComponent(termino)}`);
    }
  };

  const tema = oscuro ? 'navbar-dark bg-dark' : 'navbar-light bg-white';

  const linkClass = ({ isActive }) =>
    'nav-link px-2 text-nowrap ' + (isActive ? 'fw-bold active' : '');

  const enCategoria = pathname.startsWith('/categoria');

  const botonesCuenta = (
    <>
      {usuario ? (
        <>
          <span
            className={`navbar-text text-nowrap ${
              oscuro ? 'text-light' : 'text-dark'
            }`}
          >
            Hola, {usuario.nombre}
          </span>

          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={cerrarSesion}
          >
            Cerrar sesión
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            className={`btn ${
              oscuro ? 'btn-outline-light' : 'btn-outline-primary'
            }`}
            onClick={() => navegarA('/login')}
          >
            Iniciar sesión
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navegarA('/registro')}
          >
            Crear cuenta
          </button>
        </>
      )}
    </>
  );

  return (
    <header
      className={`border-bottom shadow-sm ${
        oscuro ? 'bg-dark' : 'bg-white'
      }`}
    >
      <nav className={`navbar navbar-expand-lg ${tema} flex-column p-0`}>
        <div className="container-fluid w-100 px-4 py-2 d-flex align-items-center justify-content-between gap-3">
          <Link
            className="navbar-brand fw-bold fs-3 m-0"
            to="/"
            onClick={cerrarTodo}
          >
            MotorStore
          </Link>

          <form
            className="d-none d-lg-flex gap-2 mx-auto"
            onSubmit={buscar}
          >
            <input
              className="form-control"
              type="search"
              placeholder="Buscar"
              aria-label="Buscar productos"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />

            <button className="btn btn-outline-success" type="submit">
              Buscar
            </button>
          </form>

          <div className="d-none d-lg-flex gap-2 align-items-center">
            {botonesCuenta}
          </div>

          <button
            className="navbar-toggler border-0 d-lg-none"
            type="button"
            aria-label="Abrir menú"
            aria-expanded={menuAbierto}
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div
          className={`w-100 pb-2 ${
            menuAbierto ? 'd-block' : 'd-none'
          } d-lg-block`}
        >
          <div className="d-lg-none px-4 pb-2">
            <form className="d-flex gap-2 mb-2" onSubmit={buscar}>
              <input
                className="form-control"
                type="search"
                placeholder="Buscar"
                aria-label="Buscar productos"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />

              <button className="btn btn-outline-success" type="submit">
                Buscar
              </button>
            </form>

            <div className="d-flex gap-2 align-items-center flex-wrap">
              {botonesCuenta}
            </div>
          </div>

          <ul className="navbar-nav flex-row flex-wrap justify-content-center align-items-center gap-lg-1 mx-auto">
            <li className="nav-item">
              <NavLink
                className={linkClass}
                to="/"
                end
                onClick={cerrarTodo}
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item position-relative" ref={catRef}>
              <button
                type="button"
                className={`nav-link px-2 text-nowrap border-0 bg-transparent ${
                  enCategoria ? 'fw-bold active' : ''
                }`}
                onClick={() => setCatAbierto(!catAbierto)}
              >
                Categorías ▾
              </button>

              {catAbierto && (
                <ul
                  className={`dropdown-menu show ${
                    oscuro ? 'dropdown-menu-dark' : ''
                  }`}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    zIndex: 1000,
                  }}
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

            <li className="nav-item">
              <NavLink
                className={linkClass}
                to="/ofertas"
                onClick={cerrarTodo}
              >
                Ofertas
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={linkClass}
                to="/productos"
                onClick={cerrarTodo}
              >
                Productos
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={linkClass}
                to="/nosotros"
                onClick={cerrarTodo}
              >
                Nosotros
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={linkClass}
                to="/blogs"
                onClick={cerrarTodo}
              >
                Blogs
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={linkClass}
                to="/contacto"
                onClick={cerrarTodo}
              >
                Contacto
              </NavLink>
            </li>

            <li className="nav-item ms-lg-2">
              <Link
                to="/carrito"
                onClick={cerrarTodo}
                className="btn btn-success btn-sm fw-bold text-nowrap carrito-btn"
              >
                🛒 Carrito ({cantidadCarrito})
              </Link>
            </li>

            <li className="nav-item ms-lg-1">
              <button
                type="button"
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
