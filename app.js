//pegando os elementos do HTML para usar no JS
const noteInput = document.getElementById("note");
const saveBtn = document.getElementById("saveBtn");
const notesList = document.getElementById("notesList");

// service worker
self.addEventListener("install", () => {
  console.log("Service Worker instalado");
});

function loadNotes() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notesList.innerHTML = "";
  notes.forEach((note, index) => {
    const li = document.createElement("li");
    li.textContent = note;

   //botao de excluir
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.style.float = "right";
    delBtn.onclick = () => deleteNote(index);

    li.appendChild(delBtn);
    notesList.appendChild(li);
  });
}

//salvar nota
saveBtn.addEventListener("click", () => {
  const note = noteInput.value.trim();
  if (note) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
    noteInput.value = "";
    loadNotes();
  }
});

//excluir nota
function deleteNote(index) {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  loadNotes();
}

loadNotes();
