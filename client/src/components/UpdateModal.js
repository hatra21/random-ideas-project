class UpdateModal {
  constructor() {
    this._updateModal = document.querySelector("#update-modal");
    this._ideaListEl = document.querySelector("#idea-list");
    this.addEventListeners();
    this._currentIdeaId;
  }

  addEventListeners() {
    this._ideaListEl.addEventListener("click", (e) => {
      e.stopImmediatePropagation();
      if (e.target.className === "fas fa-pen") {
        this.open();
        console.log(
          "Idea to update:",
          e.target.parentElement.parentElement.dataset.id
        );
        //click on i > btn > cardElement to get the data-id on the actual card parent element
        this._currentIdeaId = e.target.parentElement.parentElement.dataset.id;
        return;
      }
    });

    this._updateModal.addEventListener("click", this.outsideClick.bind(this));
    document.addEventListener("closemodal", this.close.bind(this));
  }

  open() {
    this._updateModal.style.display = "block";
    //this._updateModal.style.background = "red";
  }

  close() {
    this._updateModal.style.display = "none";
  }

  outsideClick(e) {
    if (e.target === this._updateModal) {
      this.close();
    }
  }

  getIdeaIdToUpdate() {
    return this._currentIdeaId;
  }
}

export default new UpdateModal();
