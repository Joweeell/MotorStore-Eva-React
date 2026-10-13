import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { autenticarUsuario } from '../data/usuariosCRUD';

export default function IniciarSesion() {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState('');
  const [pass, setPass] = useState('');
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    setMensaje('');

    const nuevos = {};
    const correoLimpio = correo.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoLimpio)) {
      nuevos.correo = 'Ingresa un correo válido.';
    }

    if (pass.length < 6 || pass.length > 10) {
      nuevos.pass =
        'La contraseña debe tener entre 6 y 10 caracteres.';
    }

    setErrores(nuevos);

    if (Object.keys(nuevos).length > 0) {
      return;
    }

    try {
      const resultado = autenticarUsuario(correoLimpio, pass);

      if (!resultado.ok) {
        setMensaje(resultado.mensaje);
        return;
      }

      // Guardamos solamente los datos públicos de la sesión.
      sessionStorage.setItem(
        'motorstore_sesion',
        JSON.stringify(resultado.usuario)
      );

      setMensaje(`¡Bienvenido/a, ${resultado.usuario.nombre}!`);

      navigate(resultado.usuario.rol === 'admin' ? '/admin' : '/');
    } catch {
      setMensaje(
        'No se pudo iniciar sesión. Inténtalo nuevamente.'
      );
    }
  };

  return (
    <main className="py-5">
      <div className="container d-flex flex-column align-items-center">
        <div className="text-center mb-4">
          <h2 className="display-6 fw-bold">MotorStore</h2>
          <p className="opacity-75 mb-0">
            Inicia sesión con tu cuenta para continuar.
          </p>
        </div>

        <div
          className="card w-100 shadow border-0 rounded-4 overflow-hidden"
          style={{ maxWidth: '450px' }}
        >
          <div className="card-header bg-dark text-white text-center py-3 border-0">
            <h4 className="mb-0 text-uppercase fw-bold">
              Iniciar Sesión
            </h4>
          </div>

          <div className="card-body p-4 p-md-5 bg-light text-dark">
            <form id="form-login" onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label
                  htmlFor="login-correo"
                  className="form-label fw-bold small text-uppercase"
                >
                  Correo
                </label>

                <input
                  type="email"
                  className={`form-control form-control-lg ${
                    errores.correo ? 'is-invalid' : ''
                  }`}
                  id="login-correo"
                  placeholder="ejemplo@duoc.cl"
                  autoComplete="email"
                  value={correo}
                  onChange={(e) => {
                    setCorreo(e.target.value);
                    setErrores((prev) => ({
                      ...prev,
                      correo: '',
                    }));
                    setMensaje('');
                  }}
                />

                {errores.correo && (
                  <div className="invalid-feedback">
                    {errores.correo}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="login-pass"
                  className="form-label fw-bold small text-uppercase"
                >
                  Contraseña
                </label>

                <input
                  type="password"
                  className={`form-control form-control-lg ${
                    errores.pass ? 'is-invalid' : ''
                  }`}
                  id="login-pass"
                  placeholder="Tu contraseña"
                  autoComplete="current-password"
                  value={pass}
                  onChange={(e) => {
                    setPass(e.target.value);
                    setErrores((prev) => ({
                      ...prev,
                      pass: '',
                    }));
                    setMensaje('');
                  }}
                />

                {errores.pass && (
                  <div className="invalid-feedback">
                    {errores.pass}
                  </div>
                )}
              </div>

              {mensaje && (
                <div
                  className={`alert ${
                    mensaje.startsWith('¡Bienvenido')
                      ? 'alert-success'
                      : 'alert-danger'
                  }`}
                  role="status"
                >
                  {mensaje}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-dark w-100 py-2 fw-bold text-uppercase"
              >
                Ingresar
              </button>
            </form>

            <p className="text-center mt-4 mb-0 small">
              ¿No tienes cuenta?{' '}
              <Link to="/registro" className="fw-bold">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}