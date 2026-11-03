// api.js — Se encarga SOLO de conseguir los datos (de la caché o de la API).

import { leerCache, guardarEnCache } from "./cache.js";

const URL_API = "https://api.agify.io";

export async function pedirEdad(nombre) {
  const clave = nombre.toLowerCase(); // "Lucía" y "lucía" son la misma consulta

  // 1. Si ya lo preguntamos antes, lo devolvemos sin llamar a la API
  const guardado = leerCache()[clave];
  if (guardado) {
    return guardado;
  }

  // 2. Si no, lo pedimos a la API
  const respuesta = await fetch(`${URL_API}?name=${encodeURIComponent(nombre)}`);

  // fetch no da error si el servidor responde 404, 429, 500...
  // por eso comprobamos response.ok nosotros
  if (respuesta.status === 429) {
    throw new Error("el adivino está cansado (límite de consultas de la API). Espera un rato o prueba un nombre que ya hayas consultado.");
  }
  if (!respuesta.ok) {
    throw new Error(`la API respondió con error ${respuesta.status}`);
  }

  const datos = await respuesta.json(); // { name: "lucia", age: 52, count: 12345 }
  guardarEnCache(clave, datos);
  return datos;
}
