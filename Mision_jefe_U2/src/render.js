// render.js — Se encarga SOLO de escribir en la página.

const mensaje = document.getElementById("mensaje");

export function mostrarCarga() {
  mensaje.className = "mensaje";
  mensaje.textContent = "Consultando la bola de cristal...";
}

export function mostrarError(texto) {
  mensaje.className = "mensaje error";
  mensaje.textContent = texto;
}

export function mostrarEdad(persona) {
  mensaje.className = "mensaje resultado";

  if (persona.edad === null) {
    mensaje.textContent = `No conozco a nadie llamado ${persona.nombre}. Prueba con otro nombre.`;
  } else {
    mensaje.textContent = `${persona.nombre}, creo que tienes ${persona.edad} años.`;
  }
}
