// cache.js — Se encarga SOLO de guardar y leer respuestas en localStorage.
// Así no repetimos peticiones (la API gratuita limita las consultas).
// Se guarda un objeto así: { "lucia": { name, age, count }, "pedro": {...} }

const CLAVE = "adivino-cache";

export function leerCache() {
  // try/catch: si lo guardado está corrupto, JSON.parse lanzaría error
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) ?? {};
  } catch {
    return {};
  }
}

export function guardarEnCache(nombre, datos) {
  const cache = leerCache();
  cache[nombre] = datos;
  // localStorage solo guarda texto → JSON.stringify
  localStorage.setItem(CLAVE, JSON.stringify(cache));
}
