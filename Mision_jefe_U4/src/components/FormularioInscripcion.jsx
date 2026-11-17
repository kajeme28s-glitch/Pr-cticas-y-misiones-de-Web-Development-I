// FormularioInscripcion — Alta de un luchador con React Hook Form + Zod.
// RHF recoge los valores (inputs NO controlados); Zod decide si son válidos.
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { esquemaInscripcion, CATEGORIAS, NOMBRE_CATEGORIA, categoriaSegunPulgar } from "../schemas.js";
import MensajeError from "./MensajeError.jsx";

export default function FormularioInscripcion() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(esquemaInscripcion), // validamos con Zod
    defaultValues: { alias: "", email: "", edad: "", longitudPulgar: "", categoria: "", aceptaReglamento: false },
    shouldFocusError: true, // (ya es así por defecto) al enviar con errores, el foco va al primer campo con error
  });

  // Props de accesibilidad de un campo: lo marca como inválido y lo une a su mensaje de error
  function aria(campo) {
    return {
      "aria-invalid": errors[campo] ? true : undefined,
      "aria-describedby": errors[campo] ? `error-${campo}` : undefined,
    };
  }

  // Pista en vivo: qué categoría corresponde al pulgar escrito (valor derivado, sin estado extra)
  const pulgar = Number(watch("longitudPulgar"));
  const sugerencia = pulgar >= 3 && pulgar <= 10 ? NOMBRE_CATEGORIA[categoriaSegunPulgar(pulgar)] : null;

  // Solo se ejecuta si Zod da el visto bueno. datos ya viene convertido (edad es número)
  async function onSubmit(datos) {
    await new Promise((r) => setTimeout(r, 800)); // simulamos la espera (el API llega en el paso 5)
    console.log("Datos válidos:", datos);
  }

  return (
    <form className="formulario" onSubmit={handleSubmit(onSubmit)} noValidate>
      <label htmlFor="alias">Alias de luchador</label>
      <input id="alias" autoComplete="nickname" placeholder="El Pulgar de Hierro" {...register("alias")} {...aria("alias")} />
      <MensajeError id="error-alias" error={errors.alias} />

      <label htmlFor="email">Email</label>
      <input id="email" type="email" autoComplete="email" placeholder="nombre@ejemplo.com" {...register("email")} {...aria("email")} />
      <MensajeError id="error-email" error={errors.email} />

      <label htmlFor="edad">Edad</label>
      <input id="edad" type="number" inputMode="numeric" autoComplete="off" {...register("edad")} {...aria("edad")} />
      <MensajeError id="error-edad" error={errors.edad} />

      {/* Grupo de radios: el fieldset + legend anuncia "Mano de combate" una sola vez para el grupo */}
      <fieldset aria-describedby={errors.mano ? "error-mano" : undefined}>
        <legend>Mano de combate</legend>
        <label className="opcion">
          <input type="radio" value="diestra" {...register("mano")} aria-invalid={errors.mano ? true : undefined} /> Diestra
        </label>
        <label className="opcion">
          <input type="radio" value="zurda" {...register("mano")} aria-invalid={errors.mano ? true : undefined} /> Zurda
        </label>
      </fieldset>
      <MensajeError id="error-mano" error={errors.mano} />

      <label htmlFor="longitudPulgar">Longitud del pulgar (cm)</label>
      {/* deps: el error de categoría depende del pulgar, así que se revalida al cambiarlo */}
      <input
        id="longitudPulgar"
        type="number"
        step="0.1"
        inputMode="decimal"
        {...register("longitudPulgar", { deps: ["categoria"] })}
        aria-invalid={errors.longitudPulgar ? true : undefined}
        aria-describedby={errors.longitudPulgar ? "error-longitudPulgar ayuda-pulgar" : "ayuda-pulgar"}
      />
      <p id="ayuda-pulgar" className="ayuda">
        {sugerencia ? `Con ${pulgar} cm te corresponde: ${sugerencia}` : "Mosca < 5,5 cm · Ligero 5,5–6,5 cm · Pesado > 6,5 cm"}
      </p>
      <MensajeError id="error-longitudPulgar" error={errors.longitudPulgar} />

      <label htmlFor="categoria">Categoría</label>
      <select id="categoria" {...register("categoria")} {...aria("categoria")}>
        <option value="">— Elige —</option>
        {CATEGORIAS.map((c) => (
          <option key={c} value={c}>
            {NOMBRE_CATEGORIA[c]}
          </option>
        ))}
      </select>
      <MensajeError id="error-categoria" error={errors.categoria} />

      <label className="opcion">
        <input type="checkbox" {...register("aceptaReglamento")} {...aria("aceptaReglamento")} /> Acepto el reglamento de la federación
      </label>
      <MensajeError id="error-aceptaReglamento" error={errors.aceptaReglamento} />

      {/* Siempre pulsable: solo se desactiva mientras se envía (evita el doble clic) */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Inscribiendo…" : "Inscribirme"}
      </button>
    </form>
  );
}
