# M2 · Async Odyssey

>Web que adivina tu edad a partir de tu nombre usando la API de Agify.

## Qué es

Uso la API de Agify que intenta adivinar la edad de una persona basandose en su nombre, suele devolver una estimación y el numero de persona en la base de datos (esta funcion no la represento).

## Cómo arrancarlo

```bash
npm install
npm run dev
```

Abrir la URL que muestra Vite (normalmente http://localhost:5173).

## Estructura

| Archivo | Responsabilidad |
|---|---|
| `index.html` | Estructura de la página |
| `src/main.js` | Punto de entrada: conecta eventos y coordina el flujo |
| `src/api.js` | Peticiones `fetch` con `async/await` y control de `response.ok` |
| `src/data.js` | Transformación de datos con `map` / `filter` / `reduce` |
| `src/render.js` | Pintado en el DOM: carga, error, vacío y resultados |
| `src/cache.js` | Bonus: caché en `localStorage` |
| `src/style.css` | Estilos |

## Decisiones

Decidí usar esta API porque es una idea muy sincilla y facil de ejecutar, al final queria una conexion a API que me diese un resultado numerico. Agify surgió porque busque APIs graciosas y es la que mas me llamo la atención. No acierta con la edad pero funciona, da muchos problemas con el número de nombres que puedes hacer al día(Estolo descubrí al probar varios nombres y saturar la API donde se reflaja con un aviso).

## Uso de IA

Practimente toda la pagina es con IA, solo he dado ordenes para ir paso a paso y tener elcódigolo mas optimizado posible. En este caso he usado un entrono con Claude y ChatGPT con sus respectivos Agentes. En este caso solo se ha usado Claude ya que no era cecesario un gran procesamiento ya que se dividió de forma simple el codigo.

Prompts importantes :

-vamos a trabajar en  el directorio /***/ haciendo  la carpeta Mision_jefe_U2,te he pasado el temario . antes de emppezar el codigo ,haz la base de los archivos y me explicas que hay que hacer y que pide para que yo desarrolle la idea
-vale muy sencillo usamos la API de Agify API y hacemos una interfaz grafica donde ponga introduce tu nombre y adivino tu edad , con un boton de enter

Hecho por mi mismo :

Las pruebas de funcionamiento de botones, resultados y la escritura del README.

## Autopsia

Las decisiones tomadas han sido pulir el código y hacerlo mas compacto y sencillo, simplificando los errores (ya que desplegaba un mensaje de error distinto por cada caso). La API me daba error 429 al consultar varios nombres. Lo solucioné con una caché en localStorage que guarda los nombres ya consultados. Descarté cambiar de API o poner una clave en el código, porque quedaría expuesta en un repo público.
