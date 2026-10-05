import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Checkout() {
    const navigate = useNavigate();
    
    // Estado para los datos del formulario de compra
    const [formData, setFormData] = useState({
        nombre: 'Pedro',
        apellidos: 'Hacker',
        correo: 'pedro.hacker20@example.com',
        calle: 'Los Crisantemos, Edificio Norte',
        depto: 'Depto 603',
        region: 'Región Metropolitana de Santiago',
        comuna: 'Cerrillos',
        indicaciones: 'Si el martes no estaremos en el depto, dejar con el conserje'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const simularPagoExitoso = (e) => {
        e.preventDefault();
        // Redirige a la vista de pago correcto con los datos
        navigate('/pago-correcto', { state: { formData } });
    };

    const simularPagoError = (e) => {
        e.preventDefault();
        // Redirige a la vista de pago con error
        navigate('/pago-error', { state: { formData } });
    };

    return (
        <main className="py-5 bg-light">
            <div className="container" style={{ maxWidth: '800px' }}>
                <div className="card shadow-sm border-0 p-4">
                    <h3 className="fw-bold mb-4">Carrito de compra</h3>
                    <p className="text-muted small">Completa la siguiente información para finalizar tu pedido en MotorStore.</p>

                    <form>
                        {/* Información del Cliente */}
                        <h5 className="fw-bold mt-4 mb-3 border-bottom pb-2">Información del cliente</h5>
                        <div className="row g-3 mb-3">
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Nombre</label>
                                <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Apellidos</label>
                                <input type="text" className="form-control" name="apellidos" value={formData.apellidos} onChange={handleChange} required />
                            </div>
                            <div className="col-12">
                                <label className="form-label fw-semibold">Correo</label>
                                <input type="email" className="form-control" name="correo" value={formData.correo} onChange={handleChange} required />
                            </div>
                        </div>

                        {/* Dirección de Entrega */}
                        <h5 className="fw-bold mt-4 mb-3 border-bottom pb-2">Dirección de entrega de los productos</h5>
                        <div className="row g-3 mb-4">
                            <div className="col-md-8">
                                <label className="form-label fw-semibold">Calle *</label>
                                <input type="text" className="form-control" name="calle" value={formData.calle} onChange={handleChange} required />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label fw-semibold">Departamento (opcional)</label>
                                <input type="text" className="form-control" name="depto" value={formData.depto} onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Región</label>
                                <input type="text" className="form-control" name="region" value={formData.region} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Comuna</label>
                                <input type="text" className="form-control" name="comuna" value={formData.comuna} onChange={handleChange} required />
                            </div>
                            <div className="col-12">
                                <label className="form-label fw-semibold">Indicaciones para la entrega (opcional)</label>
                                <textarea className="form-control" name="indicaciones" rows="3" value={formData.indicaciones} onChange={handleChange}></textarea>
                            </div>
                        </div>

                        {/* Botones de prueba para simular éxito o error según la pauta */}
                        <div className="d-flex gap-3 justify-content-end">
                            <button type="button" className="btn btn-outline-danger fw-bold px-4" onClick={simularPagoError}>
                                Simular Pago con Error ❌
                            </button>
                            <button type="button" className="btn btn-success fw-bold px-4" onClick={simularPagoExitoso}>
                                Pagar ahora $28.775 💳
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}