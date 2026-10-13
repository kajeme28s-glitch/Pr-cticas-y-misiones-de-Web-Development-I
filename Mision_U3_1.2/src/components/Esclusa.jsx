// 1.2 — Props: abierta (booleana) y avisos (número)
export default function Esclusa({ abierta, avisos }) {
    return (
        <article className="esclusa">
            {/* TODO 1: con un TERNARIO sobre "abierta", pinta
                «🟢 Esclusa abierta» o «🔴 Esclusa cerrada» */}

            {/* TODO 2: con &&, pinta «⚠️ Tienes N avisos pendientes»
                SOLO si hay avisos. Revisa el «Esperado» del enunciado. */}
        </article>
    );
}
