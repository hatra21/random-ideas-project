import IdeasApi from "../services/ideasApi";
import IdeaList from "./IdeaList";

class IdeaForm {
  constructor() {
    this._formModal = document.querySelector("#form-modal");
    this._ideaList = new IdeaList();
  }

  addEventListeners() {
    document
      .querySelector("#idea-form")
      .addEventListener("submit", this.handleSubmit.bind(this));
  }

  async handleSubmit(e) {
    e.preventDefault();

    const ideaForm = document.querySelector("#idea-form");

    if (
      !ideaForm.elements.text.value ||
      !ideaForm.elements.tag.value ||
      !ideaForm.elements.username.value
    ) {
      alert("Please enter all fields");
      return;
    }

    const idea = {
      text: ideaForm.elements.text.value,
      tag: ideaForm.elements.tag.value,
      username: ideaForm.elements.username.value,
    };

    //add idea to server
    const newIdea = await IdeasApi.createIdea(idea);

    //add idea to list (DOM)
    this._ideaList.addIdeaToList(newIdea.data.data);

    //save username to localStorage
    localStorage.setItem("username", ideaForm.elements.username.value);

    ideaForm.elements.text.value = "";
    ideaForm.elements.tag.value = "";
    ideaForm.elements.username.value = "";

    this.render();

    document.dispatchEvent(new Event("closemodal"));
    //console.log(idea);
  }

  render() {
    this._formModal.innerHTML = `
        <form id="idea-form">   
          <div class="form-control">
            <label for="idea-text">Enter a Username</label>
            <input type="text" name="username" id="username" value="${
              localStorage.getItem("username")
                ? localStorage.getItem("username")
                : ""
            }"/>
          </div>
          <div class="form-control">
            <label for="idea-text">What's Your Idea?</label>
            <textarea name="text" id="idea-text"></textarea>
          </div>
          <div class="form-control">
            <label for="tag">Tag</label>
            <input type="text" name="tag" id="tag" />
          </div>
          <button class="btn" type="submit" id="submit">Submit</button>
        </form>  
    `;

    this.addEventListeners();
  }
}

export default IdeaForm;
