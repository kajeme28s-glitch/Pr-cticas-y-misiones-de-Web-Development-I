// services/luchadores.js — Capa de servicios: todas las peticiones al API de la federación.
// Los componentes no saben nada de fetch: solo usan useQuery / useMutation con estas funciones.

// URL base del API: se lee de .env (VITE_API_URL); si no hay .env, se usa la de json-server en local
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

// fetch solo falla si no hay red; un 404 o un 500 hay que comprobarlo con response.ok
async function pedir(url, opciones) {
  let respuesta;
  try {
    respuesta = await fetch(url, opciones);
  } catch {
    throw new Error("No se puede contactar con la federación. ¿Está arrancado json-server (npm run api)?");
  }
  if (!respuesta.ok) {
    throw new Error(`La federación respondió con error ${respuesta.status}`);
  }
  return respuesta.json();
}

// GET: lista de luchadores
export async function obtenerLuchadores() {
  return pedir(`${API_URL}/luchadores`);
}
