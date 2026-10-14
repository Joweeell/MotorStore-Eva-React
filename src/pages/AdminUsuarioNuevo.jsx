import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  obtenerUsuarios,
  crearUsuarioAdmin,
  actualizarUsuario,
} from '../data/usuariosCRUD';

// Sirve para crear (/admin/usuarios/nuevo) y para editar (/admin/usuarios/editar/:correo)
export default function AdminUsuarioNuevo() {
  const navigate = useNavigate();
  const { correo: correoParam } = useParams();
  const correoOriginal = correoParam ? decodeURIComponent(correoParam) : null;
  const editando = Boolean(correoOriginal);

  const [datos, setDatos] = useState(() => {
    if (!editando) return { nombre: '', correo: '', pass: '', rol: 'cliente' };
    const u = obtenerUsuarios().find(
      (x) => x.correo.toLowerCase() === correoOriginal.toLowerCase()
    );
    return u
      ? { nombre: u.nombre, correo: u.correo, pass: '', rol: u.rol || 'cliente' }
      : null;
  });
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');

  if (!datos) {
    return (
      <main className="py-5">
        <div className="container">
          <div className="alert alert-danger">No se encontró el usuario que quieres editar.</div>
          <Link to="/admin/usuarios" className="btn btn-outline-secondary">Volver</Link>
        </div>
      </main>
    );
  }

  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

  const validar = () => {
    const nuevos = {};
    if (!datos.nombre.trim()) nuevos.nombre = 'El nombre es obligatorio.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo.trim())) {
      nuevos.correo = 'Ingresa un correo válido.';
    }
    if (!editando && datos.pass.length < 4) {
      nuevos.pass = 'La contraseña debe tener al menos 4 caracteres.';
    }
    if (editando && datos.pass && datos.pass.length < 4) {
      nuevos.pass = 'La contraseña debe tener al menos 4 caracteres.';
    }
    return nuevos;
  };

  const enviar = (e) => {
    e.preventDefault();
    const nuevos = validar();
    setErrores(nuevos);
    setErrorGeneral('');
    if (Object.keys(nuevos).length > 0) return;

    const resultado = editando
      ? actualizarUsuario(correoOriginal, datos)
      : crearUsuarioAdmin(datos);

    if (!resultado.ok) {
      setErrorGeneral(resultado.mensaje);
      return;
    }

    navigate('/admin/usuarios', {
      state: {
        mensaje: `"${datos.nombre.trim()}" se ${editando ? 'actualizó' : 'agregó'} correctamente.`,
      },
    });
  };

  return (
    <main className="py-5">
      <div className="container d-flex justify-content-center">
        <div className="card w-100 shadow-sm border-0" style={{ maxWidth: '650px' }}>
          <div className="card-header bg-secondary text-white text-center py-3">
            <h4 className="mb-0 text-uppercase fw-bold">
              {editando ? 'Editar Usuario (Panel Admin)' : 'Nuevo Usuario (Panel Admin)'}
            </h4>
          </div>

          <div className="card-body p-4 bg-light text-dark">
            {errorGeneral && <div className="alert alert-danger" role="alert">{errorGeneral}</div>}

            <form id="form-admin-nuevo-usuario" noValidate onSubmit={enviar}>
              <div className="mb-3">
                <label htmlFor="anu-nombre" className="form-label fw-bold">NOMBRE COMPLETO</label>
                <input type="text" name="nombre" className={`form-control border-dark ${errores.nombre ? 'is-invalid' : ''}`}
                  id="anu-nombre" placeholder="Ej: Carlos López" value={datos.nombre} onChange={cambiar} />
                {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="anu-correo" className="form-label fw-bold">CORREO</label>
                <input type="email" name="correo" className={`form-control border-dark ${errores.correo ? 'is-invalid' : ''}`}
                  id="anu-correo" placeholder="ejemplo@duoc.cl" value={datos.correo} onChange={cambiar} />
                {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="anu-pass" className="form-label fw-bold">CONTRASEÑA</label>
                <input type="password" name="pass" className={`form-control border-dark ${errores.pass ? 'is-invalid' : ''}`}
                  id="anu-pass" placeholder={editando ? 'Déjala vacía para no cambiarla' : 'Mínimo 4 caracteres'}
                  value={datos.pass} onChange={cambiar} />
                {errores.pass && <div className="invalid-feedback">{errores.pass}</div>}
              </div>

              <div className="mb-4">
                <label htmlFor="anu-rol" className="form-label fw-bold">ROL</label>
                <select name="rol" className="form-select border-dark" id="anu-rol" value={datos.rol} onChange={cambiar}>
                  <option value="cliente">Cliente</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>

              <div className="d-flex justify-content-between">
                <Link to="/admin/usuarios" className="btn btn-outline-secondary px-4">Cancelar</Link>
                <button type="submit" className="btn btn-dark px-4 fw-bold text-uppercase">
                  {editando ? 'Guardar Cambios' : 'Guardar Usuario'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}