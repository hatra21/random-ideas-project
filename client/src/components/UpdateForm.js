import IdeasApi from "../services/ideasApi";
import IdeaList from "./IdeaList";
import Modal from "./Modal";

class UpdateForm {
  constructor(ideaToUpdate) {
    this.ideaToUpdate = ideaToUpdate;
    this._formModal = document.querySelector("#form-update-modal");
    this._ideaList = new IdeaList();
    this._modal = new Modal();
  }

  addEventListeners() {
    this._formModal.addEventListener("submit", this.handleUpdate.bind(this));
  }

  async handleUpdate(e) {
    e.preventDefault();

    const ideaUpdateForm = document.querySelector("#update-idea-form");

    if (
      !ideaUpdateForm.elements.text.value ||
      !ideaUpdateForm.elements.tag.value
    ) {
      alert("Please enter all fields.");
      return;
    }

    const idea = {
      text: ideaUpdateForm.elements.text.value,
      tag: ideaUpdateForm.elements.tag.value,
      username: localStorage.getItem("username"),
    };

    //update idea to server
    const ideaToUpdate = await IdeasApi.updateIdea(this.ideaToUpdate._id, idea);

    ideaUpdateForm.elements.text.value = "";
    ideaUpdateForm.elements.tag.value = "";

    //update idea in DOM
    this._ideaList.updateIdeaInList(ideaToUpdate.data.data);

    this.render();

    document.dispatchEvent(new Event("closemodal"));
  }

  async render() {
    this._formModal.innerHTML = `
        <form id="update-idea-form">   
          <div class="form-control">
            <label for="idea-text">Enter a Username</label>
            <input disabled type="text" name="username" id="username" value="${
              localStorage.getItem("username")
                ? localStorage.getItem("username")
                : ""
            }"/>
          </div>
          <div class="form-control">
            <label for="idea-text">What's Your New Idea?</label>
            <textarea name="text" id="idea-text"></textarea>
          </div>
          <div class="form-control">
            <label for="tag">Tag</label>
            <input type="text" name="tag" id="tag" />
          </div>
          <button class="btn" type="submit" id="submit">Update Idea</button>
        </form>  
    `;

    this.addEventListeners();
  }
}

export default UpdateForm;
