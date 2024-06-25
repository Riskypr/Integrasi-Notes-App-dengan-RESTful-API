class NoteList extends HTMLElement {
  connectedCallback() {
    document.addEventListener("DOMContentLoaded", () => {
      this.render();
    });
  }

  async fetchNotes() {
    const response = await fetch("https://notes-api.dicoding.dev/v2/notes");
    const data = await response.json();
    return data.data;
  }

  async render() {
    const loadingIndicator = this.querySelector("loading-indicator");
    if (loadingIndicator) {
      loadingIndicator.show();
    }

    try {
      const notes = await this.fetchNotes();
      this.innerHTML = "";
      notes.forEach((note) => {
        const noteItem = document.createElement("note-item");
        noteItem.note = note;
        this.appendChild(noteItem);
      });
    } finally {
      if (loadingIndicator) {
        loadingIndicator.hide();
      }
    }
  }
}

customElements.define("note-list", NoteList);
