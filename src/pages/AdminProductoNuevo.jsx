import { Link } from 'react-router-dom';

export default function AdminProductoNuevo() {
  return (
    <main className="py-5">
      <div className="container d-flex justify-content-center">
        <div className="card w-100 shadow-sm border-0" style={{ maxWidth: '650px' }}>
          <div className="card-header bg-secondary text-white text-center py-3">
            <h4 className="mb-0 text-uppercase fw-bold">Nuevo Producto</h4>
          </div>
          <div className="card-body p-4 bg-light text-dark">
            <form id="form-nuevo-producto" noValidate>
              <div className="mb-3">
                <label htmlFor="np-nombre" className="form-label fw-bold">NOMBRE</label>
                <input type="text" className="form-control border-dark" id="np-nombre" placeholder="Ej: Casco Integral" />
              </div>
              <div className="mb-3">
                <label htmlFor="np-categoria" className="form-label fw-bold">CATEGORÍA</label>
                <input type="text" className="form-control border-dark" id="np-categoria" placeholder="Ej: Seguridad, Deportiva, Accesorio" />
              </div>
              <div className="mb-3">
                <label htmlFor="np-precio" className="form-label fw-bold">PRECIO (CLP)</label>
                <input type="number" className="form-control border-dark" id="np-precio" placeholder="Ej: 85000" min="1" />
              </div>
              <div className="mb-3">
                <label htmlFor="np-imagen" className="form-label fw-bold">RUTA DE IMAGEN</label>
                <input type="text" className="form-control border-dark" id="np-imagen" placeholder="Ej: img/casco.jpg" />
                <div className="form-text text-muted">Debe ser una ruta de imagen ya existente en la carpeta img/.</div>
              </div>
              <div className="mb-4">
                <label htmlFor="np-descripcion" className="form-label fw-bold">DESCRIPCIÓN</label>
                <textarea className="form-control border-dark" id="np-descripcion" rows="4"></textarea>
              </div>
              <div className="d-flex justify-content-between">
                <Link to="/admin/productos" className="btn btn-outline-secondary px-4">Cancelar</Link>
                <button type="submit" className="btn btn-dark px-4 fw-bold text-uppercase">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}