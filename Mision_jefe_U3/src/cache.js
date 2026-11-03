// cache.js — (igual que en la U2) Guarda y lee respuestas en localStorage.
// Así no repetimos peticiones (la API gratuita limita las consultas).
// Se guarda un objeto así: { "lucía|ES": { name, age, count, country_id }, "pedro|": {...} }

const CLAVE = "adivino-cache";

// NUEVO en U3: la clave incluye el país ("Lucía" en España ≠ "Lucía" en México)
export function crearClave(nombre, pais) {
  return `${nombre.toLowerCase()}|${pais}`;
}

export function leerCache() {
  // try/catch: si lo guardado está corrupto, JSON.parse lanzaría error
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) ?? {};
  } catch {
    return {};
  }
}

export function guardarEnCache(clave, datos) {
  const cache = leerCache();
  cache[clave] = datos;
  // localStorage solo guarda texto → JSON.stringify
  localStorage.setItem(CLAVE, JSON.stringify(cache));
}
