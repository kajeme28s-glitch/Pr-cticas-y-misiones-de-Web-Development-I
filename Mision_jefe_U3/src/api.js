// api.js — (como en la U2) Pide la edad a la API de Agify. Solo fetch + async/await.
// En la U3 ya no mira la caché: de eso se encarga App con el hook useLocalStorage.

const URL_API = "https://api.agify.io";

// signal: permite cancelar la petición desde fuera (lo usa el useEffect de App)
export async function pedirEdad(nombre, pais, signal) {
  let url = `${URL_API}?name=${encodeURIComponent(nombre)}`;
  if (pais !== "") {
    url += `&country_id=${pais}`; // NUEVO en U3: predicción para un país concreto
  }

  const respuesta = await fetch(url, { signal });

  // fetch no da error si el servidor responde 404, 429, 500...
  // por eso comprobamos response.ok nosotros
  if (respuesta.status === 429) {
    throw new Error("el adivino está cansado (límite de consultas de la API). Espera un rato o prueba un nombre que ya hayas consultado.");
  }
  if (!respuesta.ok) {
    throw new Error(`la API respondió con error ${respuesta.status}`);
  }

  return respuesta.json(); // { name: "lucía", age: 52, count: 123, country_id: "ES" }
}
