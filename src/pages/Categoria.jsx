import { Link, useParams } from 'react-router-dom';

const categorias = [
    { slug: 'cascos', nombre: 'Cascos' },
    { slug: 'chaquetas', nombre: 'Chaquetas' },
    { slug: 'guantes', nombre: 'Guantes' },
    { slug: 'accesorios', nombre: 'Accesorios' },
];

// Datos de ejemplo: reemplázalos por tus productos reales
const productos = [
    { id: 1, categoria: 'cascos', nombre: 'Casco Integral Modelo 1', precio: 120000 },
    { id: 2, categoria: 'cascos', nombre: 'Casco Integral Modelo 2', precio: 135000 },
    { id: 3, categoria: 'cascos', nombre: 'Casco Modular Modelo 3', precio: 150000 },
    { id: 4, categoria: 'cascos', nombre: 'Casco Abierto Modelo 4', precio: 90000 },
    { id: 5, categoria: 'chaquetas', nombre: 'Chaqueta Cuero Racing', precio: 180000 },
    { id: 6, categoria: 'chaquetas', nombre: 'Chaqueta Textil Touring', precio: 130000 },
    { id: 7, categoria: 'guantes', nombre: 'Guantes Carbono Pro', precio: 45000 },
    { id: 8, categoria: 'guantes', nombre: 'Guantes Invierno', precio: 35000 },
    { id: 9, categoria: 'accesorios', nombre: 'Candado Disco', precio: 25000 },
    { id: 10, categoria: 'accesorios', nombre: 'Soporte para Celular', precio: 15000 },
];

export default function Categoria() {
    const { slug } = useParams();
    const activa = categorias.find((c) => c.slug === slug) || categorias[0];
    const filtrados = productos.filter((p) => p.categoria === activa.slug);

    return (
        <main className="py-5">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="fw-bold text-uppercase">Categorías de MotorStore</h2>
                    <p className="text-muted">Filtra nuestros productos según lo que necesites para tu moto.</p>
                </div>

                {/* Botones de categorías */}
                <div className="d-flex justify-content-center gap-4 mb-5 flex-wrap">
                    {categorias.map((cat) => (
                        <Link
                            key={cat.slug}
                            to={`/categoria/${cat.slug}`}
                            className={`card text-center shadow-sm p-3 text-decoration-none ${
                                cat.slug === activa.slug ? 'border-primary border-2' : 'border-0'
                            }`}
                            style={{ width: '150px' }}
                        >
                            <div
                                className="bg-secondary mb-2 rounded d-flex align-items-center justify-content-center text-white"
                                style={{ height: '80px' }}
                            >
                                🏍️
                            </div>
                            <h6 className="mb-0 fw-bold">{cat.nombre}</h6>
                        </Link>
                    ))}
                </div>

                <h3 className="fw-bold mb-4 border-bottom pb-2">Resultados para: {activa.nombre}</h3>

                {filtrados.length === 0 ? (
                    <p className="text-muted">No hay productos en esta categoría todavía.</p>
                ) : (
                    <div className="row g-4">
                        {filtrados.map((p) => (
                            <div className="col-6 col-md-3" key={p.id}>
                                <div className="card h-100 shadow-sm border-0">
                                    <img
                                        src={`https://placehold.co/400x300/343a40/FFF?text=${encodeURIComponent(p.nombre)}`}
                                        className="card-img-top"
                                        alt={p.nombre}
                                    />
                                    <div className="card-body text-center d-flex flex-column">
                                        <h5 className="card-title fw-bold">{p.nombre}</h5>
                                        <p className="text-info fw-bold fs-5 mt-auto mb-3">
                                            ${p.precio.toLocaleString('es-CL')}
                                        </p>
                                        <button className="btn btn-dark w-100 fw-bold">🛒 Añadir</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}