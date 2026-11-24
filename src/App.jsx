
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Blogs from './pages/Blogs';
import Productos from './pages/Productos';
import DetalleProducto from './pages/DetalleProducto';
import Carrito from './pages/Carrito';
import IniciarSesion from './pages/IniciarSesion';
import RegistroUsuario from './pages/RegistroUsuario';
import Categoria from './pages/Categoria';
import Ofertas from './pages/Ofertas';
import Checkout from './pages/Checkout';
import PagoCorrecto from './pages/PagoCorrecto';
import PagoError from './pages/PagoError';

// Páginas de administración
import AdminHome from './pages/AdminHome';
import AdminProductos from './pages/AdminProductos';
import AdminProductoNuevo from './pages/AdminProductoNuevo';
import AdminProductoEditar from './pages/AdminProductoEditar';
import AdminUsuarios from './pages/AdminUsuarios';
import AdminUsuarioNuevo from './pages/AdminUsuarioNuevo';
import AdminOrdenes from './pages/AdminOrdenes';
import AdminCategorias from './pages/AdminCategorias';
import AdminReportes from './pages/AdminReportes';
import AdminPerfil from './pages/AdminPerfil';

// Protección y diseño del panel administrador
import RequireAdmin from './components/RequireAdmin';
import AdminLayout from './components/AdminLayout';

export default function App() {
  const { pathname } = useLocation();

  const enAdmin = pathname.startsWith('/admin');

  return (
    <div className="d-flex flex-column min-vh-100">

      {!enAdmin && <Navbar />}

      <main className="flex-grow-1">

        <Routes>

          {/* Tienda */}
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/categoria" element={<Categoria />} />
          <Route path="/categoria/:slug" element={<Categoria />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/productos" element={<Productos />} />

          {/* Detalle de producto */}
          <Route
            path="/producto/:id"
            element={<DetalleProducto />}
          />

          {/* Carrito y compra */}
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/pago-correcto" element={<PagoCorrecto />} />
          <Route path="/pago-error" element={<PagoError />} />

          {/* Cuenta de usuario */}
          <Route path="/login" element={<IniciarSesion />} />
          <Route path="/iniciar-sesion" element={<IniciarSesion />} />
          <Route path="/registro" element={<RegistroUsuario />} />

          {/* Administración: acceso exclusivo para ADMIN */}
          <Route element={<RequireAdmin />}>

            <Route element={<AdminLayout />}>

              {/* Dashboard */}
              <Route
                path="/admin"
                element={<AdminHome />}
              />

              {/* Productos */}
              <Route
                path="/admin/productos"
                element={<AdminProductos />}
              />

              <Route
                path="/admin/productos/nuevo"
                element={<AdminProductoNuevo />}
              />

              <Route
                path="/admin/productos/editar/:id"
                element={<AdminProductoEditar />}
              />

              {/* Usuarios */}
              <Route
                path="/admin/usuarios"
                element={<AdminUsuarios />}
              />

              <Route
                path="/admin/usuarios/nuevo"
                element={<AdminUsuarioNuevo />}
              />

              <Route
                path="/admin/usuarios/editar/:correo"
                element={<AdminUsuarioNuevo />}
              />

              {/* Órdenes conectadas al backend */}
              <Route
                path="/admin/ordenes"
                element={<AdminOrdenes />}
              />

              {/* Categorías conectadas al backend */}
              <Route
                path="/admin/categorias"
                element={<AdminCategorias />}
              />

              {/* Reportes conectados al backend */}
              <Route
                path="/admin/reportes"
                element={<AdminReportes />}
              />

              {/* Perfil del administrador */}
              <Route
                path="/admin/perfil"
                element={<AdminPerfil />}
              />

            </Route>

          </Route>

        </Routes>

      </main>

      {!enAdmin && <Footer />}

    </div>
  );
}
