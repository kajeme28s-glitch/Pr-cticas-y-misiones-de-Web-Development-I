// Mensaje — Muestra UNO de estos estados: cargando, error o resultado.
// Renderizado condicional con if antes del return (cada caso devuelve algo distinto).
import { nombrePais } from "../paises.js";

export default function Mensaje({ cargando, error, persona }) {
  if (cargando) {
    return <p className="mensaje">Consultando la bola de cristal...</p>;
  }

  if (error) {
    return <p className="mensaje error">No he podido adivinar tu edad: {error}</p>;
  }

  if (!persona) {
    return null; // todavía no se ha buscado nada: no se pinta nada
  }

  if (persona.edad === null) {
    return (
      <p className="mensaje resultado">
        No conozco a nadie llamado {persona.nombre}. Prueba con otro nombre o país.
      </p>
    );
  }

  return (
    <p className="mensaje resultado">
      {persona.nombre}, creo que tienes {persona.edad} años
      {persona.pais && ` (en ${nombrePais(persona.pais)})`}.
    </p>
  );
}
