export default function Blogs() {
  return (
    <main className="py-5">
        <div className="container">
            <div className="text-center mb-5">
                <h2 className="display-5 fw-bold text-uppercase">Noticias Importantes</h2>
                <p className="text-muted">Descubre datos curiosos, guías de conducción y novedades del mundo de las motocicletas.</p>
            </div>

            {/* Tarjeta Blog 1 */}
            <div className="card mb-4 shadow-sm border-secondary bg-light text-dark">
                <div className="row g-0 align-items-center">
                    <div className="col-md-5">
                        {/* La ruta de la imagen la arreglarás después */}
                        <img src="img/GSXR1000.jpg" className="img-fluid rounded-start w-100 h-100 object-fit-cover" alt="Caso Curioso 1" style={{ minHeight: '250px' }} />
                    </div>
                    <div className="col-md-7">
                        <div className="card-body p-4">
                            <h3 className="card-title fw-bold">Caso Curioso #1: La evolución de las superbikes modernas</h3>
                            <p className="card-text text-secondary">
                                Conoce cómo la aerodinámica inspirada en MotoGP ha transformado las motocicletas deportivas de calle en auténticos misiles de precisión sobre el asfalto chileno.
                            </p>
                            <a href="/detalle-blog-1" className="btn btn-outline-dark fw-bold text-uppercase">Ver Caso</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tarjeta Blog 2 */}
            <div className="card mb-4 shadow-sm border-secondary bg-light text-dark">
                <div className="row g-0 align-items-center">
                    <div className="col-md-5">
                        <img src="img/kawa.webp" className="img-fluid rounded-start w-100 h-100 object-fit-cover" alt="Caso Curioso 2" style={{ minHeight: '250px' }} />
                    </div>
                    <div className="col-md-7">
                        <div className="card-body p-4">
                            <h3 className="card-title fw-bold">Caso Curioso #2: Claves para el mantenimiento de la transmisión</h3>
                            <p className="card-text text-secondary">
                                Aprende los mejores consejos de limpieza, tensión y lubricación de cadena para alargar la vida útil de tu kit de arrastre y mantener una conducción segura.
                            </p>
                            <a href="/detalle-blog-2" className="btn btn-outline-dark fw-bold text-uppercase">Ver Caso</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </main>
  );
}