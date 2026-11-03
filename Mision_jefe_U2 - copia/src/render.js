// render.js — Se encarga SOLO de escribir en la página.

const mensaje = document.getElementById("mensaje");
const historial = document.getElementById("historial");
const listaHistorial = document.getElementById("lista-historial");
const textoMedia = document.getElementById("media");

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

export function mostrarHistorial(personas, media) {
  // Si no hay nadie, se oculta la sección
  historial.hidden = personas.length === 0;

  // MAP: cada persona se convierte en un <li>
  const elementos = personas.map((persona) => {
    const li = document.createElement("li");
    li.textContent = `${persona.nombre}: ${persona.edad} años`;
    return li;
  });

  listaHistorial.replaceChildren(...elementos); // borra la lista anterior y pone la nueva
  textoMedia.textContent = `Edad media: ${media} años`;
}
