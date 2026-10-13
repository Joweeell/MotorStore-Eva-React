# 🏍️ MotorStore - Evaluación 2 (React + Vite)

**MotorStore** es una plataforma e-commerce desarrollada para la venta de motocicletas, indumentaria, accesorios y equipamiento de seguridad vial. Este proyecto corresponde a la **Evaluación 2** de la asignatura **Fullstack 2** en **Duoc UC**.

---

## 🛠️ Tecnologías y Herramientas

- **Frontend:** React 18 + Vite
- **Enrutamiento:** React Router DOM (v6)
- **Estilos & UI:** Bootstrap 5.3 + CSS personalizado
- **Persistencia de Datos:** JavaScript ES6+ (Módulos CRUD con simulación en LocalStorage)[cite: 2]
- **Entorno de Testing:** Jasmine & Karma[cite: 2, 4]
- **Transpilación para Tests:** Babel (`babel.config.cjs`)

---

## 📁 Estructura del Proyecto

```text
MotorStore-Eva-React/
├── public/                     # Imágenes y recursos estáticos del catálogo[cite: 1]
│   ├── botas.jpg
│   ├── casco.jpg
│   ├── chaqueta.jpg
│   ├── escape.webp
│   ├── guantes.jpg
│   └── ...
├── src/
│   ├── components/             # Componentes estructurales de la interfaz[cite: 2]
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   └── RequireAdmin.jsx
│   ├── data/                   # Lógica de datos y persistencia (CRUD)[cite: 2]
│   │   ├── productosCRUD.js
│   │   ├── productosCRUD.spec.js   # Pruebas unitarias en Jasmine[cite: 2]
│   │   └── usuariosCRUD.js
│   ├── pages/                  # Vistas y páginas de la aplicación
│   │   ├── AdminHome.jsx
│   │   ├── AdminProductoEditar.jsx
│   │   ├── AdminProductoNuevo.jsx
│   │   ├── AdminProductos.jsx
│   │   ├── AdminUsuarioNuevo.jsx
│   │   ├── AdminUsuarios.jsx
│   │   ├── Blogs.jsx
│   │   ├── Carrito.jsx
│   │   ├── Categoria.jsx
│   │   ├── Checkout.jsx
│   │   ├── Contacto.jsx
│   │   ├── DetalleProducto.jsx
│   │   ├── Home.jsx
│   │   ├── IniciarSesion.jsx
│   │   ├── Nosotros.jsx
│   │   ├── Ofertas.jsx
│   │   ├── PagoCorrecto.jsx
│   │   ├── PagoError.jsx
│   │   ├── Productos.jsx
│   │   └── RegistroUsuario.jsx
│   ├── App.css
│   ├── App.jsx                 # Configuración de rutas e integración principal
│   ├── index.css
│   └── main.jsx                # Punto de entrada de React[cite: 3]
├── babel.config.cjs            # Configuración de Babel para Karma/Jasmine
├── karma.conf.cjs              # Configuración del ejecutor de pruebas Karma[cite: 4]
├── package.json
├── vite.config.js
└── README.md

# Pruebas Unitarias
# npm i -D jsdom
# npm test