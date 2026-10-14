import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registrarUsuario } from '../data/usuariosCRUD';

const datosTerritoriales = {
  'Región de Arica y Parinacota': ['Arica', 'Camarones', 'Putre', 'General Lagos'],
  'Región de Tarapacá': ['Iquique', 'Alto Hospicio', 'Pozo Almonte', 'Camiña', 'Colchane', 'Huara', 'Pica'],
  'Región de Antofagasta': ['Antofagasta', 'Mejillones', 'Sierra Gorda', 'Taltal', 'Calama', 'Ollagüe', 'San Pedro de Atacama', 'Tocopilla', 'María Elena'],
  'Región de Atacama': ['Copiapó', 'Caldera', 'Tierra Amarilla', 'Chañaral', 'Diego de Almagro', 'Vallenar', 'Alto del Carmen', 'Freirina', 'Huasco'],
  'Región de Coquimbo': ['La Serena', 'Coquimbo', 'Andacollo', 'La Higuera', 'Paihuano', 'Vicuña', 'Illapel', 'Canela', 'Los Vilos', 'Salamanca', 'Ovalle', 'Combarbalá', 'Monte Patria', 'Punitaqui', 'Río Hurtado'],
  'Región de Valparaíso': ['Valparaíso', 'Casablanca', 'Concón', 'Juan Fernández', 'Puchuncaví', 'Quintero', 'Viña del Mar', 'Isla de Pascua', 'Los Andes', 'Calle Larga', 'Rinconada', 'San Esteban', 'La Ligua', 'Cabildo', 'Papudo', 'Petorca', 'Zapallar', 'Quillota', 'Calera', 'Hijuelas', 'La Cruz', 'Nogales', 'San Antonio', 'Algarrobo', 'Cartagena', 'El Quisco', 'El Tabo', 'Santo Domingo', 'San Felipe', 'Catemu', 'Llaillay', 'Panquehue', 'Putaendo', 'Santa María', 'Quilpué', 'Limache', 'Olmué', 'Villa Alemana'],
  'Región Metropolitana de Santiago': ['Cerrillos', 'Cerro Navia', 'Conchalí', 'El Bosque', 'Estación Central', 'Huechuraba', 'Independencia', 'La Cisterna', 'La Florida', 'La Granja', 'La Pintana', 'La Reina', 'Las Condes', 'Lo Barnechea', 'Lo Espejo', 'Lo Prado', 'Macul', 'Maipú', 'Ñuñoa', 'Pedro Aguirre Cerda', 'Peñalolén', 'Providencia', 'Pudahuel', 'Quilicura', 'Quinta Normal', 'Recoleta', 'Renca', 'Santiago', 'San Joaquín', 'San Miguel', 'San Ramón', 'Vitacura', 'Puente Alto', 'Pirque', 'San José de Maipo', 'Colina', 'Lampa', 'Tiltil', 'San Bernardo', 'Buin', 'Calera de Tango', 'Paine', 'Melipilla', 'Alhué', 'Curacaví', 'María Pinto', 'San Pedro', 'Talagante', 'El Monte', 'Isla de Maipo', 'Padre Hurtado', 'Peñaflor'],
  'Región del Libertador Gral. Bernardo O\'Higgins': ['Rancagua', 'Codegua', 'Coinco', 'Coltauco', 'Doñihue', 'Graneros', 'Las Cabras', 'Machalí', 'Malloa', 'Mostazal', 'Olivar', 'Peumo', 'Pichidegua', 'Quinta de Tilcoco', 'Rengo', 'Requínoa', 'San Vicente', 'Pichilemu', 'La Estrella', 'Litueche', 'Marchihue', 'Navidad', 'Paredones', 'San Fernando', 'Chépica', 'Chimbarongo', 'Lolol', 'Nancagua', 'Palmilla', 'Peralillo', 'Placilla', 'Pumanque', 'Santa Cruz'],
  'Región del Maule': ['Talca', 'Constitución', 'Curepto', 'Empedrado', 'Maule', 'Pelarco', 'Pencahue', 'Río Claro', 'San Clemente', 'San Rafael', 'Cauquenes', 'Chanco', 'Pelluhue', 'Curicó', 'Hualañé', 'Licantén', 'Molina', 'Rauco', 'Romeral', 'Sagrada Familia', 'Teno', 'Vichuquén', 'Linares', 'Colbún', 'Longaví', 'Parral', 'Retiro', 'San Javier', 'Villa Alegre', 'Yerbas Buenas'],
  'Región de Ñuble': ['Cobquecura', 'Coelemu', 'Ninhue', 'Portezuelo', 'Quirihue', 'Ránquil', 'Treguaco', 'Bulnes', 'Chillán Viejo', 'Chillán', 'El Carmen', 'Pemuco', 'Pinto', 'Quillón', 'San Ignacio', 'Yungay', 'Coihueco', 'Ñiquén', 'San Carlos', 'San Fabián', 'San Nicolás'],
  'Región del Biobío': ['Concepción', 'Coronel', 'Chiguayante', 'Florida', 'Hualqui', 'Lota', 'Penco', 'San Pedro de la Paz', 'Santa Juana', 'Talcahuano', 'Tomé', 'Hualpén', 'Lebu', 'Arauco', 'Cañete', 'Contulmo', 'Curanilahue', 'Los Álamos', 'Tirúa', 'Los Ángeles', 'Antuco', 'Cabrero', 'Laja', 'Mulchén', 'Nacimiento', 'Negrete', 'Quilaco', 'Quilleco', 'San Rosendo', 'Santa Bárbara', 'Tucapel', 'Yumbel', 'Alto Biobío'],
  'Región de La Araucanía': ['Temuco', 'Carahue', 'Cunco', 'Curarrehue', 'Freire', 'Galvarino', 'Gorbea', 'Lautaro', 'Loncoche', 'Melipeuco', 'Nueva Imperial', 'Padre las Casas', 'Perquenco', 'Pitrufquén', 'Pucón', 'Saavedra', 'Teodoro Schmidt', 'Toltén', 'Vilcún', 'Villarrica', 'Cholchol', 'Angol', 'Collipulli', 'Curacautín', 'Ercilla', 'Lonquimay', 'Los Sauces', 'Lumaco', 'Purén', 'Renaico', 'Traiguén', 'Victoria'],
  'Región de Los Ríos': ['Valdivia', 'Corral', 'Lanco', 'Los Lagos', 'Máfil', 'Mariquina', 'Paillaco', 'Panguipulli', 'La Unión', 'Futrono', 'Lago Ranco', 'Río Bueno'],
  'Región de Los Lagos': ['Puerto Montt', 'Calbuco', 'Cochamó', 'Fresia', 'Frutillar', 'Los Muermos', 'Llanquihue', 'Maullín', 'Puerto Varas', 'Castro', 'Ancud', 'Chonchi', 'Curaco de Vélez', 'Dalcahue', 'Puqueldón', 'Queilén', 'Quellón', 'Quemchi', 'Quinchao', 'Osorno', 'Puerto Octay', 'Purranque', 'Puyehue', 'Río Negro', 'San Juan de la Costa', 'San Pablo', 'Chaitén', 'Futaleufú', 'Hualaihué', 'Palena'],
  'Región de Aysén del Gral. Carlos Ibáñez del Campo': ['Coyhaique', 'Lago Verde', 'Aysén', 'Cisnes', 'Guaitecas', 'Cochrane', 'O\'Higgins', 'Tortel', 'Chile Chico', 'Río Ibáñez'],
  'Región de Magallanes y de la Antártica Chilena': ['Punta Arenas', 'Laguna Blanca', 'Río Verde', 'San Gregorio', 'Cabo de Hornos', 'Antártica', 'Porvenir', 'Primavera', 'Timaukel', 'Natales', 'Torres del Paine']
};

