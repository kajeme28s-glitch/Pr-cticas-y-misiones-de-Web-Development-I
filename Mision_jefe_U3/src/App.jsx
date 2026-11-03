// App.jsx — Componente raíz. Guarda el estado y se lo pasa a los hijos por props.
// (Sustituye a main.js + render.js de la U2)
import { useState } from "react";
import Cabecera from "./components/Cabecera.jsx";
import FormularioNombre from "./components/FormularioNombre.jsx";
import Mensaje from "./components/Mensaje.jsx";
import Historial from "./components/Historial.jsx";
import { crearClave, leerCache } from "./cache.js";
import { crearPersona, crearHistorial, conEdad, edadMedia } from "./data.js";

export default function App() {
  // --- ESTADO (solo lo que no se puede calcular) ---
  const [busqueda, setBusqueda] = useState(null); // { nombre, pais } o null
  const [cache, setCache] = useState(leerCache); // respuestas guardadas (empieza con lo de localStorage)
  const [error, setError] = useState(null); // texto del error o null

  // --- VALORES DERIVADOS (se recalculan en cada render, no son estado) ---
  const clave = busqueda ? crearClave(busqueda.nombre, busqueda.pais) : null;
  const datos = clave ? cache[clave] : undefined;
  const persona = datos ? crearPersona(datos) : null;
  const cargando = busqueda !== null && datos === undefined && error === null;

  const personas = conEdad(crearHistorial(cache)); // map + filter
  const media = edadMedia(personas); // reduce

  // Se la pasamos al formulario: cuando el usuario pulsa Enter, cambia la búsqueda
  function buscar(nombre, pais) {
    setError(null);
    setBusqueda({ nombre, pais });
  }

  return (
    <>
      <main className="tarjeta">
        <Cabecera titulo="El Adivino de Edades" subtitulo="Dime tu nombre y adivinaré tu edad" />
        <FormularioNombre onBuscar={buscar} cargando={cargando} />
        <Mensaje cargando={cargando} error={error} persona={persona} />
        <Historial personas={personas} media={media} />
      </main>
      <footer>
        Predicciones de{" "}
        <a href="https://agify.io" target="_blank" rel="noreferrer">
          Agify.io
        </a>
      </footer>
    </>
  );
}
