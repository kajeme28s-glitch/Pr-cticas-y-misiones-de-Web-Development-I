// data.js — Se encarga SOLO de preparar los datos (sin fetch y sin DOM).

// Convierte la respuesta de la API en un objeto más claro.
// ?. y ?? evitan errores si el dato no viene.
export function crearPersona(datos) {
  const nombre = datos?.name ?? "";
  return {
    nombre: nombre.charAt(0).toUpperCase() + nombre.slice(1), // "lucia" → "Lucia"
    edad: datos?.age ?? null, // null = la API no conoce ese nombre
  };
}

// MAP: convierte la caché { lucia: {...}, pedro: {...} } en una lista de personas
export function crearHistorial(cache) {
  return Object.values(cache).map(crearPersona);
}

// FILTER: se queda solo con las personas que tienen edad
export function conEdad(personas) {
  return personas.filter((persona) => persona.edad !== null);
}

// REDUCE: suma todas las edades y calcula la media
export function edadMedia(personas) {
  if (personas.length === 0) {
    return 0; // evita dividir entre 0
  }
  const suma = personas.reduce((total, persona) => total + persona.edad, 0);
  return Math.round(suma / personas.length);
}
