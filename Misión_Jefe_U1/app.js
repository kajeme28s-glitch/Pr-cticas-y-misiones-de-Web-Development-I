// Sube la torre. Fase 2: movimiento horizontal.
// Este archivo se carga con "defer": cuando se ejecuta, el HTML ya existe.

const zonaJuego = document.querySelector(".zona-juego");
const personaje = document.querySelector(".personaje");

const velocidad = 240; // píxeles por segundo

// clientWidth es el ancho interior de la zona de juego, sin contar el borde.
// El personaje puede llegar como máximo hasta ese ancho menos el suyo propio.
const limiteDerecho = zonaJuego.clientWidth - personaje.offsetWidth;

// Posición horizontal del personaje: su distancia en píxeles al lado izquierdo
// interior de la zona de juego. Empieza donde lo colocó el CSS.
let posicionX = personaje.offsetLeft;

// Qué flechas están pulsadas ahora mismo.
const teclasPulsadas = {
    ArrowLeft: false,
    ArrowRight: false
};

let tiempoAnterior = performance.now();

window.addEventListener("keydown", function (evento) {
    if (evento.key === "ArrowLeft" || evento.key === "ArrowRight") {
        evento.preventDefault(); // que la flecha no desplace la página
        teclasPulsadas[evento.key] = true;
    }
});

window.addEventListener("keyup", function (evento) {
    if (evento.key === "ArrowLeft" || evento.key === "ArrowRight") {
        teclasPulsadas[evento.key] = false;
    }
});

// Si la ventana pierde el foco, no llegará el keyup: soltamos las teclas a mano.
window.addEventListener("blur", function () {
    teclasPulsadas.ArrowLeft = false;
    teclasPulsadas.ArrowRight = false;
});

function actualizar(tiempoActual) {
    // Segundos que han pasado desde el fotograma anterior.
    const segundos = (tiempoActual - tiempoAnterior) / 1000;
    tiempoAnterior = tiempoActual;

    // -1 izquierda, 1 derecha, 0 quieto (ninguna tecla o las dos a la vez).
    let direccion = 0;
    if (teclasPulsadas.ArrowLeft) {
        direccion = direccion - 1;
    }
    if (teclasPulsadas.ArrowRight) {
        direccion = direccion + 1;
    }

    posicionX = posicionX + direccion * velocidad * segundos;

    // No dejar que salga por los laterales.
    if (posicionX < 0) {
        posicionX = 0;
    }
    if (posicionX > limiteDerecho) {
        posicionX = limiteDerecho;
    }

    personaje.style.left = posicionX + "px";

    requestAnimationFrame(actualizar);
}

requestAnimationFrame(actualizar);
