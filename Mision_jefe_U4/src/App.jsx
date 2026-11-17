// App.jsx — Componente raíz: el "escritorio" con dos ventanas (inscripción y luchadores).
import Ventana from "./components/Ventana.jsx";
import FormularioInscripcion from "./components/FormularioInscripcion.jsx";
import ListaLuchadores from "./components/ListaLuchadores.jsx";

export default function App() {
  return (
    <>
      <header className="escritorio">
        <h1>AFCPPCPEEM <span aria-hidden="true">🤙</span></h1>
        <p className="subtitulo">Asociación Federación de Clasificación en Peleas de Pulgares Club Profesional Española Europea Mundial</p>
      </header>

      <main className="contenido">
        <Ventana id="titulo-inscripcion" titulo="Inscripción en la federación">
          <FormularioInscripcion />
        </Ventana>

        <Ventana id="titulo-luchadores" titulo="Luchadores federados">
          <ListaLuchadores />
        </Ventana>
      </main>
    </>
  );
}
