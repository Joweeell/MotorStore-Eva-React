import { Routes, Route } from 'react-router-dom';

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

import AdminHome from './pages/AdminHome';
import AdminProductos from './pages/AdminProductos';
import AdminProductoNuevo from './pages/AdminProductoNuevo';
import AdminUsuarios from './pages/AdminUsuarios';
import AdminUsuarioNuevo from './pages/AdminUsuarioNuevo';
import AdminProductoEditar from './pages/AdminProductoEditar';
import RequireAdmin from './components/RequireAdmin';

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

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

          {/* Administración (solo rol admin) */}
          <Route element={<RequireAdmin />}>
            <Route path="/admin" element={<AdminHome />} />

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

            <Route
              path="/admin/usuarios"
              element={<AdminUsuarios />}
            />

            <Route
              path="/admin/usuarios/nuevo"
              element={<AdminUsuarioNuevo />}
            />
          </Route>
        </Routes>
      </main>

      <Footer />
    </div>
  );
}