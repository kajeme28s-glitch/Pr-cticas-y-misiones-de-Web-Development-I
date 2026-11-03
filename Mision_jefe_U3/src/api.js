// api.js — (igual que en la U2) Consigue los datos: de la caché o de la API.

import { crearClave, leerCache, guardarEnCache } from "./cache.js";

const URL_API = "https://api.agify.io";

export async function pedirEdad(nombre, pais) {
  const clave = crearClave(nombre, pais);

  // 1. Si ya lo preguntamos antes, lo devolvemos sin llamar a la API
  const guardado = leerCache()[clave];
  if (guardado) {
    return guardado;
  }

  // 2. Si no, lo pedimos a la API (NUEVO en U3: country_id si se eligió país)
  let url = `${URL_API}?name=${encodeURIComponent(nombre)}`;
  if (pais !== "") {
    url += `&country_id=${pais}`;
  }
  const respuesta = await fetch(url);

  // fetch no da error si el servidor responde 404, 429, 500...
  // por eso comprobamos response.ok nosotros
  if (respuesta.status === 429) {
    throw new Error("el adivino está cansado (límite de consultas de la API). Espera un rato o prueba un nombre que ya hayas consultado.");
  }
  if (!respuesta.ok) {
    throw new Error(`la API respondió con error ${respuesta.status}`);
  }

  const datos = await respuesta.json(); // { name: "lucía", age: 52, count: 123, country_id: "ES" }
  guardarEnCache(clave, datos);
  return datos;
}
