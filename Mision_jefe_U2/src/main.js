// main.js — Conecta todo: escucha el formulario y llama a los demás módulos.

import { pedirEdad } from "./api.js";
import { crearPersona } from "./data.js";
import { mostrarCarga, mostrarError, mostrarEdad } from "./render.js";

const formulario = document.getElementById("formulario");
const campoNombre = document.getElementById("nombre");
const boton = document.getElementById("boton");

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
  } catch (error) {
    mostrarError(`No he podido adivinar tu edad: ${error.message}`);
  } finally {
    boton.disabled = false;
  }
});
