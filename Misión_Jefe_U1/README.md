# CLAIM the TOWER

Misión M1 · El Despertar del DOM — Web Development I.

## Cómo probarlo

1. Abre `index.html` en un navegador.
2. Usa `←` y `→` para moverte.
3. Usa `↑` para saltar entre plataformas.
4. Llega a la puerta brillante para superar el nivel.
5. Pulsa «Reiniciar» para volver a empezar.
6. Pulsa «Modo oscuro» para cambiar el tema de la página.

## Estructura del proyecto

- `index.html`: estructura de la página, escenario, controles y botones.
- `styles.css`: colores, distribución responsive, plataformas y efectos visuales.
- `app.js`: teclado, movimiento, salto, gravedad, colisiones, victoria, reinicio y tema oscuro.
- `assets/escenario.svg`: ilustración pixel art del fondo de la torre.
- `assets/caballero.svg`: sprite pixel art del personaje.
- `assets/puerta.svg`: dibujo pixel art de la puerta de la meta.

## Tecnologías

HTML, CSS y JavaScript puro. No se utilizan frameworks ni librerías externas.

## Uso de IA

> Practicamente el 90% del trabajo es con IA, yo no he escrito demasiado código, solo en las fases de corrección y dudas sobre funciones que no entendia o que no me gustaba su implementación.

>He revisado linea por linea y he dejado los comentarios ya que tambíen ayudan ami comprensión.No hice algo complicado porque estoy probando un entorno nuevo juntando Claude y Codex para la realización y no es que me sobren los tokkens.

- Herramienta o herramientas utilizadas: `Claude CLI con Opu5.5(y 11 Skill) y Codex con Astra6 `.
- Partes en las que ayudó la IA: `Todo`.

//ACLARACIÓN: Los prompts importantes son generados por el apartado Work de la Red que tengo montada entre los agentes de un mismo proyecto. Destacaría:

//PROMPT de explicación y paso de fuentes.

- Prompt real relevante 1: `Vale vamos a empezar con el proyecto , tenemos el temario del tema 1 y la guia de la mision que crearemos la carpeta de Misión_Jefe_U1 para hacerla. quiero codigo sencillo y facil de entender además de un apartado grafico bonito utilizando las skills de claude. lo primero quiero que me expliques los puntos obligatorios del proyecto y los opcionales`. 

//PROMPTs de desarrollo inicial de idea del proyecto.

- Prompt real relevante 2: `vale me gestaría hacer un juego un subir la torre , algo sencillo movimiento con las flechas del teclado se salta y va e lado a lado`.
- Prompt real relevante 3: `vale me gusta , vamos haciendo losprompts para el flujo con claude y codex`


- Qué comprobé personalmente: `Comprobé cada linea a mano con asistencia por voz para intentar entender todo y que estuviese a mi alcance`.
- Qué escribí o cambié manualmente: `Realmente cambié varias funciones y parametros,porque elimine todos los apartados de lectura para ciegos. Ya que la ia añadió todo un sistema en HTML y CSS para permitir lectura de pantalla`.

## Comprobaciones antes de entregar

- [ ] He probado movimiento, salto, aterrizaje y llegada a la puerta.
- [ ] He probado el reinicio durante la partida y después de ganar.
- [ ] He probado el modo claro y el modo oscuro.
- [ ] No hay errores en la consola.
- [ ] No queda código de depuración sin utilizar.
- [ ] Hay al menos cinco commits dentro de la entrega.
- [ ] El repositorio es público y la URL se ha entregado en la Arena.
