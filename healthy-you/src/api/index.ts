import axios from "axios";
import auth from "./auth";
import { BASE_URL } from "../env";

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;
const api = {
  auth,
};
export default api;
