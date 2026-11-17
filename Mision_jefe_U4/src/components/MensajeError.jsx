// MensajeError — Mensaje de error de un campo, accesible.
// role="alert": el lector de pantalla lo anuncia en cuanto aparece.
// El id lo enlaza con su input mediante aria-describedby.
export default function MensajeError({ id, error }) {
  if (!error) return null;
  return (
    <p id={id} role="alert" className="error-campo">
      {error.message}
    </p>
  );
}
