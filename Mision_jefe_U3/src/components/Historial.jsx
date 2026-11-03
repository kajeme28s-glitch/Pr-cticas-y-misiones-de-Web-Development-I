// Historial — Lista de nombres consultados y su edad media.
import ItemHistorial from "./ItemHistorial.jsx";

export default function Historial({ personas, media }) {
  if (personas.length === 0) {
    return null; // sin datos, la sección no aparece
  }

  return (
    <section className="historial">
      <h2>Nombres consultados</h2>
      <ul>
        {/* key estable: nombre + país es único en el historial (no usamos el índice) */}
        {personas.map((persona) => (
          <ItemHistorial
            key={`${persona.nombre}-${persona.pais}`}
            nombre={persona.nombre}
            pais={persona.pais}
            edad={persona.edad}
          />
        ))}
      </ul>
      <p className="media">Edad media: {media} años</p>
    </section>
  );
}
