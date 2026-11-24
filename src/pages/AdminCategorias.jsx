
import { useEffect, useState } from 'react';
import { apiRequest } from '../services/api';

export default function AdminCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [busqueda, setBusqueda] = useState('');

  const [mostrarModal, setMostrarModal] = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState(null);

  const [formulario, setFormulario] = useState({
    nombreCategoria: '',
    descripcion: '',
  });

  // Obtener categorías desde Spring Boot
  const cargarCategorias = async () => {
    try {
      setCargando(true);
      setError('');

      const datos = await apiRequest('/categorias');

      setCategorias(datos || []);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  // Abrir formulario de creación
  const abrirNuevaCategoria = () => {
    setCategoriaEditando(null);
    setFormulario({
      nombreCategoria: '',
      descripcion: '',
    });

    setError('');
    setMensaje('');
    setMostrarModal(true);
  };

  // Abrir formulario de edición
  const abrirEditarCategoria = (categoria) => {
    setCategoriaEditando(categoria);

    setFormulario({
      nombreCategoria: categoria.nombreCategoria,
      descripcion: categoria.descripcion || '',
    });

    setError('');
    setMensaje('');
    setMostrarModal(true);
  };

  // Cerrar formulario
  const cerrarModal = () => {
    if (guardando) return;

    setMostrarModal(false);
    setCategoriaEditando(null);
    setError('');

    setFormulario({
      nombreCategoria: '',
      descripcion: '',
    });
  };

  // Actualizar campos del formulario
  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  // Crear o editar categoría
  const guardarCategoria = async (e) => {
    e.preventDefault();

    if (guardando) return;

    setError('');
    setMensaje('');

    const datos = {
      nombreCategoria: formulario.nombreCategoria.trim(),
      descripcion: formulario.descripcion.trim(),
    };

    if (!datos.nombreCategoria) {
      setError('Debes ingresar el nombre de la categoría.');
      return;
    }

    if (datos.nombreCategoria.length > 100) {
      setError('El nombre no puede superar los 100 caracteres.');
      return;
    }

    if (datos.descripcion.length > 4000) {
      setError('La descripción no puede superar los 4000 caracteres.');
      return;
    }

    try {
      setGuardando(true);

      if (categoriaEditando) {
        await apiRequest(
          `/categorias/${categoriaEditando.idCategoria}`,
          {
            method: 'PUT',
            body: JSON.stringify(datos),
          }
        );

        setMensaje('Categoría actualizada correctamente.');
      } else {
        await apiRequest('/categorias', {
          method: 'POST',
          body: JSON.stringify(datos),
        });

        setMensaje('Categoría creada correctamente.');
      }

      setMostrarModal(false);
      setCategoriaEditando(null);

      setFormulario({
        nombreCategoria: '',
        descripcion: '',
      });

      await cargarCategorias();
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  };

  // Eliminar categoría
  const eliminarCategoria = async (categoria) => {
    if (guardando) return;

    const confirmado = window.confirm(
      `¿Estás seguro de eliminar la categoría "${categoria.nombreCategoria}"?`
    );

    if (!confirmado) return;

    try {
      setGuardando(true);
      setError('');
      setMensaje('');

      await apiRequest(
        `/categorias/${categoria.idCategoria}`,
        {
          method: 'DELETE',
        }
      );

      setMensaje('Categoría eliminada correctamente.');

      await cargarCategorias();
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  };

  // Buscador de categorías
  const categoriasFiltradas = categorias.filter((categoria) => {
    const texto = busqueda.trim().toLowerCase();

    return (
      categoria.nombreCategoria.toLowerCase().includes(texto) ||
      (categoria.descripcion || '').toLowerCase().includes(texto)
    );
  });

  return (
    <div className="container-fluid py-4">

      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

        <div>
          <h2 className="fw-bold">Categorías</h2>

          <p className="text-muted mb-0">
            Administra las categorías de productos de MotorStore.
          </p>
        </div>

        <button
          className="btn btn-dark"
          onClick={abrirNuevaCategoria}
          disabled={guardando || cargando}
        >
          + Nueva categoría
        </button>

      </div>

      {/* Indicador */}
      <div className="row mb-4">

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">

              <p className="text-muted">
                Total de categorías
              </p>

              <h3 className="fw-bold">
                {categorias.length}
              </h3>

            </div>
          </div>
        </div>

      </div>

      {/* Mensajes */}
      {error && !mostrarModal && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {mensaje && (
        <div
          className="alert alert-success alert-dismissible"
          role="alert"
        >
          {mensaje}

          <button
            type="button"
            className="btn-close"
            aria-label="Cerrar mensaje"
            onClick={() => setMensaje('')}
          />
        </div>
      )}

      {/* Buscador */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">

          <div className="d-flex gap-2">

            <input
              type="search"
              className="form-control"
              placeholder="Buscar categoría..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />

            <button
              className="btn btn-outline-dark"
              onClick={cargarCategorias}
              disabled={cargando || guardando}
            >
              Actualizar
            </button>

          </div>

        </div>
      </div>

      {/* Tabla de categorías */}
      {cargando ? (
        <div className="text-center py-4">

          <div
            className="spinner-border text-dark"
            role="status"
          />

          <p className="mt-2">
            Cargando categorías...
          </p>

        </div>
      ) : (
        <div className="card shadow-sm">

          <div className="table-responsive">

            <table className="table table-hover align-middle mb-0">

              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>

                {categoriasFiltradas.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-4"
                    >
                      {error
                        ? 'No se pudieron cargar las categorías.'
                        : 'No se encontraron categorías.'}
                    </td>
                  </tr>
                ) : (
                  categoriasFiltradas.map((categoria) => (

                    <tr key={categoria.idCategoria}>

                      <td>
                        #{categoria.idCategoria}
                      </td>

                      <td className="fw-bold">
                        {categoria.nombreCategoria}
                      </td>

                      <td>
                        {categoria.descripcion || 'Sin descripción'}
                      </td>

                      <td>

                        <div className="d-flex gap-2">

                          <button
                            className="btn btn-outline-primary btn-sm"
                            disabled={guardando}
                            onClick={() =>
                              abrirEditarCategoria(categoria)
                            }
                          >
                            Editar
                          </button>

                          <button
                            className="btn btn-outline-danger btn-sm"
                            disabled={guardando}
                            onClick={() =>
                              eliminarCategoria(categoria)
                            }
                          >
                            Eliminar
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))
                )}

              </tbody>

            </table>

          </div>

        </div>
      )}

      {/* Modal para crear y editar */}
      {mostrarModal && (
        <div
          className="modal show d-block"
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="tituloCategoria"
        >

          <div className="modal-dialog modal-lg modal-dialog-centered">

            <div className="modal-content">

              <form onSubmit={guardarCategoria}>

                <div className="modal-header">

                  <h5
                    className="modal-title"
                    id="tituloCategoria"
                  >
                    {categoriaEditando
                      ? 'Editar categoría'
                      : 'Nueva categoría'}
                  </h5>

                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Cerrar"
                    disabled={guardando}
                    onClick={cerrarModal}
                  />

                </div>

                <div className="modal-body">

                  {error && (
                    <div className="alert alert-danger">
                      {error}
                    </div>
                  )}

                  {/* Nombre */}
                  <div className="mb-3">

                    <label
                      htmlFor="nombreCategoria"
                      className="form-label fw-bold"
                    >
                      Nombre de la categoría
                    </label>

                    <input
                      id="nombreCategoria"
                      type="text"
                      name="nombreCategoria"
                      className="form-control"
                      placeholder="Ej: Accesorios"
                      value={formulario.nombreCategoria}
                      onChange={manejarCambio}
                      maxLength={100}
                      disabled={guardando}
                      required
                    />

                    <small className="text-muted">
                      {formulario.nombreCategoria.length}/100 caracteres
                    </small>

                  </div>

                  {/* Descripción */}
                  <div className="mb-3">

                    <label
                      htmlFor="descripcion"
                      className="form-label fw-bold"
                    >
                      Descripción
                    </label>

                    <textarea
                      id="descripcion"
                      name="descripcion"
                      className="form-control"
                      rows={5}
                      placeholder="Describe los productos de esta categoría..."
                      value={formulario.descripcion}
                      onChange={manejarCambio}
                      maxLength={4000}
                      disabled={guardando}
                    />

                    <small className="text-muted">
                      {formulario.descripcion.length}/4000 caracteres
                    </small>

                  </div>

                </div>

                <div className="modal-footer">

                  <button
                    type="button"
                    className="btn btn-secondary"
                    disabled={guardando}
                    onClick={cerrarModal}
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={guardando}
                  >
                    {guardando
                      ? 'Guardando...'
                      : categoriaEditando
                      ? 'Guardar cambios'
                      : 'Crear categoría'}
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
