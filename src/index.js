import css from './style.css';
import "./components/note-list";
import "./components/note-item";
import "./components/loading-indicator";
import "./components/add-note";

document.addEventListener("DOMContentLoaded", () => {
  const noteList = document.querySelector("note-list");
  document.querySelector("add-note").addEventListener("note-added", (event) => {
    noteList.render();
  });
  noteList.addEventListener("note-updated", (event) => {
    noteList.render();
  });
});
