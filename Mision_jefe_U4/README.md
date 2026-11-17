# M4 · Full Contact Forms — FEPP: Federación de Profesionales de Peleas de Pulgares

App en React 19 para inscribirse en la (muy seria) **Federación de Profesionales de Peleas de Pulgares**. Tiene un formulario de alta validado con **React Hook Form + Zod** y una lista de luchadores federados que se lee y se actualiza con **TanStack Query v5** contra un API REST local (**json-server**).

> «Valida o muere.»

## Qué hace

- **Formulario de inscripción**: alias, email, edad, mano de combate, longitud del pulgar, categoría y aceptación del reglamento.
- Valida en el cliente con un esquema Zod con mensajes propios en español. Incluye un **refinamiento** del reglamento: la categoría tiene que corresponder a lo que mide tu pulgar (mosca < 5,5 cm · ligero 5,5–6,5 cm · pesado > 6,5 cm).
- **Pista en vivo**: al escribir la longitud del pulgar te dice qué categoría te corresponde.
- Al enviar hace un **POST** al API. Mientras se envía, el botón muestra «Inscribiendo…». Si va bien, el formulario se limpia, aparece «¡X ya es luchador federado!» y **la lista se actualiza sola** (invalidación de la query). Si falla, se muestra el error.
- **Lista de luchadores** dentro de un **desplegable** que se abre con una flecha ▶ (animación suave). Tiene estados de cargando, error (con botón «Reintentar»), vacío y «Actualizando…», y un **filtro por categoría**.
- **Estética retro de Windows 2000**: ventanas grises con relieve 3D, barra de título azul, botones que se hunden al pulsar y una foto de paisaje como fondo de escritorio.
- **★ Bonus**: la respuesta del API también se valida con Zod (`safeParse`). En `db.json` hay un luchador corrupto a propósito y la app lo **descarta y avisa** en lugar de romperse.

## Cómo arrancarlo

Hacen falta **dos terminales** dentro de la carpeta `Mision_jefe_U4`:

```bash
npm install

# Terminal 1 — el API (json-server en http://localhost:3001)
npm run api

# Terminal 2 — la app (Vite)
npm run dev
```

