import { useLocation, Link } from 'react-router-dom';

export default function PagoError() {
    const location = useLocation();
    const datos = location.state?.formData || {};
    const nroOrden = "#20240705";

    return (
        <main className="container py-5" style={{ maxWidth: '800px' }}>
            <div className="alert alert-danger p-4 shadow-sm text-center">
                <h3 className="fw-bold mb-2">❌ No se pudo realizar el pago</h3>
                <p className="mb-0 fs-5">Nro de Intento: <strong>{nroOrden}</strong></p>
            </div>
            <div className="card border-0 shadow-sm p-4 bg-light text-center">
                <p className="text-muted">Hubo un problema al procesar tu tarjeta o pasarela de pagos.</p>
                <div className="mt-3">
                    <Link to="/checkout" className="btn btn-success fw-bold px-4">VOLVER A REALIZAR EL PAGO 🔄</Link>
                </div>
            </div>
        </main>
    );
}