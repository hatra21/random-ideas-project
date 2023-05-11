import "./css/style.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Modal from "./components/Modal";
import IdeaForm from "./components/IdeaForm";
import IdeaList from "./components/IdeaList";
import UpdateModal from "./components/UpdateModal";
import UpdateForm from "./components/UpdateForm";

const modal = new Modal();

const ideaForm = new IdeaForm();
ideaForm.render();

const ideaList = new IdeaList();
UpdateForm.render();
