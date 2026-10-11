
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { crearProducto } from '../data/productosCRUD';

export default function AdminProductoNuevo() {
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    nombre: '',
    categoria: '',
    precio: '',
    img: '',
    descripcion: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const nombre = formulario.nombre.trim();
    const categoria = formulario.categoria.trim();
    const precio = Number(formulario.precio);

    if (!nombre || !categoria || !formulario.precio) {
      setError('Completa el nombre, la categoría y el precio.');
      return;
    }

    if (!Number.isFinite(precio) || precio <= 0) {
      setError('El precio debe ser un número mayor que cero.');
      return;
    }

    try {
      crearProducto({
        nombre,
        categoria,
        precio,
        img: formulario.img.trim(),
        descripcion: formulario.descripcion.trim(),
      });

      navigate('/admin/productos');
    } catch (err) {
      console.error('Error al guardar el producto:', err);
      setError('No se pudo guardar el producto. Inténtalo nuevamente.');
    }
  };

  return (
    <main className="py-5">
      <div className="container d-flex justify-content-center">
        <div
          className="card w-100 shadow-sm border-0"
          style={{ maxWidth: '650px' }}
        >
          <div className="card-header bg-secondary text-white text-center py-3">
            <h4 className="mb-0 text-uppercase fw-bold">
              Nuevo producto
            </h4>
          </div>

          <div className="card-body p-4 bg-light text-dark">
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="np-nombre" className="form-label fw-bold">
                  NOMBRE
                </label>
                <input
                  type="text"
                  id="np-nombre"
                  name="nombre"
                  className="form-control border-dark"
                  placeholder="Ej: Casco Integral"
                  value={formulario.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="np-categoria" className="form-label fw-bold">
                  CATEGORÍA
                </label>
                <input
                  type="text"
                  id="np-categoria"
                  name="categoria"
                  className="form-control border-dark"
                  placeholder="Ej: Seguridad, Deportiva"
                  value={formulario.categoria}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="np-precio" className="form-label fw-bold">
                  PRECIO (CLP)
                </label>
                <input
                  type="number"
                  id="np-precio"
                  name="precio"
                  className="form-control border-dark"
                  placeholder="Ej: 85000"
                  min="1"
                  step="1"
                  value={formulario.precio}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="np-imagen" className="form-label fw-bold">
                  RUTA O URL DE IMAGEN
                </label>
                <input
                  type="text"
                  id="np-imagen"
                  name="img"
                  className="form-control border-dark"
                  placeholder="https://... o /imagenes/casco.jpg"
                  value={formulario.img}
                  onChange={handleChange}
                />
                <div className="form-text">
                  Campo opcional. Puedes indicar una URL o una ruta pública.
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="np-descripcion"
                  className="form-label fw-bold"
                >
                  DESCRIPCIÓN
                </label>
                <textarea
                  id="np-descripcion"
                  name="descripcion"
                  className="form-control border-dark"
                  rows="4"
                  value={formulario.descripcion}
                  onChange={handleChange}
                />
              </div>

              <div className="d-flex justify-content-between gap-2">
                <Link
                  to="/admin/productos"
                  className="btn btn-outline-secondary px-4"
                >
                  Cancelar
                </Link>

                <button
                  type="submit"
                  className="btn btn-dark px-4 fw-bold text-uppercase"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