Abrir la URL que muestra Vite (normalmente http://localhost:5173).

La URL del API se lee de la variable de entorno `VITE_API_URL`. Para cambiarla, copia `.env.example` como `.env`. Si no hay `.env`, se usa `http://localhost:3001`.

## Estructura

```
Mision_jefe_U4/
├── db.json                         "base de datos" de json-server (con 1 registro corrupto para el bonus)
├── .env.example                    VITE_API_URL de ejemplo
└── src/
    ├── main.jsx                    QueryClientProvider + DevTools de TanStack Query
    ├── App.jsx                     cabecera y las dos tarjetas (formulario y lista)
    ├── schemas.js                  esquemas Zod: ÚNICA fuente de verdad (formulario y API)
    ├── services/
    │   └── luchadores.js           capa de servicios: fetch, response.ok y safeParse
    ├── components/
    │   ├── Ventana.jsx                 marco de ventana Windows 2000 (barra de título + children)
    │   ├── FormularioInscripcion.jsx   React Hook Form + zodResolver + useMutation
    │   ├── MensajeError.jsx            error de un campo con role="alert"
    │   └── ListaLuchadores.jsx         desplegable + useQuery con filtro por categoría
    ├── assets/
    │   └── fondo.jpg                   foto de fondo del escritorio
    └── index.css                   estilos retro Windows 2000
```

```
App
├── Ventana «Inscripción en la federación»
│   └── FormularioInscripcion
│       └── MensajeError (uno por campo)
└── Ventana «Luchadores federados»
    └── ListaLuchadores (botón ▶ + panel desplegable)
        └── Resultado (cargando / error / lista)
```

## Decisiones técnicas

### React Hook Form (formulario no controlado)

- `register` conecta cada input. Los valores no pasan por `useState`, así que no hay un re-render por cada tecla.
- `handleSubmit(onSubmit)` solo llama a `onSubmit` si Zod da el visto bueno.
- `noValidate` en el `<form>`: los mensajes los decide Zod, no el navegador.
- `register("longitudPulgar", { deps: ["categoria"] })`: el error de categoría depende del pulgar. Sin `deps`, al corregir el pulgar el error no desaparecería hasta el siguiente envío.
- `watch("longitudPulgar")` solo se usa para la pista de la categoría (es un valor derivado, sin estado extra).
- `reset()` limpia el formulario después de una inscripción correcta.

### Zod (única fuente de verdad)

En `schemas.js` hay **un** esquema base, `esquemaLuchador`, que describe a un luchador tal y como lo guarda la federación. El del formulario **se deriva de él**:

| | `esquemaLuchador` (API) | `esquemaInscripcion` (formulario) |
|---|---|---|
| `id` | `z.string()` | se quita con `.omit` |
| `edad`, `longitudPulgar` | `z.number()` | `z.coerce.number()` (los inputs dan strings) |
| mensajes | los de Zod | propios, en español (`{ error: "…" }` de Zod 4) |
| extra | — | `aceptaReglamento: z.literal(true)` y `.refine` categoría ↔ pulgar |

- `alias` usa `.trim()`, `.min`, `.max` y un `.regex` (solo letras, números y espacios), y es el mismo en los dos esquemas.
- El `.refine` cruza dos campos y pone el error en `path: ["categoria"]`.
- Como avisa el temario, el `.refine` no se ejecuta si falla un `z.enum` o un `z.literal`: hasta que no se acepta el reglamento y se elige categoría, el error de categoría y pulgar no aparece.

### TanStack Query (claves e invalidación)

| Qué | Cómo |
|---|---|
| Lista | `useQuery({ queryKey: ["luchadores", categoria \|\| "todas"], queryFn })` |
| Alta | `useMutation({ mutationFn: crearLuchador, onSuccess })` |
| Invalidación | `invalidateQueries({ queryKey: ["luchadores"] })` |

- La clave **incluye el filtro**: cada categoría tiene su propia entrada en la caché y, al cambiar el filtro, Query pide los datos solo.
- Se invalida con el **prefijo** `["luchadores"]`, así que se marcan como obsoletas *todas* las variantes («todas», «ligero», «pesado»…). La que está en pantalla se vuelve a pedir enseguida y las demás cuando se vuelvan a mirar.
- En `onSuccess` se **devuelve** la promesa de `invalidateQueries`: la mutación sigue en `isPending` («Inscribiendo…») hasta que la lista ya está refrescada.
- `retry: 1`: por defecto Query reintenta 3 veces (unos 7 s en «Cargando…»). Con el API apagado, el error llega antes.
- Las peticiones están en `services/luchadores.js`: los componentes no saben nada de `fetch`. Siempre se comprueba `response.ok` y un fallo de red se convierte en un mensaje claro («¿Está arrancado json-server?»).

### Experiencia de usuario y accesibilidad

- Cada campo tiene su `<label htmlFor>`, y los radios van en `<fieldset>` + `<legend>`.
- Los campos con error llevan `aria-invalid="true"` y `aria-describedby="error-campo"`, que apunta a su mensaje.
- Los mensajes de error usan `role="alert"` (componente `MensajeError`). El éxito usa `role="status"`.
- Al enviar con errores, **el foco va al primer campo con error** (`shouldFocusError` de RHF).
- El botón **siempre se puede pulsar**: solo se desactiva mientras se envía (evita el doble clic sin dejar al usuario de teclado atascado).
- `autoComplete` en alias (`nickname`) y email, e `inputMode` numérico en edad y pulgar.
- Prueba de fuego hecha: el formulario se completa entero solo con el teclado (Tab sigue el orden visual y Enter envía).

### Desplegable de la lista y estilo retro

- El desplegable es un `<button>` con `aria-expanded` (el lector de pantalla anuncia «contraído» o «expandido») y `aria-controls`, que apunta al panel. El estado `abierta` es un `useState` y se cambia con la función actualizadora `setAbierta((anterior) => !anterior)`.
- **Animación suave sin JavaScript**: el panel es una rejilla CSS cuya única fila pasa de `grid-template-rows: 0fr` (altura 0) a `1fr` (altura real) con una `transition`. La flecha ▶ gira 90° con `transform: rotate(90deg)` cuando `aria-expanded="true"`.
- Mientras está cerrado, el panel lleva `inert`: lo de dentro (el filtro, el botón «Reintentar») no recibe el foco con Tab ni lo lee el lector de pantalla.
- Si el sistema pide reducir el movimiento (`prefers-reduced-motion`), se quitan las animaciones.
- `Ventana` es un componente contenedor: recibe el título por props y el contenido por `children`. Los botones `_ □ ×` de la barra son de adorno, así que llevan `aria-hidden="true"` y no son botones de verdad.
- El relieve 3D de Windows 2000 se consigue con bordes de dos colores (claro arriba a la izquierda, oscuro abajo a la derecha) y `box-shadow: inset`. Los campos y la lista llevan los colores al revés para que parezcan hundidos.

### ★ Bonus: validar la respuesta del API

En `obtenerLuchadores()` cada elemento que devuelve el API pasa por `esquemaLuchador.safeParse()`:

```js
const resultados = json.map((dato) => esquemaLuchador.safeParse(dato));
const luchadores = resultados.filter((r) => r.success).map((r) => r.data);
const corruptos = resultados.filter((r) => !r.success);
```

- Los válidos se pintan. Los corruptos se descartan, se avisa en la lista («⚠ 1 registro descartado por datos corruptos») y el detalle sale en la consola con `z.prettifyError`.
- **Demostración**: `db.json` trae a «Registro Corrupto» con `email: "esto-no-es-un-email"`, `edad: "veinte"` y `categoria: "gigante"`. No aparece en la lista y en la consola salen los 3 fallos.
- He elegido `safeParse` por elemento y no `parse` de toda la lista: un solo dato roto no tumba la pantalla entera.
- La respuesta del POST también se valida (`esquemaLuchador.parse`). Si el API devolviera algo raro, la mutación pasaría a `isError`.

### Seguridad

- La validación del cliente es **UX, no seguridad**: cualquiera puede hacer el `fetch` a mano desde DevTools. Un servidor real tendría que revalidar con el mismo esquema Zod.
- No hay secretos en el cliente. `VITE_API_URL` solo lleva una URL pública.
- El email no se muestra en la lista pública (solo alias, categoría, pulgar, mano y edad).
- React escapa todo lo que se interpola en JSX, y no se usa `dangerouslySetInnerHTML`.

## Cómo probarlo

1. Pulsa «Inscribirme» con todo vacío → salen los 7 errores y el foco va al alias.
2. Pon 7 cm de pulgar y categoría «Peso mosca» → error del reglamento. Cambia el pulgar a 5 cm → el error desaparece (`deps`).
3. Abre la lista con la flecha «▶ Ver luchadores». Rellena todo bien y envía → «Inscribiendo…», mensaje de éxito, el formulario se limpia, el contador sube y el luchador aparece en la lista.
4. Cambia el filtro de categoría → cada categoría se pide una vez y queda en la caché (se ve en las DevTools, el icono flotante de abajo).
5. Apaga `npm run api` y envía o recarga → mensaje de error y botón «Reintentar».
6. Bonus: mira el aviso naranja de la lista y la consola del navegador.

## Uso de IA

He utilizado **Claude Opus 5.5**.

- Le pasé los PDFs de la U3 y la U4 y le pedí que revisara mis misiones anteriores para seguir el mismo estilo. Me explicó qué había que hacer y qué decisiones tenía que tomar.
- Las decisiones las tomé yo: usar **json-server** en vez de JSONPlaceholder, el tema (**federación de peleas de pulgares**) y añadir el **filtro por categoría**.
- El código, las pruebas en navegador y los commits de cada paso los hizo la IA.
- Prompts principales:
  - «necesito hacer la tarea M4 de web […] explicame que hay que hacer, que decisiones he de tomar, vamos a hacer lo mas sencillo posible que cumpla todos los puntos y paso a paso»
  - «json-server, si - El torneo como tema, no. Prefiero la federacion de profesionales de pelas de pulgares - Hacemos el filtro extra, si - Podemos empezar»
  - «hazlo tu, pideme permisos»

## Autopsia

**¿Qué API uso?**
La primera opción era JSONPlaceholder, la API de los ejercicios del tema. El problema es que acepta el POST pero no guarda nada, así que después de invalidar la lista el luchador nuevo no aparecería y no se vería si la invalidación funciona. Elegí **json-server**: es un API REST de verdad en local, guarda los datos en `db.json` y me deja meter un registro corrupto para el bonus. A cambio, hacen falta dos terminales.

**¿Qué tema le doy al formulario?**
En vez de un registro típico elegí una **federación de peleas de pulgares**. Además de ser original, me da una regla de negocio con sentido para el `.refine` (la categoría depende de lo que mide el pulgar) y una categoría para filtrar la lista, que es lo que hace que la `queryKey` lleve un parámetro.
