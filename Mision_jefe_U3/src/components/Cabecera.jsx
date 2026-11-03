// Cabecera — Título y subtítulo de la app. Solo muestra lo que recibe por props.
export default function Cabecera({ titulo, subtitulo }) {
  return (
    <header>
      <h1>{titulo}</h1>
      <p className="subtitulo">{subtitulo}</p>
    </header>
  );
}
