// FormularioInscripcion — Alta de un luchador con React Hook Form + Zod.
// RHF recoge los valores (inputs NO controlados); Zod decide si son válidos.
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { esquemaInscripcion, CATEGORIAS, NOMBRE_CATEGORIA, categoriaSegunPulgar } from "../schemas.js";
import { crearLuchador } from "../services/luchadores.js";
import MensajeError from "./MensajeError.jsx";

export default function FormularioInscripcion() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
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

  // Mutación: el POST al API con sus estados (isPending / isError / isSuccess)
  const mutacion = useMutation({
    mutationFn: crearLuchador,
    onSuccess: () => {
      reset(); // limpia el formulario
      // La lista queda obsoleta: Query la vuelve a pedir y aparece el nuevo luchador.
      // Al devolver la promesa, la mutación sigue «pendiente» hasta que la lista se ha refrescado.
      return queryClient.invalidateQueries({ queryKey: ["luchadores"] });
    },
  });

  // Solo se ejecuta si Zod da el visto bueno. datos ya viene convertido (edad es número)
  function onSubmit(datos) {
    mutacion.mutate(datos); // dispara el POST validado
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
      <button type="submit" disabled={mutacion.isPending}>
        {mutacion.isPending ? "Inscribiendo…" : "Inscribirme"}
      </button>

      {/* Resultado del envío: el éxito se anuncia con role="status" y el error con role="alert" */}
      {mutacion.isSuccess && (
        <p role="status" className="mensaje exito">
          ¡{mutacion.data.alias} ya es luchador federado! 👍
        </p>
      )}
      {mutacion.isError && (
        <p role="alert" className="mensaje error">
          No se pudo completar la inscripción: {mutacion.error.message}
        </p>
      )}
    </form>
  );
}
