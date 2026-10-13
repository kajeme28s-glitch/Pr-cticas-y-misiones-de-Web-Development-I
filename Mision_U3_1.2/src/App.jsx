import Esclusa from "./components/Esclusa.jsx";
import Ranking from "./components/Ranking.jsx";

const RANKING = [
    { id: "a1", jugador: "NOVA", puntos: 9800 },
    { id: "b2", jugador: "PIXEL", puntos: 8650 },
    { id: "c3", jugador: "KIRA", puntos: 7400 },
    { id: "d4", jugador: "BYTE", puntos: 5200 },
];

export default function App() {
    return (
        <main>
            <section>
                <h1>1.2 Estado de la esclusa</h1>
                <Esclusa abierta={true} avisos={2} />
                <Esclusa abierta={false} avisos={0} />
                <Esclusa abierta={true} avisos={0} />
            </section>

            <section>
                <h1>1.3 Ranking de la sala arcade</h1>
                <Ranking jugadores={RANKING} />
            </section>
        </main>
    );
}
