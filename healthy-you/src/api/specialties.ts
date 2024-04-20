import axios from "axios";

function getSpecialties() {
  return axios.get("/specialties");
}

export default {
  getSpecialties,
};
