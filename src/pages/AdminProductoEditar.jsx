import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  obtenerProductos,
  actualizarProducto,
} from '../data/productosCRUD';

export default function AdminProductoEditar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    nombre: '',
    categoria: '',
    precio: '',
    img: '',
    descripcion: '',
  });

  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    try {
      const producto = obtenerProductos().find(
        (p) => Number(p.id) === Number(id)
      );

      if (!producto) {
        setError('No se encontró el producto solicitado.');
        setCargando(false);
        return;
      }

      setFormulario({
        nombre: producto.nombre || '',
        categoria: producto.categoria || '',
        precio: String(producto.precio ?? ''),
        img: producto.img || '',
        descripcion: producto.descripcion || '',
      });

      setCargando(false);
    } catch (err) {
      console.error('Error al cargar el producto:', err);
      setError('No se pudo cargar el producto.');
      setCargando(false);
    }
  }, [id]);

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

    if (!nombre || !categoria || !formulario.precio.trim()) {
      setError('Completa el nombre, la categoría y el precio.');
      return;
    }

    if (!Number.isFinite(precio) || precio <= 0) {
      setError('El precio debe ser un número mayor que cero.');
      return;
    }

    try {
      const actualizado = actualizarProducto(Number(id), {
        nombre,
        categoria,
        precio,
        img: formulario.img.trim(),
        descripcion: formulario.descripcion.trim(),
      });

      if (!actualizado) {
        setError('No se pudo encontrar el producto para actualizarlo.');
        return;
      }

        navigate('/admin/productos', {
        state: { mensaje: `"${nombre}" se actualizó correctamente.` },
      });
    } catch (err) {
      console.error('Error al actualizar el producto:', err);
      setError('Ocurrió un error al guardar los cambios.');
    }
  };

  if (cargando) {
    return (
      <main className="container py-5">
        <p>Cargando producto...</p>
      </main>
    );
  }

  return (
    <main className="py-5">
      <div className="container d-flex justify-content-center">
        <div
          className="card w-100 shadow-sm border-0"
          style={{ maxWidth: '650px' }}
        >
          <div className="card-header bg-dark text-white text-center py-3">
            <h4 className="mb-0 fw-bold text-uppercase">
              Editar producto
            </h4>
          </div>

          <div className="card-body p-4 bg-light text-dark">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            {!error || formulario.nombre ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="edit-nombre" className="form-label fw-bold">
                    NOMBRE
                  </label>
                  <input
                    id="edit-nombre"
                    name="nombre"
                    className="form-control"
                    value={formulario.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="edit-categoria"
                    className="form-label fw-bold"
                  >
                    CATEGORÍA
                  </label>
                  <input
                    id="edit-categoria"
                    name="categoria"
                    className="form-control"
                    value={formulario.categoria}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="edit-precio" className="form-label fw-bold">
                    PRECIO (CLP)
                  </label>
                  <input
                    id="edit-precio"
                    name="precio"
                    type="number"
                    min="1"
                    step="1"
                    className="form-control"
                    value={formulario.precio}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="edit-img" className="form-label fw-bold">
                    RUTA O URL DE IMAGEN
                  </label>
                  <input
                    id="edit-img"
                    name="img"
                    className="form-control"
                    value={formulario.img}
                    onChange={handleChange}
                    placeholder="/GSXR1000.jpg"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="edit-descripcion"
                    className="form-label fw-bold"
                  >
                    DESCRIPCIÓN
                  </label>
                  <textarea
                    id="edit-descripcion"
                    name="descripcion"
                    className="form-control"
                    rows="4"
                    value={formulario.descripcion}
                    onChange={handleChange}
                  />
                </div>

                <div className="d-flex justify-content-between gap-2">
                  <Link
                    to="/admin/productos"
                    className="btn btn-outline-secondary"
                  >
                    Cancelar
                  </Link>

                  <button type="submit" className="btn btn-success fw-bold">
                    Guardar cambios
                  </button>
                </div>
              </form>
            ) : (
              <Link to="/admin/productos" className="btn btn-dark">
                Volver a productos
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}