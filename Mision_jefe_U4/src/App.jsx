// App.jsx — Componente raíz: cabecera, formulario de inscripción y lista de luchadores.
import FormularioInscripcion from "./components/FormularioInscripcion.jsx";
import ListaLuchadores from "./components/ListaLuchadores.jsx";

export default function App() {
  return (
    <>
      <header className="cabecera">
        <h1>FEPP</h1>
        <p className="subtitulo">Federación de Profesionales de Peleas de Pulgares</p>
      </header>

      <main className="contenido">
        <section className="tarjeta" aria-labelledby="titulo-inscripcion">
          <h2 id="titulo-inscripcion">Inscríbete en la federación</h2>
          <FormularioInscripcion />
        </section>

        <section className="tarjeta" aria-labelledby="titulo-luchadores">
          <h2 id="titulo-luchadores">Luchadores federados</h2>
          <ListaLuchadores />
        </section>
      </main>
    </>
  );
}
