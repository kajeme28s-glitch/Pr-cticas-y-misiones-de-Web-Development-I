// Sube la torre. Fase 3: salto, gravedad y aterrizaje.
// Este archivo se carga con "defer": cuando se ejecuta, el HTML ya existe.

// COORDENADAS: todo se mide en píxeles desde la esquina inferior izquierda
// INTERIOR de la zona de juego (sin el borde). X crece hacia la derecha e
// Y hacia arriba, igual que "left" y "bottom" en el CSS.

const zonaJuego = document.querySelector(".zona-juego");
const personaje = document.querySelector(".personaje");

// El suelo y las plataformas: el personaje puede apoyarse en todos ellos.
const superficies = document.querySelectorAll(".suelo, .plataforma");

const velocidad = 240;    // movimiento lateral, píxeles por segundo
const gravedad = 1800;    // cuánto aumenta la velocidad de caída cada segundo
const fuerzaSalto = 640;  // velocidad hacia arriba al empezar un salto
const tiempoMaximo = 0.05; // segundos máximos aplicados en una actualización

// clientWidth y clientHeight miden el interior, sin contar el borde.
const altoInterior = zonaJuego.clientHeight;
const limiteDerecho = zonaJuego.clientWidth - personaje.offsetWidth;
const limiteSuperior = altoInterior - personaje.offsetHeight;

// Posición de los pies del personaje. Empieza donde lo colocó el CSS.
// offsetTop se mide desde arriba, así que le damos la vuelta para medir desde abajo.
let posicionX = personaje.offsetLeft;
let posicionY = altoInterior - personaje.offsetTop - personaje.offsetHeight;

let velocidadY = 0;   // positiva: sube; negativa: cae
let enSuelo = false;  // se decide en cada fotograma al comprobar el aterrizaje

// Qué flechas laterales están pulsadas ahora mismo.
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

    if (evento.key === "ArrowUp") {
        evento.preventDefault();
        // evento.repeat es true cuando la tecla se mantiene pulsada:
        // así, mantener ↑ solo produce un salto.
        if (enSuelo && !evento.repeat) {
            velocidadY = fuerzaSalto;
            enSuelo = false;
        }
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

// Altura de la cara superior de un elemento, medida desde abajo.
function alturaSuperficie(elemento) {
    return altoInterior - elemento.offsetTop;
}

// ¿El personaje está a la misma altura horizontal que el elemento?
function coincideHorizontalmente(elemento) {
    const izquierda = elemento.offsetLeft;
    const derecha = elemento.offsetLeft + elemento.offsetWidth;
    return posicionX + personaje.offsetWidth > izquierda && posicionX < derecha;
}

function moverEnHorizontal(segundos) {
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
}

function moverEnVertical(segundos) {
    // La gravedad cambia la velocidad; la velocidad cambia la posición.
    const velocidadAntes = velocidadY;
    velocidadY = velocidadY - gravedad * segundos;

    // Usamos la velocidad media del intervalo: así el salto alcanza la misma
    // altura tanto si la pantalla va a 30, 60 o 144 fotogramas por segundo.
    const piesAntes = posicionY;
    posicionY = posicionY + (velocidadAntes + velocidadY) / 2 * segundos;

    // Aterrizaje: solo cayendo, coincidiendo en horizontal y si los pies
    // estaban por encima de la superficie y ahora están a su altura o por debajo.
    enSuelo = false;
    if (velocidadY <= 0) {
        for (const superficie of superficies) {
            const altura = alturaSuperficie(superficie);
            if (coincideHorizontalmente(superficie) && piesAntes >= altura && posicionY <= altura) {
                posicionY = altura;
                velocidadY = 0;
                enSuelo = true;
            }
        }
    }

    // No dejar que la cabeza salga por arriba.
    if (posicionY > limiteSuperior) {
        posicionY = limiteSuperior;
        velocidadY = 0;
    }
}

function actualizar(tiempoActual) {
    // Segundos desde el fotograma anterior.
    let segundos = (tiempoActual - tiempoAnterior) / 1000;
    tiempoAnterior = tiempoActual;

    // Tope: tras una pausa larga (pestaña oculta, DevTools...) no queremos
    // aplicar de golpe un salto de tiempo enorme.
    if (segundos > tiempoMaximo) {
        segundos = tiempoMaximo;
    }
    // El primer fotograma puede traer una hora algo anterior a performance.now().
    if (segundos < 0) {
        segundos = 0;
    }

    moverEnHorizontal(segundos);
    moverEnVertical(segundos);

    personaje.style.left = posicionX + "px";
    personaje.style.bottom = posicionY + "px";

    requestAnimationFrame(actualizar);
}

requestAnimationFrame(actualizar);
