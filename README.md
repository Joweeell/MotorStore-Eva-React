# MotorStore - Frontend

MotorStore es una tienda online enfocada en la venta de productos para motociclistas, como cascos, chaquetas, guantes, repuestos y accesorios. Este proyecto corresponde al desarrollo de la interfaz frontend para la evaluación de Fullstack II 

## Tecnologías utilizadas

- **React 19:** desarrollo de la interfaz
- **Vite:** entorno de desarrollo y compilación
- **React Router DOM 7:** navegación entre las distintas páginas
- **Bootstrap 5:** estilos y diseño adaptable
- **React Bootstrap:** componentes visuales
- **JavaScript:** lógica de la aplicación
- **Vitest:** entorno para pruebas automatizadas

## Funcionalidades principales

- Página principal de MotorStore
- Catálogo y detalle de productos
- Navegación por categorías
- Sección de ofertas
- Carrito de compras
- Formulario para finalizar pedidos
- Registro e inicio de sesión de usuarios
- Formulario de contacto
- Panel de administración
- Administración de productos, categorías y usuarios
- Visualización y gestión de pedidos
- Reportes y perfil del administrador

## Estructura del proyecto

```text
MotorStore-Eva-React/
│
├── public/                 # Imágenes y recursos estáticos
│
├── src/
│   ├── components/         # Componentes reutilizables
│   ├── data/               # Funciones para manejar datos
│   ├── pages/              # Páginas de la aplicación
│   ├── services/           # Comunicación con el backend
│   ├── App.jsx             # Configuración de rutas
│   ├── App.css             # Estilos principales
│   ├── index.css           # Estilos generales
│   └── main.jsx            # Punto de entrada
│
├── package.json
├── vite.config.js
└── README.md
```

## Instalación y ejecución

Primero se debe tener instalado Node.js y npm.

Clonar el repositorio:

```bash
git clone https://github.com/Joweeell/MotorStore-Eva-React.git
```

Ingresar a la carpeta:

```bash
cd MotorStore-Eva-React
```

Instalar las dependencias:

```bash
npm install
```

Crear el archivo de configuración:

```powershell
Copy-Item .env.example .env
```

Configurar en el archivo `.env` la dirección del backend:

```env
VITE_API_URL=http://localhost:8080/api/v1
VITE_GOOGLE_CLIENT_ID=
```

Iniciar el proyecto:

```bash
npm run dev
```

La aplicación estará disponible normalmente en:

```text
http://localhost:5173
```

## Comunicación con el backend

El frontend se comunica con el backend de MotorStore mediante solicitudes HTTP utilizando `fetch`.

La comunicación se encuentra centralizada principalmente en:

```text
src/services/api.js
```

Desde este archivo se realizan las solicitudes a la API y se envía el token JWT cuando el usuario tiene una sesión iniciada.

La información de sesión se guarda en `sessionStorage`, mientras que el carrito utiliza `localStorage`.

**Nota:** el componente de inicio de sesión con Google está incluido en el frontend, pero requiere completar su integración con un endpoint compatible del backend.

## Comandos disponibles

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm test
npm run test:coverage
```



---

Proyecto desarrollado para la asignatura Fullstack II - Duoc UC.
