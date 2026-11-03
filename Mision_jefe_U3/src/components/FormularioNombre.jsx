// FormularioNombre — Campo de nombre, selector de país y botón Enter.
// (En la U2 esto era el addEventListener("submit") de main.js)
import { useState } from "react";
import { PAISES } from "../paises.js";

export default function FormularioNombre({ onBuscar, cargando }) {
  // Estado LOCAL: solo este componente necesita saber lo que se está escribiendo
  const [nombre, setNombre] = useState("");
  const [pais, setPais] = useState("");

  function manejarEnvio(evento) {
    evento.preventDefault(); // evita que la página se recargue
    onBuscar(nombre.trim(), pais); // avisa al padre (App): "levantar el estado"
  }

  return (
    <form className="formulario" onSubmit={manejarEnvio}>
      <label htmlFor="nombre">Introduce tu nombre</label>
      <input
        id="nombre"
        type="text"
        placeholder="Por ejemplo: Lucía"
        autoComplete="off"
        value={nombre}
        onChange={(evento) => setNombre(evento.target.value)}
      />

      <label htmlFor="pais">País</label>
      <div className="fila">
        <select id="pais" value={pais} onChange={(evento) => setPais(evento.target.value)}>
          {/* Lista con key estable: el código del país no cambia nunca */}
          {PAISES.map((opcion) => (
            <option key={opcion.codigo} value={opcion.codigo}>
              {opcion.nombre}
            </option>
          ))}
        </select>
        {/* Desactivado si el nombre está vacío o si ya estamos consultando (derivado, sin estado extra) */}
        <button type="submit" disabled={cargando || nombre.trim() === ""}>
          Enter
        </button>
      </div>
    </form>
  );
}
