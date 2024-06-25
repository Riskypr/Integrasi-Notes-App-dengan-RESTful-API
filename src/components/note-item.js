import Swal from "sweetalert2";

class NoteItem extends HTMLElement {
  set note(note) {
    this._note = note;
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class='card'>
        <h2>${this._note.title}</h2>
        <p>${this._note.body}</p>
        ${this._note.archived ? '<button class="unarchive-btn">Unarchive</button>' : '<button class="archive-btn">Archive</button>'}
        <button class="delete-btn">Delete</button>
      </div>
    `;
    this.querySelector(".delete-btn").addEventListener("click", () => this.confirmDelete());
    if (this._note.archived) {
      this.querySelector(".unarchive-btn").addEventListener("click", () => this.unarchiveNote());
    } else {
      this.querySelector(".archive-btn").addEventListener("click", () => this.archiveNote());
    }
  }

  async confirmDelete() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteNote();
      }
    });
  }

  async deleteNote() {
    const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${this._note.id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    this.parentNode.removeChild(this);

    Swal.fire({
      title: "Deleted!",
      text: "Your note has been deleted.",
      icon: "success",
      customClass: {
        confirmButton: "btn-success", 
      },
    });
  }

  async archiveNote() {
    const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${this._note.id}/archive`, {
      method: "POST",
    });
    const data = await response.json();
    console.log(data);
    this.dispatchEvent(new CustomEvent("note-updated", { detail: data.data }));
  }

  async unarchiveNote() {
    const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${this._note.id}/unarchive`, {
      method: "POST",
    });
    const data = await response.json();
    console.log(data);
    this.dispatchEvent(new CustomEvent("note-updated", { detail: data.data }));
  }
}

customElements.define("note-item", NoteItem);
