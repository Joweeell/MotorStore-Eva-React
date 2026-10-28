const API_URL = 'http://localhost:5000/api/productos';

// Función interna para transformar los nombres de MySQL a los nombres de tu React
const formatearProducto = (prodMySQL) => ({
  id: prodMySQL.id_product,
  nombre: prodMySQL.nombre_producto,
  categoria: prodMySQL.id_categoria === 1 ? 'Seguridad' : prodMySQL.id_categoria === 2 ? 'Repuestos' : 'Mantención', // Mapeo simple de tus categorías SQL
  precio: Number(prodMySQL.precio),
  img: prodMySQL.imagen_url,
  descripcion: prodMySQL.descripcion
});

// 1. OBTENER TODOS LOS PRODUCTOS (De MySQL vía API)
export const obtenerProductos = async () => {
  try {
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok) throw new Error('Error al obtener productos.');
    const productosDB = await respuesta.json();
    
    // Convertimos el formato de la base de datos al formato de tu React
    return productosDB.map(formatearProducto);
  } catch (error) {
    console.error("Error en obtenerProductos:", error);
    return [];
  }
};

// 2. CREAR UN PRODUCTO NUEVO
export const crearProducto = async (nuevoProducto) => {
  try {
    // Adaptamos el formato de React al formato que espera nuestro backend/MySQL
    const cuerpoPeticion = {
      id_categoria: nuevoProducto.categoria === 'Seguridad' ? 1 : nuevoProducto.categoria === 'Repuestos' ? 2 : 3,
      nombre_producto: nuevoProducto.nombre,
      descripcion: nuevoProducto.descripcion,
      precio: nuevoProducto.precio,
      stock: 10, // Valor por defecto para el inventario local
      imagen_url: nuevoProducto.img
    };

    const respuesta = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cuerpoPeticion)
    });
    
    if (!respuesta.ok) throw new Error('Error al crear el producto.');
    const resultado = await respuesta.json();
    
    return { ...nuevoProducto, id: resultado.id };
  } catch (error) {
    console.error("Error en crearProducto:", error);
    return null;
  }
};

// 3. ACTUALIZAR UN PRODUCTO
export const actualizarProducto = async (id, datosActualizados) => {
  try {
    // Adaptamos los datos antes de enviarlos a la base de datos
    const cuerpoPeticion = {
      id_categoria: datosActualizados.categoria === 'Seguridad' ? 1 : datosActualizados.categoria === 'Repuestos' ? 2 : 3,
      nombre_producto: datosActualizados.nombre,
      descripcion: datosActualizados.descripcion,
      precio: datosActualizados.precio,
      stock: 10,
      imagen_url: datosActualizados.img
    };

    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cuerpoPeticion)
    });

    if (!respuesta.ok) throw new Error('Error al actualizar el producto.');
    return true;
  } catch (error) {
    console.error("Error en actualizarProducto:", error);
    return null;
  }
};

// 4. ELIMINAR UN PRODUCTO
export const eliminarProducto = async (id) => {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!respuesta.ok) throw new Error('Error al eliminar el producto.');
    return true;
  } catch (error) {
    console.error("Error en eliminarProducto:", error);
    return false;
  }
};
