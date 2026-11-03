// ItemHistorial — Una fila del historial: nombre, país y edad.
import { nombrePais } from "../paises.js";

export default function ItemHistorial({ nombre, pais, edad }) {
  return (
    <li>
      <span>
        {nombre} <small>· {nombrePais(pais)}</small>
      </span>
      <strong>{edad} años</strong>
    </li>
  );
}
