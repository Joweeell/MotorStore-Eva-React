import { Link } from 'react-router-dom';

export default function Ofertas() {
    return (
        <main className="py-5">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="display-5 fw-bold text-uppercase text-danger">🔥 Ofertas Especiales</h2>
                    <p className="text-muted">Aprovecha estos descuentos exclusivos en MotorStore por tiempo limitado.</p>
                </div>

                <div className="row g-4">
                    {[1, 2, 3, 4].map(num => (
                        <div className="col-md-3" key={num}>
                            <div className="card h-100 shadow-sm border-danger">
                                {/* Etiqueta flotante de descuento */}
                                <div className="position-absolute top-0 end-0 bg-danger text-white px-2 py-1 m-2 rounded fw-bold z-1">
                                    -20%
                                </div>
                                <img src={`https://placehold.co/400x300/dc3545/FFF?text=Oferta+Moto+${num}`} className="card-img-top" alt={`Oferta ${num}`} />
                                <div className="card-body text-center d-flex flex-column">
                                    <h5 className="card-title fw-bold">Equipamiento Deportivo {num}</h5>
                                    <div className="mt-auto mb-3">
                                        <span className="text-muted text-decoration-line-through me-2">$200.000</span>
                                        <span className="text-danger fw-bold fs-5">$160.000</span>
                                    </div>
                                    <button className="btn btn-outline-danger w-100 fw-bold">🛒 Añadir Oferta</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}