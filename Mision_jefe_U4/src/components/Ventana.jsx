// Ventana — Marco con estilo Windows 2000: barra de título azul y cuerpo gris con relieve.
// Es un componente "contenedor": lo de dentro llega por children.
export default function Ventana({ id, titulo, children }) {
  return (
    <section className="ventana" aria-labelledby={id}>
      <div className="barra-titulo">
        <h2 id={id}>{titulo}</h2>
        {/* Botones de adorno: no hacen nada, por eso se ocultan al lector de pantalla */}
        <div className="botones-ventana" aria-hidden="true">
          <span>_</span>
          <span>□</span>
          <span>×</span>
        </div>
      </div>
      <div className="cuerpo-ventana">{children}</div>
    </section>
  );
}
