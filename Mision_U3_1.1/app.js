// app.js — Misión 3: una función reutilizable con parámetros

const contenedor = document.getElementById("contenedor");

// Función reutilizable: recibe nombre, rol y especie (por defecto "humana").
function FichaTripulante(nombre, rol, especie = "humana") {
    const div = document.createElement("div");

    const h2 = document.createElement("h2");
    h2.textContent = nombre;

    const p = document.createElement("p");
    p.textContent = rol;

    const p2 = document.createElement("p");
    p2.textContent = especie;

    div.append(h2, p, p2);
    contenedor.append(div);
}

// La misma función, llamada 3 veces con valores distintos
FichaTripulante("Julian", "Jefe");
FichaTripulante("Alberto", "Becario");
FichaTripulante("Ana", "Ingeniera");
