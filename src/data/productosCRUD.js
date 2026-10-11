
const DB_KEY = 'motorstore_productos_db';

const inventarioInicial = [
  {
    id: 1,
    nombre: 'Suzuki GSXR 1000',
    categoria: 'Deportiva',
    precio: 15000000,
    img: 'GSXR1000.jpg',
    descripcion: 'Motocicleta deportiva de alto rendimiento.',
  },
  {
    id: 2,
    nombre: 'Kawasaki Ninja',
    categoria: 'Deportiva',
    precio: 14500000,
    img: 'zx.jpg',
    descripcion: 'Ícono deportivo con motor potente y ágil.',
  },
  {
    id: 3,
    nombre: 'Yamaha R9',
    categoria: 'Deportiva',
    precio: 16000000,
    img: 'r9.jpeg',
    descripcion: 'Superdeportiva de última generación con chasis liviano.',
  },
  {
    id: 4,
    nombre: 'Porta Patente',
    categoria: 'Accesorio',
    precio: 40000,
    img: 'm2.webp',
    descripcion: 'Accesorio resistente y de alta durabilidad.',
  },
  {
    id: 5,
    nombre: 'Escape Yoshimura',
    categoria: 'Indumentaria',
    precio: 160000,
    img: 'escape.webp',
    descripcion: 'Escape de fibra de carbono real, excelente sonido.',
  },
  {
    id: 6,
    nombre: 'Guantes Alpinestar',
    categoria: 'Seguridad',
    precio: 139900,
    img: 'guantes.jpg',
    descripcion: 'Guantes racing de piel de cabra de primera calidad.',
  },
  {
    id: 7,
    nombre: 'Chaqueta MotorStore',
    categoria: 'Indumentaria',
    precio: 120000,
    img: 'chaqueta.jpg',
    descripcion: 'Chaqueta de moto con protecciones reforzadas.',
  },
  {
    id: 8,
    nombre: 'Casco Integral',
    categoria: 'Seguridad',
    precio: 430990,
    img: 'casco.jpg',
    descripcion: 'Casco integral certificado con excelente ventilación.',
  },
];

export const obtenerProductos = () => {
  const data = localStorage.getItem(DB_KEY);

  if (!data) {
    localStorage.setItem(DB_KEY, JSON.stringify(inventarioInicial));
    return inventarioInicial;
  }

  const productos = JSON.parse(data);

  if (!Array.isArray(productos)) {
    throw new Error('El inventario guardado no tiene un formato válido.');
  }

  // Agrega productos iniciales que falten sin borrar los existentes.
  const nombresExistentes = new Set(
    productos.map((p) => p.nombre.trim().toLowerCase())
  );

  let siguienteId =
    productos.reduce((max, p) => Math.max(max, Number(p.id) || 0), 0) + 1;

  const faltantes = inventarioInicial
    .filter(
      (producto) =>
        !nombresExistentes.has(producto.nombre.trim().toLowerCase())
    )
    .map((producto) => ({
      ...producto,
      id: siguienteId++,
    }));

  if (faltantes.length > 0) {
    const inventarioActualizado = [...productos, ...faltantes];
    localStorage.setItem(DB_KEY, JSON.stringify(inventarioActualizado));
    return inventarioActualizado;
  }

  return productos;
};

export const crearProducto = (nuevoProducto) => {
  const productos = obtenerProductos();

  const nuevoId =
    productos.reduce((max, p) => Math.max(max, Number(p.id) || 0), 0) + 1;

  const productoConId = { ...nuevoProducto, id: nuevoId };

  const actualizados = [...productos, productoConId];
  localStorage.setItem(DB_KEY, JSON.stringify(actualizados));

  return productoConId;
};

export const actualizarProducto = (id, datosActualizados) => {
  const productos = obtenerProductos();
  const index = productos.findIndex((p) => p.id === id);

  if (index === -1) {
    return null;
  }

  productos[index] = { ...productos[index], ...datosActualizados };
  localStorage.setItem(DB_KEY, JSON.stringify(productos));

  return productos[index];
};

export const eliminarProducto = (id) => {
  const productos = obtenerProductos();
  const actualizados = productos.filter((p) => p.id !== id);

  localStorage.setItem(DB_KEY, JSON.stringify(actualizados));

  return actualizados.length !== productos.length;
};
