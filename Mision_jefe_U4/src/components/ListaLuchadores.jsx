// ListaLuchadores — Lee los luchadores del API con useQuery (TanStack Query v5).
import { useQuery } from "@tanstack/react-query";
import { obtenerLuchadores } from "../services/luchadores.js";
import { NOMBRE_CATEGORIA } from "../schemas.js";

export default function ListaLuchadores() {
  const { data, isPending, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["luchadores"], // identificador de estos datos en la caché
    queryFn: obtenerLuchadores,
    retry: 1, // por defecto reintenta 3 veces (≈7 s en «Cargando…»); con 1 el error llega antes
  });

  // 1) Primera carga: aún no hay datos
  if (isPending) {
    return <p role="status" className="mensaje">Cargando luchadores…</p>;
  }

  // 2) Error: se muestra el mensaje y se ofrece reintentar
  if (isError) {
    return (
      <div role="alert" className="mensaje error">
        <p>{error.message}</p>
        <button type="button" onClick={() => refetch()}>
          Reintentar
        </button>
      </div>
    );
  }

  // 3) Hay datos (ya validados con Zod en la capa de servicios)
  const { luchadores, descartados } = data;

  return (
    <>
      {/* isFetching: refresco en segundo plano (los datos viejos se siguen viendo) */}
      {isFetching && <p role="status" className="actualizando">Actualizando…</p>}

      {/* ★ BONUS: aviso de los registros que Zod ha rechazado */}
      {descartados > 0 && (
        <p className="mensaje aviso">
          ⚠ {descartados === 1 ? "1 registro descartado" : `${descartados} registros descartados`} por datos
          corruptos del API (detalle en la consola).
        </p>
      )}

      {luchadores.length === 0 ? (
        <p className="mensaje">Todavía no hay luchadores inscritos.</p>
      ) : (
        <ul className="lista">
          {luchadores.map((l) => (
            <li key={l.id}>
              <strong>{l.alias}</strong>
              <small>
                {NOMBRE_CATEGORIA[l.categoria]} · {l.longitudPulgar} cm · {l.mano} · {l.edad} años
              </small>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
