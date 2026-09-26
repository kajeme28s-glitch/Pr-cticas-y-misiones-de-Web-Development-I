// app.js — Panel de Control de Misión 2

document.addEventListener("DOMContentLoaded", () => {
    // 1. Mostrar Fecha y Hora en tiempo real
    const dateSpan = document.getElementById("current-date");
    const timeSpan = document.getElementById("current-time");

    function updateDateTime() {
        const now = new Date();
        
        // Formatear Fecha
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateSpan.textContent = now.toLocaleDateString('es-ES', options);
        
        // Formatear Hora
        timeSpan.textContent = now.toLocaleTimeString('es-ES');
    }

    // Actualizar de inmediato y luego cada segundo
    updateDateTime();
    setInterval(updateDateTime, 1000);


    // 2. Saludo Dinámico según la hora del día
    const greetingEl = document.getElementById("greeting");
    
    function setGreeting() {
        const hour = new Date().getHours();
        if (hour >= 6 && hour < 12) {
            greetingEl.textContent = "🌅 ¡Buenos días, Aventurero!";
        } else if (hour >= 12 && hour < 20) {
            greetingEl.textContent = "☀️ ¡Buenas tardes, Aventurero!";
        } else {
            greetingEl.textContent = "🌙 ¡Buenas noches, Aventurero!";
        }
    }
    setGreeting();


    // 3. Sistema de Clics de Energía
    const counterValue = document.getElementById("counter-value");
    const counterBtn = document.getElementById("counter-btn");
    
    // Cargar clics guardados en localStorage (si existen)
    let clics = parseInt(localStorage.getItem("mision2_clics")) || 0;
    counterValue.textContent = clics;

    counterBtn.addEventListener("click", () => {
        clics++;
        counterValue.textContent = clics;
        localStorage.setItem("mision2_clics", clics);
        
        // Pequeño efecto visual al pulsar el botón
        counterValue.style.transform = "scale(1.2)";
        setTimeout(() => {
            counterValue.style.transform = "scale(1)";
        }, 100);
    });


    // 4. Sistema de Notas Rápidas
    const noteInput = document.getElementById("note-input");
    const addNoteBtn = document.getElementById("add-note-btn");
    const notesList = document.getElementById("notes-list");

    // Cargar notas desde localStorage
    let notes = JSON.parse(localStorage.getItem("mision2_notes")) || [
        "¡Estudiar HTML semántico!",
        "Aprender más sobre Flexbox y Grid",
        "Escribir código limpio y ordenado"
    ];

    function saveNotes() {
        localStorage.setItem("mision2_notes", JSON.stringify(notes));
    }

    function renderNotes() {
        notesList.innerHTML = "";
        notes.forEach((noteText, index) => {
            const li = document.createElement("li");
            li.className = "note-item";
            
            const span = document.createElement("span");
            span.textContent = noteText;
            
            const deleteBtn = document.createElement("button");
            deleteBtn.className = "note-delete-btn";
            deleteBtn.innerHTML = "❌";
            deleteBtn.setAttribute("aria-label", `Eliminar nota: ${noteText}`);
            deleteBtn.addEventListener("click", () => {
                deleteNote(index);
            });

            li.appendChild(span);
            li.appendChild(deleteBtn);
            notesList.appendChild(li);
        });
    }

    function addNote() {
        const text = noteInput.value.trim();
        if (text !== "") {
            notes.push(text);
            saveNotes();
            renderNotes();
            noteInput.value = "";
            noteInput.focus();
        }
    }

    function deleteNote(index) {
        notes.splice(index, 1);
        saveNotes();
        renderNotes();
    }

    // Eventos para agregar notas
    addNoteBtn.addEventListener("click", addNote);
    noteInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            addNote();
        }
    });

    // Render inicial de las notas
    renderNotes();
});
