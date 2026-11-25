import { apiRequest, obtenerSesion } from '../services/api';

function separarNombreApellido(nombreCompleto) {
  const limpio = (nombreCompleto || '').trim();
  const partes = limpio.split(/\s+/);
  if (partes.length <= 1) {
    return { nombre: limpio || 'Usuario', apellido: 'MotorStore' };
  }
  return {
    nombre: partes[0],
    apellido: partes.slice(1).join(' '),
  };
}

export function normalizarUsuarioDTO(dto) {
  return {
    idUsuario: dto.idUsuario,
    nombre: `${dto.nombre} ${dto.apellido}`.trim(),
    nombreSolo: dto.nombre,
    apellido: dto.apellido,
    correo: dto.email,
    email: dto.email,
    telefono: dto.telefono || '',
    rol: (dto.rol || 'cliente').toLowerCase(),
    fechaRegistro: dto.fechaRegistro,
  };
}

export async function registrarUsuario(usuario) {
  try {
    const { nombre, apellido } = separarNombreApellido(usuario.nombre);

    await apiRequest('/auth/registro', {
      method: 'POST',
      body: JSON.stringify({
        nombre,
        apellido,
        email: usuario.correo.trim().toLowerCase(),
        password: usuario.pass,
        telefono: usuario.telefono ? usuario.telefono.trim() : null,
      }),
    });

    return {
      ok: true,
      mensaje: '¡Cuenta creada correctamente! Ahora puedes iniciar sesión.',
    };
  } catch (error) {
    return {
      ok: false,
      mensaje: error.message || 'No se pudo registrar el usuario.',
    };
  }
}

export async function autenticarUsuario(correo, pass) {
  try {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: correo.trim().toLowerCase(),
        password: pass,
      }),
    });

    const usuarioNormalizado = normalizarUsuarioDTO(data.usuario);

    return {
      ok: true,
      usuario: {
        ...usuarioNormalizado,
        token: data.token,
        tipoToken: data.tipoToken || 'Bearer',
      },
    };
  } catch (error) {
    return {
      ok: false,
      mensaje: error.message || 'Correo o contraseña incorrectos.',
    };
  }
}

// ---------- CRUD para el panel de administración (/api/v1/usuarios) ----------

export async function listarUsuariosAdmin() {
  const lista = await apiRequest('/usuarios');
  return Array.isArray(lista) ? lista.map(normalizarUsuarioDTO) : [];
}

export function esAdminPredefinido(correo) {
  const sesion = obtenerSesion();
  return (
    sesion?.correo &&
    correo &&
    sesion.correo.trim().toLowerCase() === correo.trim().toLowerCase()
  );
}

export async function crearUsuarioAdmin({ nombre, apellido, correo, pass, telefono, rol }) {
  try {
    const nombres = apellido
      ? { nombre: nombre.trim(), apellido: apellido.trim() }
      : separarNombreApellido(nombre);

    await apiRequest('/usuarios', {
      method: 'POST',
      body: JSON.stringify({
        nombre: nombres.nombre,
        apellido: nombres.apellido,
        email: correo.trim().toLowerCase(),
        password: pass,
        telefono: telefono ? telefono.trim() : null,
        rol: (rol || 'cliente').toLowerCase(),
      }),
    });

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      mensaje: error.message || 'No se pudo crear el usuario.',
    };
  }
}

export async function actualizarUsuario(idUsuario, { nombre, apellido, correo, pass, telefono, rol }) {
  try {
    const nombres = apellido
      ? { nombre: nombre.trim(), apellido: apellido.trim() }
      : separarNombreApellido(nombre);

    await apiRequest(`/usuarios/${idUsuario}`, {
      method: 'PUT',
      body: JSON.stringify({
        nombre: nombres.nombre,
        apellido: nombres.apellido,
        email: correo.trim().toLowerCase(),
        password: pass && pass.trim() ? pass : null,
        telefono: telefono ? telefono.trim() : null,
        rol: (rol || 'cliente').toLowerCase(),
      }),
    });

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      mensaje: error.message || 'No se pudo actualizar el usuario.',
    };
  }
}

export async function eliminarUsuario(idUsuario) {
  try {
    await apiRequest(`/usuarios/${idUsuario}`, {
      method: 'DELETE',
    });
    return true;
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    return false;
  }
}
