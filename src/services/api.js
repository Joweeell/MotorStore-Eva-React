const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1'
).replace(/\/$/, '');

const SESION_KEY = 'motorstore_sesion';

export function obtenerSesion() {
  try {
    return JSON.parse(sessionStorage.getItem(SESION_KEY) || 'null');
  } catch {
    return null;
  }
}

export function guardarSesion(datosSesion) {
  sessionStorage.setItem(SESION_KEY, JSON.stringify(datosSesion));
}

export function cerrarSesionStorage() {
  sessionStorage.removeItem(SESION_KEY);
}

export async function apiRequest(endpoint, options = {}) {
  const sesion = obtenerSesion();

  const headers = {
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(sesion?.token ? { Authorization: `Bearer ${sesion.token}` } : {}),
    ...(options.headers || {}),
  };

  const respuesta = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (respuesta.status === 204) {
    return null;
  }

  const texto = await respuesta.text();
  let data = null;
  try {
    data = texto ? JSON.parse(texto) : null;
  } catch {
    data = texto;
  }

  if (!respuesta.ok) {
    const mensajeError =
      (data && (data.message || data.error || data.mensaje)) ||
      `Error HTTP ${respuesta.status}`;
    throw new Error(mensajeError);
  }

  return data;
}