const dominiosPermitidos = [
  '@duoc.cl',
  '@profesor.duoc.cl',
  '@gmail.com',
];

export default function RegistroUsuario() {
  const navigate = useNavigate();

  const [datos, setDatos] = useState({
    nombre: '',
    correo: '',
    pass: '',
    passConf: '',
    region: '',
    comuna: '',
  });

  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDatos((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'region' ? { comuna: '' } : {}),
    }));

    setErrores((prev) => ({
      ...prev,
      [name]: '',
      ...(name === 'region' ? { comuna: '' } : {}),
    }));

    setMensaje('');
  };

  const validar = () => {
    const nuevos = {};
    const correo = datos.correo.trim().toLowerCase();

    if (!datos.nombre.trim()) {
      nuevos.nombre = 'Ingresa tu nombre completo.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      nuevos.correo = 'Ingresa un correo válido.';
    } else if (
      !dominiosPermitidos.some((dominio) =>
        correo.endsWith(dominio)
      )
    ) {
      nuevos.correo =
        'Solo se permiten @duoc.cl, @profesor.duoc.cl y @gmail.com.';
    }

    if (datos.pass.length < 6 || datos.pass.length > 10) {
      nuevos.pass =
        'La contraseña debe tener entre 6 y 10 caracteres.';
    }

    if (!datos.passConf || datos.passConf !== datos.pass) {
      nuevos.passConf = 'Las contraseñas no coinciden.';
    }

    if (!datos.region) {
      nuevos.region = 'Selecciona una región.';
    }

    if (!datos.comuna) {
      nuevos.comuna = 'Selecciona una comuna.';
    }

    return nuevos;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje('');

    const nuevos = validar();
    setErrores(nuevos);

    if (Object.keys(nuevos).length > 0) {
      return;
    }

    try {
      const resultado = registrarUsuario(datos);

      if (!resultado.ok) {
        setMensaje(resultado.mensaje);
        return;
      }

      setMensaje(resultado.mensaje);

      setDatos({
        nombre: '',
        correo: '',
        pass: '',
        passConf: '',
        region: '',
        comuna: '',
      });

    } catch {
      setMensaje(
        'No se pudo guardar la cuenta. Comprueba el almacenamiento del navegador.'
      );
    }
  };

  const clase = (campo) =>
    `form-control form-control-lg ${
      errores[campo] ? 'is-invalid' : ''
    }`;

  const claseSelect = (campo) =>
    `form-select form-select-lg ${
      errores[campo] ? 'is-invalid' : ''
    }`;

  return (
    <main className="py-5">
      <div className="container d-flex flex-column align-items-center">
        <div className="text-center mb-4">
          <h2 className="display-6 fw-bold">MotorStore</h2>
          <p className="opacity-75 mb-0">
            Crea tu cuenta para comprar y seguir tus pedidos.
          </p>
        </div>

        <div
          className="card w-100 shadow border-0 rounded-4 overflow-hidden"
          style={{ maxWidth: '650px' }}
        >
          <div className="card-header bg-dark text-white text-center py-3 border-0">
            <h4 className="mb-0 text-uppercase fw-bold">
              Registro de Usuario
            </h4>
          </div>

          <div className="card-body p-4 p-md-5 bg-light text-dark">
            <form
              id="form-registro"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="mb-3">
                <label
                  htmlFor="reg-nombre"
                  className="form-label fw-bold small text-uppercase"
                >
                  Nombre completo
                </label>

                <input
                  type="text"
                  name="nombre"
                  id="reg-nombre"
                  className={clase('nombre')}
                  placeholder="Ingresa tu nombre"
                  maxLength="50"
                  autoComplete="name"
                  value={datos.nombre}
                  onChange={handleChange}
                />

                {errores.nombre && (
                  <div className="invalid-feedback">
                    {errores.nombre}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label
                  htmlFor="reg-correo"
                  className="form-label fw-bold small text-uppercase"
                >
                  Correo
                </label>

                <input
                  type="email"
                  name="correo"
                  id="reg-correo"
                  className={clase('correo')}
                  placeholder="ejemplo@duoc.cl"
                  maxLength="100"
                  autoComplete="email"
                  value={datos.correo}
                  onChange={handleChange}
                />

                {errores.correo ? (
                  <div className="invalid-feedback">
                    {errores.correo}
                  </div>
                ) : (
                  <div className="form-text">
                    Solo dominios @duoc.cl, @profesor.duoc.cl y
                    @gmail.com
                  </div>
                )}
              </div>

              <div className="row g-3 mb-3">
                <div className="col-12 col-md-6">
                  <label
                    htmlFor="reg-pass"
                    className="form-label fw-bold small text-uppercase"
                  >
                    Contraseña
                  </label>

                  <input
                    type="password"
                    name="pass"
                    id="reg-pass"
                    className={clase('pass')}
                    placeholder="Entre 6 y 10 caracteres"
                    autoComplete="new-password"
                    value={datos.pass}
                    onChange={handleChange}
                  />

                  {errores.pass && (
                    <div className="invalid-feedback">
                      {errores.pass}
                    </div>
                  )}
                </div>

                <div className="col-12 col-md-6">
                  <label
                    htmlFor="reg-pass-conf"
                    className="form-label fw-bold small text-uppercase"
                  >
                    Confirmar contraseña
                  </label>

                  <input
                    type="password"
                    name="passConf"
                    id="reg-pass-conf"
                    className={clase('passConf')}
                    placeholder="Repite tu contraseña"
                    autoComplete="new-password"
                    value={datos.passConf}
                    onChange={handleChange}
                  />

                  {errores.passConf && (
                    <div className="invalid-feedback">
                      {errores.passConf}
                    </div>
                  )}
                </div>
              </div>

              <div className="row g-3 mb-4">
                <div className="col-12 col-md-6">
                  <label
                    htmlFor="reg-region"
                    className="form-label fw-bold small text-uppercase"
                  >
                    Región
                  </label>

                  <select
                    name="region"
                    id="reg-region"
                    className={claseSelect('region')}
                    value={datos.region}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      -- Seleccione la región --
                    </option>

                    {Object.keys(datosTerritoriales).map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>

                  {errores.region && (
                    <div className="invalid-feedback">
                      {errores.region}
                    </div>
                  )}
                </div>

                <div className="col-12 col-md-6">
                  <label
                    htmlFor="reg-comuna"
                    className="form-label fw-bold small text-uppercase"
                  >
                    Comuna
                  </label>

                  <select
                    name="comuna"
                    id="reg-comuna"
                    className={claseSelect('comuna')}
                    value={datos.comuna}
                    onChange={handleChange}
                    disabled={!datos.region}
                  >
                    <option value="" disabled>
                      -- Seleccione la comuna --
                    </option>

                    {datos.region &&
                      datosTerritoriales[datos.region].map((comuna) => (
                        <option key={comuna} value={comuna}>
                          {comuna}
                        </option>
                      ))}
                  </select>

                  {errores.comuna && (
                    <div className="invalid-feedback">
                      {errores.comuna}
                    </div>
                  )}
                </div>
              </div>

              {mensaje && (
                <div
                  className={`alert ${
                    mensaje.startsWith('¡Cuenta')
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
                Registrarse
              </button>
            </form>

            <p className="text-center mt-4 mb-0 small">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="fw-bold">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}