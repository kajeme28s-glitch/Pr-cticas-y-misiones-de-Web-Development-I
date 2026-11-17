// ListaLuchadores — Lee los luchadores del API con useQuery (TanStack Query v5), con filtro por categoría.
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { obtenerLuchadores } from "../services/luchadores.js";
import { CATEGORIAS, NOMBRE_CATEGORIA } from "../schemas.js";

export default function ListaLuchadores() {
  const [categoria, setCategoria] = useState(""); // "" = todas las categorías

  const { data, isPending, isError, error, isFetching, refetch } = useQuery({
    // La clave incluye el filtro: cada categoría tiene su propia entrada en la caché.
    // Al cambiar la clave, Query pide los datos solo; al invalidar ["luchadores"] se refrescan todas.
    queryKey: ["luchadores", categoria || "todas"],
    queryFn: () => obtenerLuchadores(categoria),
    retry: 1, // por defecto reintenta 3 veces (≈7 s en «Cargando…»); con 1 el error llega antes
  });

  return (
    <>
      <label htmlFor="filtro">Filtrar por categoría</label>
      <select id="filtro" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
        <option value="">Todas</option>
        {CATEGORIAS.map((c) => (
          <option key={c} value={c}>
            {NOMBRE_CATEGORIA[c]}
          </option>
        ))}
      </select>

      <Resultado
        data={data}
        isPending={isPending}
        isError={isError}
        error={error}
        isFetching={isFetching}
        refetch={refetch}
      />
    </>
  );
}

// Pinta el estado de la query: cargando / error / lista (renderizado condicional con if)
function Resultado({ data, isPending, isError, error, isFetching, refetch }) {
  // 1) Primera carga de esta clave: aún no hay datos
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
      <p role="status" className="actualizando">
        {isFetching ? "Actualizando…" : `${luchadores.length} luchador${luchadores.length === 1 ? "" : "es"}`}
      </p>

      {/* ★ BONUS: aviso de los registros que Zod ha rechazado */}
      {descartados > 0 && (
        <p className="mensaje aviso">
          ⚠ {descartados === 1 ? "1 registro descartado" : `${descartados} registros descartados`} por datos
          corruptos del API (detalle en la consola).
        </p>
      )}

      {luchadores.length === 0 ? (
        <p className="mensaje">No hay luchadores en esta categoría.</p>
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
