import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Blogs from './pages/Blogs';
import Productos from './pages/Productos';
import Carrito from './pages/Carrito';
import IniciarSesion from './pages/IniciarSesion';
import RegistroUsuario from './pages/RegistroUsuario';

import AdminHome from './pages/AdminHome';
import AdminProductos from './pages/AdminProductos';
import AdminProductoNuevo from './pages/AdminProductoNuevo';
import AdminUsuarios from './pages/AdminUsuarios';
import AdminUsuarioNuevo from './pages/AdminUsuarioNuevo';

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/registro" element={<RegistroUsuario />} />

        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/productos" element={<AdminProductos />} />
        <Route path="/admin/productos/nuevo" element={<AdminProductoNuevo />} />
        <Route path="/admin/usuarios" element={<AdminUsuarios />} />
        <Route path="/admin/usuarios/nuevo" element={<AdminUsuarioNuevo />} />
      </Routes>

      <Footer />
    </>
  );
}