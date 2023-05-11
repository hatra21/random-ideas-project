import IdeasApi from "../services/ideasApi";
import IdeaList from "./IdeaList";
import UpdateModal from "./UpdateModal";

class UpdateForm {
  constructor() {
    this._updateFormModal = document.querySelector("#update-form-modal");
    this._ideaList = new IdeaList();
  }

  addEventListeners() {
    document
      .querySelector("#update-idea-form")
      .addEventListener("submit", this.handleUpdate.bind(this));
  }

  async handleUpdate(e) {
    e.preventDefault();

    const ideaUpdateForm = document.querySelector("#update-idea-form");
    const ideaIdToUpdate = UpdateModal.getIdeaIdToUpdate();
    const currentIdeaRes = await IdeasApi.getIdea(ideaIdToUpdate);
    const currentIdeaContent = currentIdeaRes.data.data;

    //console.log(currentIdeaContent);

    if (
      !ideaUpdateForm.elements.text.value &&
      !ideaUpdateForm.elements.tag.value
    ) {
      alert("No changes made");
      return;
    }

    const idea = {
      text: ideaUpdateForm.elements.text.value || currentIdeaContent.text,
      tag: ideaUpdateForm.elements.tag.value || currentIdeaContent.tag,
      username: ideaUpdateForm.elements.username.value,
    };

    console.log("Updated", ideaIdToUpdate);

    //update idea to server
    const updatedIdea = await IdeasApi.updateIdea(ideaIdToUpdate, idea);

    ideaUpdateForm.elements.text.value = "";
    ideaUpdateForm.elements.tag.value = "";
    ideaUpdateForm.elements.username.value = "";

    this.render();

    document.dispatchEvent(new Event("closemodal"));
    alert(
      "Succesfully updated idea. Please reload the page to see new changes"
    );
  }

  async render() {
    this._updateFormModal.innerHTML = `
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
            <textarea name="text" id="idea-text" placeholder="Leave blank to keep original idea"></textarea>
          </div>
          <div class="form-control">
            <label for="tag">Tag</label>
            <input type="text" name="tag" id="tag" placeholder="Leave blank to keep original tag" />
          </div>
          <button class="btn" type="submit" id="submit">Update Idea</button>
        </form>  
    `;

    this.addEventListeners();
  }
}

export default new UpdateForm();
