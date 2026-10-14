// Vista provisoria para las secciones del admin que aún no se desarrollan
export default function AdminPendiente({ titulo }) {
  return (
    <div className="text-center py-5">
      <h3 className="fw-bold">{titulo}</h3>
      <p className="text-muted mb-0">Esta vista se está desarrollando.</p>
    </div>
  );
}