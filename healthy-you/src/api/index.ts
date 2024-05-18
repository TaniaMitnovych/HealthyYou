import axios from "axios";
import auth from "./auth";
import user from "./user";
import specialties from "./specialties";
import doctors from "./doctors";
import chat from "./chat";
import appointments from "./appointments";
import patients from "./patients";
import { BASE_URL } from "../env";

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;
const api = {
  auth,
  user,
  specialties,
  doctors,
  chat,
  appointments,
  patients,
};
export default api;
