import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "./productosCRUD.js";

describe("Pruebas unitarias de productosCRUD", () => {
  const DB_KEY = "motorstore_productos_db";

  const productoPrueba = {
    nombre: "Honda CB500",
    categoria: "Deportiva",
    precio: 5500000,
    img: "honda.jpg",
    descripcion: "Motocicleta para pruebas",
  };

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  // Prueba 1: carga del inventario inicial.
  it("debe cargar los 8 productos iniciales", () => {
    const productos = obtenerProductos();

    expect(productos.length).toBe(8);
  });

  // Prueba 2: persistencia del inventario inicial.
  it("debe guardar el inventario inicial en localStorage", () => {
    obtenerProductos();

    const guardados = JSON.parse(localStorage.getItem(DB_KEY));

    expect(guardados.length).toBe(8);
  });

  // Prueba 3: lectura de productos guardados.
  it("debe recuperar los productos existentes", () => {
    const guardados = [
      { id: 100, nombre: "Producto de prueba" },
    ];

    localStorage.setItem(DB_KEY, JSON.stringify(guardados));

    const productos = obtenerProductos();

    expect(productos.some((p) => p.id === 100)).toBeTrue();
  });

  // Prueba 4: recuperación de productos iniciales faltantes.
  it("debe agregar los productos iniciales que falten", () => {
    localStorage.setItem(
      DB_KEY,
      JSON.stringify([
        { id: 100, nombre: "Producto personalizado" },
      ])
    );

    const productos = obtenerProductos();

    expect(productos.length).toBe(9);
    expect(
      productos.some((p) => p.nombre === "Suzuki GSXR 1000")
    ).toBeTrue();
  });

  // Prueba 5: creación con identificador nuevo.
  it("debe crear un producto con un ID único", () => {
    const creado = crearProducto(productoPrueba);

    expect(creado.id).toBeDefined();
    expect(creado.id).toBe(9);
    expect(creado.nombre).toBe("Honda CB500");
  });

  // Prueba 6: persistencia del producto creado.
  it("debe guardar el producto creado en localStorage", () => {
    crearProducto(productoPrueba);

    const guardados = JSON.parse(localStorage.getItem(DB_KEY));

    expect(
      guardados.some((p) => p.nombre === "Honda CB500")
    ).toBeTrue();
  });

  // Prueba 7: actualización de un producto existente.
  it("debe actualizar los datos de un producto existente", () => {
    const creado = crearProducto(productoPrueba);

    const actualizado = actualizarProducto(creado.id, {
      precio: 6000000,
    });

    expect(actualizado.precio).toBe(6000000);
    expect(actualizado.nombre).toBe("Honda CB500");
  });

  // Prueba 8: actualización de un ID inexistente.
  it("debe devolver null si el producto no existe", () => {
    const resultado = actualizarProducto(9999, {
      precio: 1000,
    });

    expect(resultado).toBeNull();
  });

  // Prueba 9: eliminación de un producto existente.
  it("debe eliminar un producto existente", () => {
    const creado = crearProducto(productoPrueba);

    const resultado = eliminarProducto(creado.id);
    const productos = obtenerProductos();

    expect(resultado).toBeTrue();
    expect(
      productos.some((p) => p.id === creado.id)
    ).toBeFalse();
  });

  // Prueba 10: intento de eliminar un ID inexistente.
  it("debe devolver false si el producto que se elimina no existe", () => {
    const resultado = eliminarProducto(9999);

    expect(resultado).toBeFalse();
  });

  // Prueba 11: inventario guardado con formato inválido.
  it("debe lanzar un error si el inventario guardado no es un array", () => {
    localStorage.setItem(
      DB_KEY,
      JSON.stringify({ producto: "inválido" })
    );

    expect(() => obtenerProductos()).toThrowError(
      "El inventario guardado no tiene un formato válido."
    );
  });

  // Prueba 12: recuperación de productos iniciales faltantes.
  it("debe conservar los productos personalizados y agregar los iniciales faltantes", () => {
    const productoPersonalizado = {
      id: 20,
      nombre: "Moto personalizada",
      categoria: "Deportiva",
      precio: 5000000,
      img: "moto.jpg",
      descripcion: "Moto de prueba",
    };

    localStorage.setItem(
      DB_KEY,
      JSON.stringify([productoPersonalizado])
    );

    const productos = obtenerProductos();

    expect(productos.length).toBe(9);
    expect(
      productos.some((p) => p.nombre === "Moto personalizada")
    ).toBeTrue();
    expect(
      productos.some((p) => p.nombre === "Suzuki GSXR 1000")
    ).toBeTrue();
  });

  // Prueba 13: no duplicar productos iniciales.
  it("no debe duplicar productos iniciales si ya existen", () => {
    const productos = obtenerProductos();
    const resultado = obtenerProductos();

    expect(resultado.length).toBe(productos.length);
  });

  // Prueba 14: ID no numérico.
  it("debe asignar el siguiente ID válido si existen IDs no numéricos", () => {
    localStorage.setItem(
      DB_KEY,
      JSON.stringify([
        {
          id: "no-numérico",
          nombre: "Moto personalizada",
          categoria: "Deportiva",
          precio: 5000000,
          img: "moto.jpg",
          descripcion: "Moto de prueba",
        },
        {
          id: "también-inválido",
          nombre: "Otra moto",
          categoria: "Deportiva",
          precio: 4000000,
          img: "otra.jpg",
          descripcion: "Otra moto de prueba",
        },
      ])
    );

    const nuevoProducto = crearProducto({
      nombre: "Moto nueva",
      categoria: "Deportiva",
      precio: 6000000,
      img: "nueva.jpg",
      descripcion: "Nueva moto de prueba",
    });

    // obtenerProductos agrega los productos iniciales faltantes.
    expect(nuevoProducto.id).toBe(9);
  });

  // Prueba 15: ID igual a cero.
  it("debe asignar un ID válido cuando el inventario contiene un ID cero", () => {
    localStorage.setItem(
      DB_KEY,
      JSON.stringify([
        {
          id: 0,
          nombre: "Moto con ID cero",
          categoria: "Deportiva",
          precio: 5000000,
          img: "cero.jpg",
          descripcion: "Moto de prueba",
        },
      ])
    );

    const nuevoProducto = crearProducto({
      nombre: "Moto nueva",
      categoria: "Deportiva",
      precio: 6000000,
      img: "nueva.jpg",
      descripcion: "Nueva moto de prueba",
    });

    // Los productos iniciales faltantes se agregan antes de crear.
    expect(nuevoProducto.id).toBe(9);
  });
});