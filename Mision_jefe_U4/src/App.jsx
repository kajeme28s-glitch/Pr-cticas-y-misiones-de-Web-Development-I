// App.jsx — Componente raíz: el "escritorio" con dos ventanas (inscripción y luchadores).
import Ventana from "./components/Ventana.jsx";
import FormularioInscripcion from "./components/FormularioInscripcion.jsx";
import ListaLuchadores from "./components/ListaLuchadores.jsx";

export default function App() {
  return (
    <>
      <header className="escritorio">
        <h1>FEPP</h1>
        <p className="subtitulo">Federación de Profesionales de Peleas de Pulgares</p>
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
