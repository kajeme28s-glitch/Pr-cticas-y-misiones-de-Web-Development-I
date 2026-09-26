# ⚡ Nodos de Habilidades — SKILLS.md

Este archivo contiene los procedimientos y flujos de trabajo estandarizados (Skills) que los agentes pueden invocar de manera automática. Al predefinir estos flujos, evitamos tener que redescubrirlos en cada interacción, ahorrando miles de tokens de contexto.

---

## 📋 Catálogo de Habilidades Reutilizables

### ⚡ Habilidad 1: `Bootstrap-New-Mission` (Creación de Proyectos)
Cuando el usuario solicite una nueva misión, el orquestador (`Codex`) debe seguir esta receta exacta para crear la estructura inicial:
1. **Crear Carpeta**: `Mision_N/` (donde N es el número correlativo).
2. **Crear `index.html`**:
   * Idioma en español (`lang="es"`).
   * Carga deferida de scripts (`<script src="app.js" defer></script>`).
   * Enlace a la hoja de estilos (`<link rel="stylesheet" href="styles.css">`).
   * Estructura HTML5 semántica completa (`<header>`, `<main>`, `<footer>`).
3. **Crear `styles.css`**:
   * Reset general de márgenes/paddings y `box-sizing: border-box`.
   * Definición de variables de tema CSS (`:root`).
   * Diseño responsive con Flexbox o CSS Grid.
   * Diseños móviles adaptables.
4. **Crear `app.js`**:
   * Envoltura principal: `document.addEventListener("DOMContentLoaded", () => { ... })`.
   * Lógica interactiva con manejo de eventos limpio y persistencia con `localStorage` si aplica.

---

### 🎨 Habilidad 2: `Clean-Responsive-CSS` (Diseño Moderno)
Guía técnica de estilos responsivos sin dependencias externas:
* **Layout**: Preferir CSS Grid para estructuras bidimensionales (paneles) y Flexbox para componentes alineados (headers, inputs, listas).
* **Fuentes**: Fuentes del sistema seguras y legibles (`system-ui, sans-serif`).
* **Interactividad**: Incluir transiciones suaves (`transition: 0.2s ease`) en botones, enlaces y tarjetas.
* **Componentes**: Diseñar las tarjetas (`.card`) con bordes redondeados y sombras difusas (`box-shadow`) para simular profundidad.

---

### 💻 Habilidad 3: `Interactive-Vanilla-JS` (Interacciones robustas)
Guía de interactividad sin librerías de JS:
* **Selección**: Usar `document.querySelector` o `document.getElementById`.
* **Seguridad del DOM**: Asegurarse de que ningún script corra antes de que el árbol DOM esté completamente cargado.
* **Persistencia**: Usar JSON para serializar colecciones en `localStorage` (ej: `JSON.stringify(lista)` y `JSON.parse(localStorage.getItem(...))`).
* **Limpieza de código**: Cada función debe hacer una única cosa (ej: `renderNotes` vs `addNote`).
