// App.jsx — Componente raíz. De momento solo la cabecera (paso 1).

// URL base del API: se lee de .env (VITE_API_URL); si no hay .env, se usa la de json-server en local
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export default function App() {
  return (
    <main className="tarjeta">
      <h1>FEPP</h1>
      <p className="subtitulo">Federación de Profesionales de Peleas de Pulgares</p>
      <p>API en: {API_URL}</p>
    </main>
  );
}
