import axios from "axios";

function getPatientsByName(query: string) {
  return axios.get(`/user/search?query=${query}`);
}

export default { getPatientsByName };
