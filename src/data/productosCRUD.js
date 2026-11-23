import { apiRequest } from '../services/api';

const resolverIdCategoria = (categoria) => {
  if (typeof categoria === 'number') return categoria;
  const texto = (categoria || '').trim().toLowerCase();
  if (texto === 'repuestos') return 2;
  if (texto === 'mantención' || texto === 'mantencion') return 3;
  return 1; // Equipamiento / Seguridad
};

const formatearProducto = (prod) => ({
  id: prod.idProducto,
  idProducto: prod.idProducto,
  nombre: prod.nombreProducto,
  categoria: prod.categoria?.nombreCategoria || 'Equipamiento',
  idCategoria: prod.categoria?.idCategoria || 1,
  precio: Number(prod.precio),
  precioOferta: prod.precioOferta != null ? Number(prod.precioOferta) : null,
  stock: prod.stock != null ? Number(prod.stock) : 0,
  img: prod.imagenUrl || '',
  descripcion: prod.descripcion || '',
});

// 1. OBTENER TODOS LOS PRODUCTOS
export const obtenerProductos = async () => {
  try {
    const productosDB = await apiRequest('/productos');
    return Array.isArray(productosDB) ? productosDB.map(formatearProducto) : [];
  } catch (error) {
    console.error('Error en obtenerProductos:', error);
    return [];
  }
};

// 2. CREAR UN PRODUCTO NUEVO (Requiere rol ADMIN)
export const crearProducto = async (nuevoProducto) => {
  try {
    const cuerpoPeticion = {
      idCategoria: resolverIdCategoria(nuevoProducto.idCategoria || nuevoProducto.categoria),
      nombreProducto: nuevoProducto.nombre,
      descripcion: nuevoProducto.descripcion || '',
      precio: Number(nuevoProducto.precio),
      precioOferta: nuevoProducto.precioOferta ? Number(nuevoProducto.precioOferta) : null,
      stock: nuevoProducto.stock != null ? Number(nuevoProducto.stock) : 10,
      imagenUrl: nuevoProducto.img || '',
    };

    const resultado = await apiRequest('/productos', {
      method: 'POST',
      body: JSON.stringify(cuerpoPeticion),
    });

    return formatearProducto(resultado);
  } catch (error) {
    console.error('Error en crearProducto:', error);
    return null;
  }
};

// 3. ACTUALIZAR UN PRODUCTO (Requiere rol ADMIN)
export const actualizarProducto = async (id, datosActualizados) => {
  try {
    const cuerpoPeticion = {
      idCategoria: resolverIdCategoria(datosActualizados.idCategoria || datosActualizados.categoria),
      nombreProducto: datosActualizados.nombre,
      descripcion: datosActualizados.descripcion || '',
      precio: Number(datosActualizados.precio),
      precioOferta: datosActualizados.precioOferta ? Number(datosActualizados.precioOferta) : null,
      stock: datosActualizados.stock != null ? Number(datosActualizados.stock) : 10,
      imagenUrl: datosActualizados.img || '',
    };

    const resultado = await apiRequest(`/productos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(cuerpoPeticion),
    });

    return formatearProducto(resultado);
  } catch (error) {
    console.error('Error en actualizarProducto:', error);
    return null;
  }
};

// 4. ELIMINAR UN PRODUCTO (Requiere rol ADMIN)
export const eliminarProducto = async (id) => {
  try {
    await apiRequest(`/productos/${id}`, {
      method: 'DELETE',
    });
    return true;
  } catch (error) {
    console.error('Error en eliminarProducto:', error);
    return false;
  }
};