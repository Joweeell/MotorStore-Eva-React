
export default function Blogs() {
  const noticias = [
    {
      id: 1,
      imagen: '/GSXR1000.jpg',
      alt: 'Motocicleta Suzuki GSX-R1000',
      titulo: 'Caso Curioso #1: La evolución de las superbikes modernas',
      descripcion:
        'Conoce cómo la aerodinámica inspirada en MotoGP ha transformado las motocicletas deportivas de calle en auténticas máquinas de precisión sobre el asfalto chileno.',
      enlace: '/detalle-blog-1',
    },
    {
      id: 2,
      imagen: '/zx.jpg',
      alt: 'Motocicleta Kawasaki Ninja',
      titulo: 'Caso Curioso #2: Claves para el mantenimiento de la transmisión',
      descripcion:
        'Aprende consejos de limpieza, tensión y lubricación de la cadena para alargar la vida útil del kit de arrastre y mantener una conducción segura.',
      enlace: '/detalle-blog-2',
    },
  ];

  return (
    <main className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-uppercase">
            Noticias Importantes
          </h2>
          <p className="text-muted">
            Descubre datos curiosos, guías de conducción y novedades del mundo
            de las motocicletas.
          </p>
        </div>

        {noticias.map((noticia) => (
          <article
            className="card mb-4 shadow-sm border-secondary bg-light text-dark overflow-hidden"
            key={noticia.id}
          >
            <div className="row g-0 align-items-center">
              <div className="col-md-5">
                <img
                  src={noticia.imagen}
                  alt={noticia.alt}
                  className="img-fluid w-100"
                  style={{ height: '300px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/m1.jpg';
                  }}
                />
              </div>

              <div className="col-md-7">
                <div className="card-body p-4">
                  <h3 className="card-title fw-bold">{noticia.titulo}</h3>
                  <p className="card-text text-secondary">
                    {noticia.descripcion}
                  </p>
                  <a
                    href={noticia.enlace}
                    className="btn btn-outline-dark fw-bold text-uppercase"
                  >
                    Ver caso
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
