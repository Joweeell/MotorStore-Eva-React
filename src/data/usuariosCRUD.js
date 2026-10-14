const ADMIN_PREDEFINIDO = {
  nombre: 'Administrador',
  correo: 'admin@duoc.cl',
  pass: 'admin123',
  region: 'Región Metropolitana',
  comuna: 'Santiago',
  rol: 'admin',
};

const USERS_KEY = 'motorstore_usuarios';

export function obtenerUsuarios() {
  try {
    const usuarios = JSON.parse(
      localStorage.getItem(USERS_KEY) || '[]'
    );

    return Array.isArray(usuarios) ? usuarios : [];
  } catch {
    return [];
  }
}

export function registrarUsuario(usuario) {
  const usuarios = obtenerUsuarios();
  const correo = usuario.correo.trim().toLowerCase();

  const existe =
    correo === ADMIN_PREDEFINIDO.correo ||
    usuarios.some((u) => u.correo.toLowerCase() === correo);

  if (existe) {
    return {
      ok: false,
      mensaje: 'Este correo ya tiene una cuenta registrada.',
    };
  }

  usuarios.push({
    nombre: usuario.nombre.trim(),
    correo,
    pass: usuario.pass,
    region: usuario.region,
    comuna: usuario.comuna,
    rol: 'cliente',
  });

  localStorage.setItem(USERS_KEY, JSON.stringify(usuarios));

  return {
    ok: true,
    mensaje: '¡Cuenta creada correctamente!',
  };
}

export function autenticarUsuario(correo, pass) {
  const usuarios = [ADMIN_PREDEFINIDO, ...obtenerUsuarios()];
  const correoLimpio = correo.trim().toLowerCase();

  const usuario = usuarios.find(
    (u) =>
      u.correo.toLowerCase() === correoLimpio &&
      u.pass === pass
  );

  if (!usuario) {
    return {
      ok: false,
      mensaje: 'Correo o contraseña incorrectos.',
    };
  }

  return {
    ok: true,
    usuario: {
      nombre: usuario.nombre,
      correo: usuario.correo,
      region: usuario.region,
      comuna: usuario.comuna,
      rol: usuario.rol || 'cliente',
    },
  };
}
// ---------- CRUD para el panel de administración ----------

const guardarUsuarios = (usuarios) =>
  localStorage.setItem(USERS_KEY, JSON.stringify(usuarios));

// Lista para la tabla del admin: el admin predefinido + los usuarios guardados
export function listarUsuariosAdmin() {
  return [ADMIN_PREDEFINIDO, ...obtenerUsuarios()];
}

export function esAdminPredefinido(correo) {
  return correo.trim().toLowerCase() === ADMIN_PREDEFINIDO.correo;
}

export function crearUsuarioAdmin({ nombre, correo, pass, rol }) {
  const usuarios = obtenerUsuarios();
  const correoLimpio = correo.trim().toLowerCase();

  const existe =
    correoLimpio === ADMIN_PREDEFINIDO.correo ||
    usuarios.some((u) => u.correo.toLowerCase() === correoLimpio);

  if (existe) {
    return { ok: false, mensaje: 'Este correo ya tiene una cuenta registrada.' };
  }

  usuarios.push({
    nombre: nombre.trim(),
    correo: correoLimpio,
    pass,
    region: '',
    comuna: '',
    rol: rol === 'admin' ? 'admin' : 'cliente',
  });
  guardarUsuarios(usuarios);
  return { ok: true };
}

export function actualizarUsuario(correoOriginal, { nombre, correo, pass, rol }) {
  const usuarios = obtenerUsuarios();
  const original = correoOriginal.trim().toLowerCase();
  const nuevo = correo.trim().toLowerCase();
  const indice = usuarios.findIndex((u) => u.correo.toLowerCase() === original);

  if (indice === -1) {
    return { ok: false, mensaje: 'No se encontró el usuario.' };
  }

  const repetido =
    nuevo !== original &&
    (nuevo === ADMIN_PREDEFINIDO.correo ||
      usuarios.some((u) => u.correo.toLowerCase() === nuevo));

  if (repetido) {
    return { ok: false, mensaje: 'Ese correo ya pertenece a otra cuenta.' };
  }

  usuarios[indice] = {
    ...usuarios[indice],
    nombre: nombre.trim(),
    correo: nuevo,
    // si la contraseña viene vacía se conserva la anterior
    pass: pass ? pass : usuarios[indice].pass,
    rol: rol === 'admin' ? 'admin' : 'cliente',
  };
  guardarUsuarios(usuarios);
  return { ok: true };
}

export function eliminarUsuario(correo) {
  const usuarios = obtenerUsuarios();
  const objetivo = correo.trim().toLowerCase();
  const restantes = usuarios.filter((u) => u.correo.toLowerCase() !== objetivo);

  if (restantes.length === usuarios.length) return false;
  guardarUsuarios(restantes);
  return true;
}