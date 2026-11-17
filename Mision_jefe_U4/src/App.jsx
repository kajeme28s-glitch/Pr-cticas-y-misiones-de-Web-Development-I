// App.jsx — Componente raíz: cabecera + formulario de inscripción.
import FormularioInscripcion from "./components/FormularioInscripcion.jsx";

export default function App() {
  return (
    <>
      <header className="cabecera">
        <h1>FEPP</h1>
        <p className="subtitulo">Federación de Profesionales de Peleas de Pulgares</p>
      </header>

      <main className="contenido">
        <section className="tarjeta">
          <h2>Inscríbete en la federación</h2>
          <FormularioInscripcion />
        </section>
      </main>
    </>
  );
}
