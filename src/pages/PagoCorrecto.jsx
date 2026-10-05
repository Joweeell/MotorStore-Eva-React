import { useLocation, Link } from 'react-router-dom';

export default function PagoCorrecto() {
    const location = useLocation();
    const datos = location.state?.formData || {};
    const nroOrden = "#20240705";

    return (
        <main className="container py-5" style={{ maxWidth: '800px' }}>
            <div className="alert alert-success p-4 shadow-sm text-center">
                <h3 className="fw-bold mb-2">🎉 ¡Se ha realizado la compra con éxito!</h3>
                <p className="mb-0 fs-5">Nro de Orden: <strong>{nroOrden}</strong></p>
            </div>
            <div className="card border-0 shadow-sm p-4 bg-light">
                <h5 className="fw-bold mb-3">Resumen de envío</h5>
                <p><strong>Cliente:</strong> {datos.nombre} {datos.apellidos} ({datos.correo})</p>
                <p><strong>Dirección:</strong> {datos.calle}, {datos.depto}, {datos.comuna}, {datos.region}.</p>
                <p><strong>Indicaciones:</strong> {datos.indicaciones}</p>
                <div className="text-center mt-4">
                    <Link to="/" className="btn btn-dark fw-bold px-5">Volver al Inicio</Link>
                </div>
            </div>
        </main>
    );
}