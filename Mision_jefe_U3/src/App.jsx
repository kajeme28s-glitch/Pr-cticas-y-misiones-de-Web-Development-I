// App.jsx — Componente raíz. Guarda el estado y se lo pasa a los hijos por props.
// (Sustituye a main.js + render.js de la U2)
import { useState, useEffect } from "react";
import Cabecera from "./components/Cabecera.jsx";
import FormularioNombre from "./components/FormularioNombre.jsx";
import Mensaje from "./components/Mensaje.jsx";
import Historial from "./components/Historial.jsx";
import { pedirEdad } from "./api.js";
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

  // --- EFECTO: cuando cambia la búsqueda, pide la edad (caché o API) ---
  useEffect(() => {
    if (busqueda === null) return; // todavía no se ha buscado nada

    const controlador = new AbortController();

    async function consultar() {
      try {
        const nuevosDatos = await pedirEdad(busqueda.nombre, busqueda.pais, controlador.signal);
        const claveNueva = crearClave(busqueda.nombre, busqueda.pais);
        // Actualización inmutable con función actualizadora: copia de lo anterior + dato nuevo
        setCache((anterior) => ({ ...anterior, [claveNueva]: nuevosDatos }));
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message); // cancelar no es un error: solo mostramos los fallos reales
        }
      }
    }
    consultar();

    // LIMPIEZA: si cambia la búsqueda antes de que llegue la respuesta, se cancela la vieja
    return () => controlador.abort();
  }, [busqueda]); // se ejecuta cada vez que el usuario hace una búsqueda nueva

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
