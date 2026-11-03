// data.js — (igual que en la U2) Prepara los datos (sin fetch y sin DOM).

// Clave de la caché: el nombre en minúsculas + el país ("Lucía", "ES" → "lucía|ES")
export function crearClave(nombre, pais) {
  return `${nombre.toLowerCase()}|${pais}`;
}

// Convierte la respuesta de la API en un objeto más claro.
// ?. y ?? evitan errores si el dato no viene.
export function crearPersona(datos) {
  const nombre = datos?.name ?? "";
  return {
    nombre: nombre.charAt(0).toUpperCase() + nombre.slice(1), // "lucia" → "Lucia"
    edad: datos?.age ?? null, // null = la API no conoce ese nombre
    pais: datos?.country_id ?? "", // NUEVO en U3: "" = todo el mundo
  };
}

// MAP: convierte la caché { "lucía|ES": {...}, ... } en una lista de personas
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
