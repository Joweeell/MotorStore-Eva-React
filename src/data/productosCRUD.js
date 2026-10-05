// Clave para guardar los datos en el almacenamiento local del navegador
const DB_KEY = 'motorstore_productos_db';

// Datos iniciales de prueba (se cargarán solo la primera vez)
const inventarioInicial = [
  { id: 1, nombre: "Suzuki GSXR 1000", categoria: "Deportiva", precio: 15000000, img: "https://placehold.co/400x300/343a40/FFF?text=Suzuki+GSXR" },
  { id: 2, nombre: "Kawasaki Ninja", categoria: "Deportiva", precio: 14500000, img: "https://placehold.co/400x300/343a40/FFF?text=Kawasaki+Ninja" },
  { id: 3, nombre: "Casco Integral LS2", categoria: "Cascos", precio: 120000, img: "https://placehold.co/400x300/343a40/FFF?text=Casco+Integral" },
  { id: 4, nombre: "Chaqueta Alpinestar", categoria: "Chaquetas", precio: 150000, img: "https://placehold.co/400x300/343a40/FFF?text=Chaqueta" }
];

// 1. LEER (Read) - Obtiene todos los productos
export const obtenerProductos = () => {
    const data = localStorage.getItem(DB_KEY);
    if (!data) {
        // Si no hay datos, guarda el inventario inicial y lo devuelve
        localStorage.setItem(DB_KEY, JSON.stringify(inventarioInicial));
        return inventarioInicial;
    }
    return JSON.parse(data); // Convierte el texto guardado de vuelta a un arreglo JavaScript
};

// 2. CREAR (Create) - Añade un nuevo producto
export const crearProducto = (nuevoProducto) => {
    const productos = obtenerProductos();
    // Genera un ID automático secuencial basado en el ID más alto existente
    const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
    
    const productoConId = { ...nuevoProducto, id: nuevoId };
    productos.push(productoConId);
    
    localStorage.setItem(DB_KEY, JSON.stringify(productos));
    return productoConId;
};

// 3. ACTUALIZAR (Update) - Modifica un producto existente por su ID
export const actualizarProducto = (id, datosActualizados) => {
    const productos = obtenerProductos();
    const index = productos.findIndex(p => p.id === id);
    
    if (index !== -1) {
        productos[index] = { ...productos[index], ...datosActualizados };
        localStorage.setItem(DB_KEY, JSON.stringify(productos));
        return productos[index];
    }
    return null; // Retorna null si no encontró el producto
};

// 4. ELIMINAR (Delete) - Borra un producto por su ID
export const eliminarProducto = (id) => {
    let productos = obtenerProductos();
    productos = productos.filter(p => p.id !== id);
    localStorage.setItem(DB_KEY, JSON.stringify(productos));
};