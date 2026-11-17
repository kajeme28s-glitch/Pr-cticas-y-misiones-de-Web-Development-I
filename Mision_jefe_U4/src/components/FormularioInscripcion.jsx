// FormularioInscripcion — Alta de un luchador con React Hook Form + Zod.
// RHF recoge los valores (inputs NO controlados); Zod decide si son válidos.
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { esquemaInscripcion, CATEGORIAS, NOMBRE_CATEGORIA } from "../schemas.js";

export default function FormularioInscripcion() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(esquemaInscripcion), // validamos con Zod
    defaultValues: { alias: "", email: "", edad: "", longitudPulgar: "", categoria: "", aceptaReglamento: false },
  });

  // Solo se ejecuta si Zod da el visto bueno. datos ya viene convertido (edad es número)
  async function onSubmit(datos) {
    await new Promise((r) => setTimeout(r, 800)); // simulamos la espera (el API llega en el paso 5)
    console.log("Datos válidos:", datos);
  }

  return (
    <form className="formulario" onSubmit={handleSubmit(onSubmit)} noValidate>
      <label htmlFor="alias">Alias de luchador</label>
      <input id="alias" {...register("alias")} />
      {errors.alias && <p className="error-campo">{errors.alias.message}</p>}

      <label htmlFor="email">Email</label>
      <input id="email" type="email" {...register("email")} />
      {errors.email && <p className="error-campo">{errors.email.message}</p>}

      <label htmlFor="edad">Edad</label>
      <input id="edad" type="number" {...register("edad")} />
      {errors.edad && <p className="error-campo">{errors.edad.message}</p>}

      <fieldset>
        <legend>Mano de combate</legend>
        <label className="opcion">
          <input type="radio" value="diestra" {...register("mano")} /> Diestra
        </label>
        <label className="opcion">
          <input type="radio" value="zurda" {...register("mano")} /> Zurda
        </label>
      </fieldset>
      {errors.mano && <p className="error-campo">{errors.mano.message}</p>}

      <label htmlFor="longitudPulgar">Longitud del pulgar (cm)</label>
      {/* deps: el error de categoría depende del pulgar, así que se revalida al cambiarlo */}
      <input id="longitudPulgar" type="number" step="0.1" {...register("longitudPulgar", { deps: ["categoria"] })} />
      {errors.longitudPulgar && <p className="error-campo">{errors.longitudPulgar.message}</p>}

      <label htmlFor="categoria">Categoría</label>
      <select id="categoria" {...register("categoria")}>
        <option value="">— Elige —</option>
        {CATEGORIAS.map((c) => (
          <option key={c} value={c}>
            {NOMBRE_CATEGORIA[c]}
          </option>
        ))}
      </select>
      {errors.categoria && <p className="error-campo">{errors.categoria.message}</p>}

      <label className="opcion">
        <input type="checkbox" {...register("aceptaReglamento")} /> Acepto el reglamento de la federación
      </label>
      {errors.aceptaReglamento && <p className="error-campo">{errors.aceptaReglamento.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Inscribiendo…" : "Inscribirme"}
      </button>
    </form>
  );
}
