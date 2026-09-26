# 🧠 Red Neuronal de Contexto — GEMINI.md

Este archivo representa el nodo central de nuestra "Red Neuronal de Contexto", un sistema diseñado para optimizar el uso de tokens, agilizar el procesamiento y garantizar la máxima eficiencia en el desarrollo de este repositorio.

## 📌 Principios de Eficiencia de Tokens
1. **Compresión de Contexto**: Utilizar siempre respuestas de alto impacto (concisas y técnicas). Evitar preámbulos y explicaciones redundantes.
2. **Navegación Quirúrgica**: Leer únicamente las líneas de interés en archivos grandes (`start_line`/`end_line`) y buscar mediante patrones específicos (`grep_search`/`glob`).
3. **Persistencia Estructurada**: Delegar el conocimiento a archivos de memoria en lugar de repetir contexto en la conversación.

## 🗺️ Mapa de la Red
Nuestra red neuronal de contexto se distribuye en los siguientes nodos de información:
- **`GEMINI.md`**: El nodo central (este archivo). Contiene la arquitectura del repositorio y guías generales de calidad.
- **[`AGENTS.md`](./AGENTS.md)**: El nodo de identidades. Define los roles y responsabilidades de los agentes virtuales que operan en este espacio.
- **[`SKILLS.md`](./SKILLS.md)**: El nodo de procedimientos. Contiene las habilidades y flujos de trabajo reutilizables (ej. inicialización de misiones).

---

## 🛠️ Estructura del Repositorio
```text
C:\Users\kajem\Desktop\WebDevelopmentMissions\Pr-cticas-y-misiones-de-Web-Development-I
├── GEMINI.md          # Nodo Central de la Red Neuronal
├── AGENTS.md          # Nodo de Roles de Agentes
├── SKILLS.md          # Nodo de Habilidades Reutilizables
├── Mision_1\          # Proyecto: El Oráculo de los Números
│   ├── index.html
│   ├── styles.css
│   └── app.js
└── Mision_2\          # Proyecto: Panel de Control Dinámico
    ├── index.html
    ├── styles.css
    └── app.js
```

---

## 🎨 Convenciones de Desarrollo
- **HTML Semántico**: Uso estricto de elementos estructurales (`<main>`, `<section>`, `<article>`, `<header>`, `<footer>`).
- **CSS Responsivo**: Preferir CSS puro con variables CSS (`:root`), Flexbox, Grid y tipografía fluida (`clamp()`).
- **JS Modular & Limpio**: Lógica desacoplada del DOM, uso adecuado de `DOMContentLoaded` y persistencia en `localStorage` para interactividad realista.
