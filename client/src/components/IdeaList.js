import IdeasApi from "../services/ideasApi";
import Modal from "./Modal";
import UpdateForm from "./UpdateForm";

class IdeaList {
  constructor() {
    this._modal = new Modal();
    this._ideaListEl = document.querySelector("#idea-list");
    this._ideas = [];
    this.getIdeas();

    this._validTags = new Set();
    this._validTags.add("technology");
    this._validTags.add("software");
    this._validTags.add("business");
    this._validTags.add("education");
    this._validTags.add("health");
    this._validTags.add("inventions");
  }

  addEventListeners() {
    this._ideaListEl.addEventListener("click", (e) => {
      if (e.target.className === "fas fa-times") {
        e.stopImmediatePropagation();
        const cardToDelete = e.target.parentElement.parentElement;
        this.deleteIdea(cardToDelete.dataset.id);
      }
    });

    this._ideaListEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-pen")) {
        e.stopImmediatePropagation();

        const ideaId = e.target.parentElement.parentElement.dataset.id;
        const idea = this._ideas.filter((idea) => idea._id === ideaId)[0];

        const updateForm = new UpdateForm(idea);
        updateForm.render();

        this._modal.openUpdate();
      }
    });
  }

  async getIdeas() {
    try {
      const res = await IdeasApi.getIdeas();
      this._ideas = res.data.data;
      //console.log(this._ideas);
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteIdea(ideaId) {
    try {
      //delete from server
      const res = await IdeasApi.deleteIdea(ideaId);

      //delete from DOM
      this._ideas.filter((idea) => idea._id !== ideaId);
      this.getIdeas();
    } catch (error) {
      alert("You can't delete this resource");
      console.log(error);
    }
  }

  addIdeaToList(idea) {
    this._ideas.push(idea);
    this.render();
  }

  updateIdeaInList(idea) {
    const ideaInList = this._ideas.find((i) => i._id === idea._id);

    ideaInList.text = idea.text;
    ideaInList.tag = idea.tag;

    this.render();
  }

  getTagClass(tag) {
    tag = tag.toLowerCase();
    const tagClass = "";
    if (this._validTags.has(tag)) {
      tagClass = tag;
    }

    return tagClass;
  }

  render() {
    this._ideaListEl.innerHTML = this._ideas
      .map((idea) => {
        const tagClass = idea.tag;
        const deleteBtn =
          localStorage.getItem("username") === idea.username
            ? `<button class="delete"><i class="fas fa-times"></i></button>`
            : "";
        const updateBtn =
          localStorage.getItem("username") === idea.username
            ? `<button class="update"><i class="fas fa-pen"></i></button>`
            : "";

        return `<div class="card" data-id="${idea._id}">
          ${deleteBtn} 
          ${updateBtn}     
          <h3>
            ${idea.text}
          </h3>
          <p class="tag tag-${tagClass}">${idea.tag.toUpperCase()}</p>
          <p>
            Posted on <span class="date">${idea.date}</span> by
            <span class="author">${idea.username}</span>
          </p>
        </div>`;
      })
      .join("");
    this.addEventListeners();
  }
}

export default IdeaList;
