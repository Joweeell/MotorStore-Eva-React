import { useState } from 'react';
import { Link } from 'react-router-dom';

const datosTerritoriales = {
  "Región Metropolitana": ["Santiago", "Maipú", "Puente Alto", "Providencia"],
  "Región de Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"],
  "Región del Biobío": ["Concepción", "Talcahuano", "Los Ángeles", "Chillán"]
};

const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];

export default function RegistroUsuario() {
  const [datos, setDatos] = useState({
    nombre: '',
    correo: '',
    pass: '',
    passConf: '',
    region: '',
    comuna: '',
  });
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Al cambiar la región se reinicia la comuna
    if (name === 'region') {
      setDatos({ ...datos, region: value, comuna: '' });
    } else {
      setDatos({ ...datos, [name]: value });
    }
  };

  const validar = () => {
    const nuevos = {};

    if (!datos.nombre.trim()) {
      nuevos.nombre = 'Ingresa tu nombre completo.';
    }

    const correo = datos.correo.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(correo)) {
      nuevos.correo = 'Ingresa un correo válido.';
    } else if (!dominiosPermitidos.some((d) => correo.endsWith(d))) {
      nuevos.correo = 'Solo se permiten @duoc.cl, @profesor.duoc.cl y @gmail.com.';
    }

    if (datos.pass.length < 4 || datos.pass.length > 10) {
      nuevos.pass = 'La contraseña debe tener entre 4 y 10 caracteres.';
    }

    if (datos.passConf !== datos.pass || !datos.passConf) {
      nuevos.passConf = 'Las contraseñas no coinciden.';
    }

    if (!datos.region) nuevos.region = 'Selecciona una región.';
    if (!datos.comuna) nuevos.comuna = 'Selecciona una comuna.';

    return nuevos;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevos = validar();
    setErrores(nuevos);

    if (Object.keys(nuevos).length === 0) {
      // Aquí va tu lógica de registro
    }
  };

  const clase = (campo) => `form-control form-control-lg ${errores[campo] ? 'is-invalid' : ''}`;
  const claseSelect = (campo) => `form-select form-select-lg ${errores[campo] ? 'is-invalid' : ''}`;

  return (
    <main className="py-5">
      <div className="container d-flex flex-column align-items-center">

        <div className="text-center mb-4">
          <h2 className="display-6 fw-bold">MotorStore</h2>
          <p className="opacity-75 mb-0">Crea tu cuenta para comprar y seguir tus pedidos.</p>
        </div>

        <div className="card w-100 shadow border-0 rounded-4 overflow-hidden" style={{ maxWidth: '650px' }}>
          <div className="card-header bg-dark text-white text-center py-3 border-0">
            <h4 className="mb-0 text-uppercase fw-bold">Registro de Usuario</h4>
          </div>

          <div className="card-body p-4 p-md-5 bg-light text-dark">
            <form id="form-registro" onSubmit={handleSubmit} noValidate>

              <div className="mb-3">
                <label htmlFor="reg-nombre" className="form-label fw-bold small text-uppercase">Nombre completo</label>
                <input
                  type="text"
                  name="nombre"
                  className={clase('nombre')}
                  id="reg-nombre"
                  placeholder="Ingresa tu nombre"
                  maxLength="50"
                  value={datos.nombre}
                  onChange={handleChange}
                />
                {errores.nombre && <div id="error-nombre" className="invalid-feedback">{errores.nombre}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="reg-correo" className="form-label fw-bold small text-uppercase">Correo</label>
                <input
                  type="email"
                  name="correo"
                  className={clase('correo')}
                  id="reg-correo"
                  placeholder="ejemplo@duoc.cl"
                  maxLength="100"
                  autoComplete="email"
                  value={datos.correo}
                  onChange={handleChange}
                />
                {errores.correo
                  ? <div id="error-correo" className="invalid-feedback">{errores.correo}</div>
                  : <div className="form-text">Solo dominios @duoc.cl, @profesor.duoc.cl y @gmail.com</div>}
              </div>

              <div className="row g-3 mb-3">
                <div className="col-12 col-md-6">
                  <label htmlFor="reg-pass" className="form-label fw-bold small text-uppercase">Contraseña</label>
                  <input
                    type="password"
                    name="pass"
                    className={clase('pass')}
                    id="reg-pass"
                    placeholder="Entre 4 y 10 caracteres"
                    autoComplete="new-password"
                    value={datos.pass}
                    onChange={handleChange}
                  />
                  {errores.pass && <div id="error-pass" className="invalid-feedback">{errores.pass}</div>}
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="reg-pass-conf" className="form-label fw-bold small text-uppercase">Confirmar contraseña</label>
                  <input
                    type="password"
                    name="passConf"
                    className={clase('passConf')}
                    id="reg-pass-conf"
                    placeholder="Repite tu contraseña"
                    autoComplete="new-password"
                    value={datos.passConf}
                    onChange={handleChange}
                  />
                  {errores.passConf && <div id="error-pass-conf" className="invalid-feedback">{errores.passConf}</div>}
                </div>
              </div>

              <div className="row g-3 mb-4">
                <div className="col-12 col-md-6">
                  <label htmlFor="reg-region" className="form-label fw-bold small text-uppercase">Región</label>
                  <select
                    name="region"
                    className={claseSelect('region')}
                    id="reg-region"
                    value={datos.region}
                    onChange={handleChange}
                  >
                    <option value="" disabled>-- Seleccione la región --</option>
                    {Object.keys(datosTerritoriales).map((region) => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                  {errores.region && <div className="invalid-feedback">{errores.region}</div>}
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="reg-comuna" className="form-label fw-bold small text-uppercase">Comuna</label>
                  <select
                    name="comuna"
                    className={claseSelect('comuna')}
                    id="reg-comuna"
                    value={datos.comuna}
                    onChange={handleChange}
                    disabled={!datos.region}
                  >
                    <option value="" disabled>-- Seleccione la comuna --</option>
                    {datos.region && datosTerritoriales[datos.region].map((comuna) => (
                      <option key={comuna} value={comuna}>{comuna}</option>
                    ))}
                  </select>
                  {errores.comuna && <div className="invalid-feedback">{errores.comuna}</div>}
                </div>
              </div>

              <button type="submit" className="btn btn-dark w-100 py-2 fw-bold text-uppercase">
                Registrarse
              </button>
            </form>

            <p className="text-center mt-4 mb-0 small">
              ¿Ya tienes cuenta? <Link to="/login" className="fw-bold">Inicia sesión</Link>
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}