# M3 · Reactor Core — El Adivino de Edades (React)

Web que adivina tu edad a partir de tu nombre (y, si quieres, de tu país) usando la API de [Agify](https://agify.io). Es la app de la M2 · Async Odyssey reconstruida en **React 19**: misma lógica y mismo diseño, pero la interfaz ahora se genera a partir del estado.

## Qué hace

- Escribes un nombre, eliges un país (opcional) y pulsas **Enter**.
- El adivino responde con la edad estimada: «Lucía, creo que tienes 52 años (en España)».
- Mientras espera muestra «Consultando la bola de cristal…»; si algo falla (sin conexión, límite de la API) muestra el error.
- Debajo aparece el **historial** de nombres consultados con su **edad media**.
- Las respuestas se guardan en `localStorage`: repetir un nombre no gasta consultas y el historial sigue al recargar.

## Cómo arrancarlo

```bash
npm install
npm run dev
```

Abrir la URL que muestra Vite (normalmente http://localhost:5173).

## Estructura

```
src/
├── main.jsx                  monta <App /> en el <div id="root"> (con StrictMode)
├── App.jsx                   estado, valores derivados y el useEffect de la petición
├── components/
│   ├── Cabecera.jsx          título y subtítulo (props)
│   ├── FormularioNombre.jsx  input + selector de país controlados; avisa a App con onBuscar
│   ├── Mensaje.jsx           cargando / error / resultado (renderizado condicional)
│   ├── Historial.jsx         lista con key estable + edad media
│   └── ItemHistorial.jsx     una fila del historial
├── hooks/
│   └── useLocalStorage.js    ★ custom hook: como useState pero guardado en localStorage
├── api.js                    fetch a Agify con async/await, response.ok y AbortController
├── data.js                   funciones puras: crearClave, crearPersona, map / filter / reduce
├── paises.js                 lista fija de países y nombrePais()
└── index.css                 estilos (los mismos de la M2 + select)
```

```
App
├── Cabecera
├── FormularioNombre
├── Mensaje
└── Historial
    └── ItemHistorial
```

## Decisiones técnicas

### Estado mínimo y valores derivados

| Dato | ¿Estado? | Dónde |
|---|---|---|
| Lo que se escribe y el país elegido | Sí | `FormularioNombre` (solo lo usa él) |
| Última búsqueda `{ nombre, pais }` | Sí | `App` |
| Respuestas guardadas (`cache`) | Sí | `App`, con `useLocalStorage` |
| Mensaje de error | Sí | `App` |
| Persona a mostrar | No, se deriva de `cache` + búsqueda | — |
| `cargando` | No: hay búsqueda, no hay datos y no hay error | — |
| Historial y edad media | No: `map` + `filter` + `reduce` sobre `cache` | — |

El formulario comunica la búsqueda al padre con la prop `onBuscar` (levantar el estado).

### Efectos

1. **Petición a la API** (`App.jsx`): se ejecuta cuando cambia la búsqueda y no está en la caché. Dependencias `[busqueda, clave, datos, setCache]`. La **limpieza** cancela la petición con `AbortController` si llega una búsqueda nueva antes de la respuesta.
2. **Guardar en localStorage** (`useLocalStorage`): sincroniza el valor con `localStorage` cada vez que cambia. Dependencias `[clave, valor]`.

Los dos sincronizan con un sistema externo (la red y el almacenamiento del navegador). Los cálculos (persona, cargando, media) no usan efectos: se hacen durante el render.

### Listas y condicionales

- Historial: `key={`${nombre}-${pais}`}` (único en la caché). Países: `key={codigo}`. Nunca el índice.
- `Mensaje` usa `if` antes del `return` porque cada estado devuelve algo distinto; `Historial` devuelve `null` si está vacío.

### De la M2 a la M3

| M2 (JavaScript) | M3 (React) |
|---|---|
| `api.js` | Se mantiene: solo `fetch`, ahora con país y `signal` |
| `data.js` | Se mantiene: mismas funciones + `crearClave` y país |
| `cache.js` | Sustituido por el hook `useLocalStorage` |
| `render.js` | Desaparece: lo sustituyen los componentes `Mensaje` e `Historial` |
| `main.js` | Pasa a `App.jsx` (estado + efecto) y `FormularioNombre.jsx` (evento `onSubmit`) |
| `style.css` | Se mantiene como `index.css` |
| — | Nuevo: selector de país (`country_id` de Agify) |

## Uso de IA

Todo hecho con IA excepto la toma de decisiones y en el ReadMe Uso de IA y Autopista. He decidido reutilizar mi ejercicio anterior y trabajar desde el. He dividido el trabajo en 5 pasos que constan de 1,2 encargados de reestructuración de archivos y ajustes de código. El 3,4 encargados de la conexión API y el cambio de cache por local storage. El código ha sido implementado por IA y revisado por mi(arrancar ambas páginas, ver funcionamiento y revisar diferencias de código), para que respete lo aprendido en clase. 
--He utilizado Claude opus 5.5
--Propts:
    -vale ,  tengo que hacer ahora la Mision_jefe_U3 , crea la carpeta y sigue estos pasos respetando el material del tma 3.
    -seguimos con el paso 2,partimos del código del M2 y editamos apartir de ahí añadiendo o eliminamos cosas.

## Autopsia

He tenido dos decisiones importantes, la primera:

 ¿Dónde llamo a la API?
 - mi primera opción era tener la misma que en el M2, con un submit que es mucho mas simple. Por otra parte podia usar el useEffect,que permite cancelar la petición anterio y hacer limpieza, además de  que suma puntos en la entrega, por lo que me decanté por ella.

 La segunda fue algo más distinta:

 ¿Que puedo añadir?
 -Podria tener varias elegir entre varias opciones como añadir un apartado de acierto de la edad y que el usuario diga la edad que tiene o podria hacer que se pueda borrar el historial. Al final me decidí por usar una herramienta de Agify donde puedo seleccionar el pais de origen, además es muy sencillo porque añadimos los apartados de pais y se hace en la misma llamada principal del nombre.
