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