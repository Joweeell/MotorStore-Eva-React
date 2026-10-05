export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
        <div className="container text-center">
            <h5 className="mb-3">Mantente en contacto - Suscríbete</h5>
            <form id="form-newsletter" className="d-flex justify-content-center gap-2 mb-4" noValidate>
                <input type="email" className="form-control w-auto" placeholder="Ingresa tu email" required />
                <button type="submit" className="btn btn-primary">Suscríbete</button>
            </form>
            <hr className="border-secondary" />
            <p className="mt-3 mb-0">© 2026, <strong>MotorStore</strong> · Servicios personalizados · Santiago, Chile · Desarrollado por Estudiantes del <strong>Duoc UC</strong></p>
        </div>
    </footer>
  );
}