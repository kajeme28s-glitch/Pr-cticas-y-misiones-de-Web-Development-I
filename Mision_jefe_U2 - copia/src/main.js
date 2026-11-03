// main.js — Conecta todo: escucha el formulario y llama a los demás módulos.

import { pedirEdad } from "./api.js";
import { leerCache } from "./cache.js";
import { crearPersona, crearHistorial, conEdad, edadMedia } from "./data.js";
import { mostrarCarga, mostrarError, mostrarEdad, mostrarHistorial } from "./render.js";

const formulario = document.getElementById("formulario");
const campoNombre = document.getElementById("nombre");
const boton = document.getElementById("boton");

// Lee lo guardado, lo transforma (map, filter, reduce) y lo pinta
function actualizarHistorial() {
  const personas = conEdad(crearHistorial(leerCache()));
  mostrarHistorial(personas, edadMedia(personas));
}

// "submit" salta al pulsar el botón Enter o la tecla Enter
formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault(); // evita que la página se recargue

  const nombre = campoNombre.value.trim();
  if (nombre === "") {
    mostrarError("Escribe un nombre primero.");
    return;
  }

  mostrarCarga();
  boton.disabled = true;

  try {
    const datos = await pedirEdad(nombre);
    mostrarEdad(crearPersona(datos));
    actualizarHistorial();
  } catch (error) {
    mostrarError(`No he podido adivinar tu edad: ${error.message}`);
  } finally {
    boton.disabled = false;
  }
});

// Al abrir la página, se muestra el historial guardado
actualizarHistorial();
