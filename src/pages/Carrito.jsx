export default function Carrito() {
  return (
    <main className="py-5">
      <div className="container">
        <h2 className="fw-bold mb-4">Mi carrito de compras</h2>
        <div className="row g-4">
          
          {/* Listado de ítems del carrito */}
          <div className="col-12 col-lg-8" id="items-carrito">
            <p className="text-muted">Tu carrito está vacío por ahora.</p>
          </div>
          
          {/* Resumen de compra y pago */}
          <div className="col-12 col-lg-4">
            <div className="card border-dark shadow-sm bg-light text-dark">
              <div className="card-body p-4 text-center">
                <h4 className="mb-3">
                  TOTAL: <span id="total-carrito" className="fw-bold text-success">$0</span>
                </h4>
                <div className="input-group mb-3">
                  <input type="text" className="form-control border-dark" placeholder="Cupón de descuento" />
                  <button className="btn btn-outline-secondary">Aplicar</button>
                </div>
                <button className="btn btn-success w-100 fw-bold py-2 text-uppercase">Pagar</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}