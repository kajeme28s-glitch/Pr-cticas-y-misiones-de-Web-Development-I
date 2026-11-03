// useLocalStorage — Custom hook reutilizable (BONUS).
// Funciona igual que useState, pero el valor se guarda en localStorage
// y sigue ahí al recargar la página. Sirve para cualquier dato, no solo para esta app.
// (Sustituye a cache.js de la U2)
import { useState, useEffect } from "react";

export function useLocalStorage(clave, valorInicial) {
  // Valor inicial: lo guardado en localStorage, o valorInicial si no hay nada.
  // Se pasa una función a useState para que solo lea localStorage en el primer render.
  const [valor, setValor] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(clave)) ?? valorInicial;
    } catch {
      return valorInicial; // si lo guardado está corrupto, empezamos de cero
    }
  });

  // EFECTO: cada vez que cambia el valor, se sincroniza con localStorage (sistema externo)
  useEffect(() => {
    localStorage.setItem(clave, JSON.stringify(valor));
  }, [clave, valor]);

  return [valor, setValor]; // se usa igual que useState
}
