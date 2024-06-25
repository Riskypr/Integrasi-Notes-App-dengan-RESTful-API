import Swal from "sweetalert2";

class AddNote extends HTMLElement {
  connectedCallback() {
    this.render();
    this.querySelector("#add-note-form").addEventListener("submit", this.handleSubmit.bind(this));
  }

  render() {
    this.innerHTML = `
      <form id="add-note-form">
        <input type="text" id="title" placeholder="Title" required>
        <textarea id="body" placeholder="Body" required></textarea>
        <button type="submit">Add Note</button>
      </form>
    `;
  }

  async handleSubmit(event) {
    event.preventDefault();
    const title = this.querySelector("#title").value;
    const body = this.querySelector("#body").value;
    try {
      const response = await fetch("https://notes-api.dicoding.dev/v2/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
      });
      const data = await response.json();
      console.log(data);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Note added successfully!",
        customClass: {
          confirmButton: 'btn-success' // Define custom class for the button
        }
      });
      this.dispatchEvent(new CustomEvent("note-added", { detail: data.data }));
      this.resetForm();
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        customClass: {
          confirmButton: 'btn-danger' // Define custom class for the button
        }
      });
    }
  }

  resetForm() {
    this.querySelector("#add-note-form").reset();
  }
}

customElements.define("add-note", AddNote);
