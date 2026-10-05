import { Link } from 'react-router-dom';

export default function Categoria() {
    return (
        <main className="py-5">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="fw-bold text-uppercase">Categorías de MotorStore</h2>
                    <p className="text-muted">Filtra nuestros productos según lo que necesites para tu moto.</p>
                </div>

                {/* Botones de Categorías Superiores (Referencia Figura 4) */}
                <div className="d-flex justify-content-center gap-4 mb-5 flex-wrap">
                    {['Cascos', 'Chaquetas', 'Guantes', 'Accesorios'].map((cat, index) => (
                        <div key={index} className="card text-center border-0 shadow-sm p-3" style={{ width: '150px', cursor: 'pointer' }}>
                            <div className="bg-secondary mb-2 rounded d-flex align-items-center justify-content-center text-white" style={{ height: '80px' }}>
                                🏍️
                            </div>
                            <h6 className="mb-0 fw-bold">{cat}</h6>
                        </div>
                    ))}
                </div>

                <h3 className="fw-bold mb-4 border-bottom pb-2">Resultados para: Cascos</h3>
                
                {/* Cuadrícula de Productos de la Categoría */}
                <div className="row g-4">
                    {[1, 2, 3, 4].map(num => (
                        <div className="col-md-3" key={num}>
                            <div className="card h-100 shadow-sm border-0">
                                <img src={`https://placehold.co/400x300/343a40/FFF?text=Casco+${num}`} className="card-img-top" alt={`Casco ${num}`} />
                                <div className="card-body text-center d-flex flex-column">
                                    <h5 className="card-title fw-bold">Casco Integral Modelo {num}</h5>
                                    <p className="text-info fw-bold fs-5 mt-auto mb-3">$120.000</p>
                                    <button className="btn btn-dark w-100 fw-bold">🛒 Añadir</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}