import { useState } from 'react';
import { apiRequest } from '../services/api';

const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];

export default function Contacto() {
  const [datos, setDatos] = useState({
    nombre: '',
    correo: '',
    asunto: 'Consulta desde web',
    mensaje: '',
  });
  const [errores, setErrores] = useState({});
  const [estado, setEstado] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
    setErrores((prev) => ({ ...prev, [name]: '' }));
    setEstado(null);
  };

  const validar = () => {
    const nuevos = {};
    const correo = datos.correo.trim().toLowerCase();

    if (!datos.nombre.trim()) {
      nuevos.nombre = 'El nombre es obligatorio.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      nuevos.correo = 'Ingresa un correo válido.';
    } else if (!dominiosPermitidos.some((d) => correo.endsWith(d))) {
      nuevos.correo =
        'Solo se permiten dominios @duoc.cl, @profesor.duoc.cl y @gmail.com.';
    }

    if (!datos.mensaje.trim()) {
      nuevos.mensaje = 'Escribe un comentario antes de enviar.';
    }

    return nuevos;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstado(null);

    const nuevos = validar();
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    setEnviando(true);
    try {
      await apiRequest('/contacto', {
        method: 'POST',
        body: JSON.stringify({
          nombre: datos.nombre.trim(),
          email: datos.correo.trim().toLowerCase(),
          asunto: datos.asunto.trim() || 'Consulta web',
          mensaje: datos.mensaje.trim(),
        }),
      });

      setEstado({
        tipo: 'success',
        texto: '¡Mensaje enviado correctamente! Te responderemos a la brevedad.',
      });
      setDatos({
        nombre: '',
        correo: '',
        asunto: 'Consulta desde web',
        mensaje: '',
      });
    } catch (error) {
      setEstado({
        tipo: 'danger',
        texto: error.message || 'No se pudo enviar el mensaje.',
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className="py-5">
      <div className="container d-flex flex-column align-items-center">
        <div className="text-center mb-4">
          <h2 className="display-6 fw-bold">MotorStore</h2>
          <p className="text-muted">
            ¿Tienes dudas? Escríbenos y te responderemos a la brevedad.
          </p>
        </div>

        <div
          className="card w-100 shadow-sm border-0 bg-light"
          style={{ maxWidth: '650px' }}
        >
          <div className="card-header bg-secondary text-white text-center py-3">
            <h4 className="mb-0 text-uppercase fw-bold">
              Formulario de Contacto
            </h4>
          </div>

          <div className="card-body p-4 text-dark">
            <form id="form-contacto" onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <label htmlFor="cont-nombre" className="form-label fw-bold">
                  NOMBRE COMPLETO
                </label>
                <input
                  type="text"
                  name="nombre"
                  className={`form-control border-dark ${errores.nombre ? 'is-invalid' : ''}`}
                  id="cont-nombre"
                  placeholder="Ingresa tu nombre"
                  autoComplete="name"
                  maxLength="100"
                  value={datos.nombre}
                  onChange={handleChange}
                />
                {errores.nombre && (
                  <div className="invalid-feedback">{errores.nombre}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="cont-correo" className="form-label fw-bold">
                  CORREO
                </label>
                <input
                  type="email"
                  name="correo"
                  className={`form-control border-dark ${errores.correo ? 'is-invalid' : ''}`}
                  id="cont-correo"
                  placeholder="ejemplo@duoc.cl"
                  autoComplete="email"
                  maxLength="100"
                  value={datos.correo}
                  onChange={handleChange}
                />
                {errores.correo ? (
                  <div className="invalid-feedback">{errores.correo}</div>
                ) : (
                  <div className="form-text text-muted">
                    Solo se permiten dominios @duoc.cl, @profesor.duoc.cl y
                    @gmail.com
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="cont-mensaje" className="form-label fw-bold">
                  COMENTARIO
                </label>
                <textarea
                  name="mensaje"
                  className={`form-control border-dark ${errores.mensaje ? 'is-invalid' : ''}`}
                  id="cont-mensaje"
                  rows="5"
                  placeholder="Escribe tu mensaje aquí..."
                  maxLength="500"
                  value={datos.mensaje}
                  onChange={handleChange}
                />
                <div className="form-text text-muted text-end">
                  {datos.mensaje.length}/500 caracteres
                </div>
                {errores.mensaje && (
                  <div className="invalid-feedback">{errores.mensaje}</div>
                )}
              </div>

              {estado && (
                <div className={`alert alert-${estado.tipo}`} role="status">
                  {estado.texto}
                </div>
              )}

              <div className="text-center mt-4">
                <button
                  type="submit"
                  className="btn btn-outline-dark px-5 py-2 fw-bold text-uppercase border-2"
                  disabled={enviando}
                >
                  {enviando ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}