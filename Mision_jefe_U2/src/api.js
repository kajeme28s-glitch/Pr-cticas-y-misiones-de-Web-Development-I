// api.js — Se encarga SOLO de pedir los datos a la API.

const URL_API = "https://api.agify.io";

export async function pedirEdad(nombre) {
  const respuesta = await fetch(`${URL_API}?name=${encodeURIComponent(nombre)}`);

  // fetch no da error si el servidor responde 404, 429, 500...
  // por eso comprobamos response.ok nosotros
  if (!respuesta.ok) {
    throw new Error(`la API respondió con error ${respuesta.status}`);
  }

  return respuesta.json(); // { name: "lucia", age: 52, count: 12345 }
}
