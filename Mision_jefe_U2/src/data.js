// data.js — Se encarga SOLO de preparar los datos (sin fetch y sin DOM).

// Convierte la respuesta de la API en un objeto más claro.
// ?? da un valor por defecto si el dato no viene.
export function crearPersona(datos) {
  const nombre = datos.name ?? "";
  return {
    nombre: nombre.charAt(0).toUpperCase() + nombre.slice(1), // "lucia" → "Lucia"
    edad: datos.age ?? null, // null = la API no conoce ese nombre
  };
}
