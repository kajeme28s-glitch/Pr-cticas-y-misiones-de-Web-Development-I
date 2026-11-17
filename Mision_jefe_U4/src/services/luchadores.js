// services/luchadores.js — Capa de servicios: todas las peticiones al API de la federación.
// Los componentes no saben nada de fetch: solo usan useQuery / useMutation con estas funciones.

import { z } from "zod";
import { esquemaLuchador } from "../schemas.js";

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

// GET: lista de luchadores.
// ★ BONUS: no nos fiamos del API. Cada luchador pasa por el MISMO esquema Zod (safeParse):
// los válidos se muestran y los corruptos se descartan y se avisa, en vez de romper la pantalla.
export async function obtenerLuchadores() {
  const json = await pedir(`${API_URL}/luchadores`);
  if (!Array.isArray(json)) {
    throw new Error("El API no devolvió una lista de luchadores");
  }

  const resultados = json.map((dato) => esquemaLuchador.safeParse(dato)); // { success, data, error }
  const luchadores = resultados.filter((r) => r.success).map((r) => r.data);
  const corruptos = resultados.filter((r) => !r.success);

  corruptos.forEach((r, i) => console.warn(`Registro corrupto descartado (${i + 1}):\n${z.prettifyError(r.error)}`));

  return { luchadores, descartados: corruptos.length };
}

// POST: inscribe un luchador nuevo. aceptaReglamento solo sirve en el formulario: no se guarda
export async function crearLuchador(datos) {
  const { aceptaReglamento, ...luchador } = datos;
  const json = await pedir(`${API_URL}/luchadores`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(luchador), // para enviar JSON, el cuerpo es un string
  });
  // También validamos lo que el API dice que ha guardado (parse lanza error si no cuadra → isError)
  return esquemaLuchador.parse(json);
}
