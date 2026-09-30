import { Link } from 'react-router-dom';

export default function AdminUsuarioNuevo() {
  return (
    <main className="py-5">
      <div className="container d-flex justify-content-center">
        <div className="card w-100 shadow-sm border-0" style={{ maxWidth: '650px' }}>
          <div className="card-header bg-secondary text-white text-center py-3">
            <h4 className="mb-0 text-uppercase fw-bold">Nuevo Usuario (Panel Admin)</h4>
          </div>
          
          <div className="card-body p-4 bg-light text-dark">
            <form id="form-admin-nuevo-usuario" noValidate>
              
              <div className="mb-3">
                <label htmlFor="anu-nombre" className="form-label fw-bold">NOMBRE COMPLETO</label>
                <input type="text" className="form-control border-dark" id="anu-nombre" placeholder="Ej: Carlos López" />
              </div>

              <div className="mb-3">
                <label htmlFor="anu-correo" className="form-label fw-bold">CORREO</label>
                <input type="email" className="form-control border-dark" id="anu-correo" placeholder="ejemplo@duoc.cl" />
              </div>

              <div className="mb-3">
                <label htmlFor="anu-pass" className="form-label fw-bold">CONTRASEÑA</label>
                <input type="password" className="form-control border-dark" id="anu-pass" placeholder="Mínimo 4 caracteres" />
              </div>

              <div className="mb-4">
                <label htmlFor="anu-rol" className="form-label fw-bold">ROL</label>
                <select className="form-select border-dark" id="anu-rol">
                  <option value="cliente">Cliente</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>

              <div className="d-flex justify-content-between">
                <Link to="/admin/usuarios" className="btn btn-outline-secondary px-4">Cancelar</Link>
                <button type="submit" className="btn btn-dark px-4 fw-bold text-uppercase">Guardar Usuario</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </main>
  );
}