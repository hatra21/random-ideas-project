import axios from "axios";

class IdeasApi {
  constructor() {
    this._API_URL = "http://localhost:5000/api/ideas";
  }

  getIdeas() {
    return axios.get(this._API_URL);
  }

  getIdea(id) {
    return axios.get(`${this._API_URL}/${id}`);
  }

  createIdea(idea) {
    return axios.post(this._API_URL, idea);
  }

  deleteIdea(id) {
    const username = localStorage.getItem("username")
      ? localStorage.getItem("username")
      : "";

    return axios.delete(`${this._API_URL}/${id}`, {
      data: {
        username,
      },
    });
  }

  updateIdea(id, data) {
    return axios.put(`${this._API_URL}/${id}`, data);
  }
}

export default new IdeasApi();
