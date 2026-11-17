// schemas.js — Esquemas Zod: la ÚNICA fuente de verdad de la validación.
// El mismo esquema valida el formulario (cliente) y lo que responde el API (★ bonus).
import { z } from "zod";

export const MANOS = ["diestra", "zurda"];
export const CATEGORIAS = ["mosca", "ligero", "pesado"];

export const NOMBRE_CATEGORIA = {
  mosca: "Peso mosca",
  ligero: "Peso ligero",
  pesado: "Peso pesado",
};

// Reglamento de la federación: la categoría depende de lo que mide el pulgar (cm)
export function categoriaSegunPulgar(cm) {
  if (cm < 5.5) return "mosca";
  if (cm <= 6.5) return "ligero";
  return "pesado";
}

// Alias: lo comparten el formulario y el API
const alias = z
  .string()
  .trim()
  .min(3, { error: "El alias necesita al menos 3 caracteres" })
  .max(20, { error: "El alias no puede pasar de 20 caracteres" })
  .regex(/^[\p{L}\d ]+$/u, { error: "Solo letras, números y espacios" });

// 1) Un luchador tal y como lo guarda la federación (números ya convertidos)
export const esquemaLuchador = z.object({
  id: z.string(),
  alias,
  email: z.email(),
  edad: z.number().int().min(16),
  mano: z.enum(MANOS),
  longitudPulgar: z.number().min(3).max(10),
  categoria: z.enum(CATEGORIAS),
});

// 2) El formulario de inscripción: mismas reglas, con mensajes propios y
//    z.coerce porque los inputs HTML siempre dan strings
export const esquemaInscripcion = esquemaLuchador
  .omit({ id: true })
  .extend({
    email: z.email({ error: "Email no válido" }),
    edad: z.coerce
      .number({ error: "La edad tiene que ser un número" })
      .int({ error: "La edad tiene que ser un número entero" })
      .min(16, { error: "Indica tu edad (la federación solo admite mayores de 16)" })
      .max(99, { error: "Máximo 99 años" }),
    mano: z.enum(MANOS, { error: "Elige con qué mano peleas" }),
    longitudPulgar: z.coerce
      .number({ error: "La longitud tiene que ser un número" })
      .min(3, { error: "Indica la longitud de tu pulgar (entre 3 y 10 cm)" })
      .max(10, { error: "Ningún pulgar humano mide más de 10 cm" }),
    categoria: z.enum(CATEGORIAS, { error: "Elige una categoría" }),
    aceptaReglamento: z.literal(true, { error: "Debes aceptar el reglamento de la federación" }),
  })
  // Refinamiento que cruza dos campos: la categoría tiene que encajar con el pulgar
  .refine((datos) => categoriaSegunPulgar(datos.longitudPulgar) === datos.categoria, {
    error: "Tu pulgar no entra en esta categoría (mosca < 5,5 cm · ligero 5,5–6,5 cm · pesado > 6,5 cm)",
    path: ["categoria"], // el error se pinta junto al campo categoría
  });
