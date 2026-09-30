export default function Contacto() {
  return (
    <main className="py-5">
        <div className="container d-flex flex-column align-items-center">
            
            <div className="text-center mb-4">
                <h2 className="display-6 fw-bold">MotorStore</h2>
                <p className="text-muted">¿Tienes dudas? Escríbenos y te responderemos a la brevedad.</p>
            </div>

            <div className="card w-100 shadow-sm border-0 bg-light" style={{ maxWidth: '650px' }}>
                <div className="card-header bg-secondary text-white text-center py-3">
                    <h4 className="mb-0 text-uppercase fw-bold">Formulario de Contactos</h4>
                </div>
                
                <div className="card-body p-4 text-dark">
                    <form id="form-contacto" noValidate>
                        
                        <div className="mb-4">
                            <label htmlFor="cont-nombre" className="form-label fw-bold">NOMBRE COMPLETO</label>
                            <input type="text" className="form-control border-dark" id="cont-nombre" placeholder="Ingresa tu nombre" autoComplete="name" maxLength="100" />
                            <div id="error-cont-nombre" className="text-danger small mt-1 d-none"></div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="cont-correo" className="form-label fw-bold">CORREO</label>
                            <input type="email" className="form-control border-dark" id="cont-correo" placeholder="ejemplo@duoc.cl" autoComplete="email" maxLength="100" />
                            <div className="form-text text-muted">Solo se permiten dominios @duoc.cl, @profesor.duoc.cl y @gmail.com</div>
                            <div id="error-cont-correo" className="text-danger small mt-1 d-none"></div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="cont-mensaje" className="form-label fw-bold">COMENTARIO</label>
                            <textarea className="form-control border-dark" id="cont-mensaje" rows="5" placeholder="Escribe tu mensaje aquí..." maxLength="500"></textarea>
                            <div className="form-text text-muted text-end"><span id="contador-mensaje">0</span>/500 caracteres</div>
                            <div id="error-cont-mensaje" className="text-danger small mt-1 d-none"></div>
                        </div>

                        <div className="text-center mt-4">
                            <button type="submit" className="btn btn-outline-dark px-5 py-2 fw-bold text-uppercase border-2">Enviar Mensaje</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </main>
  );
}