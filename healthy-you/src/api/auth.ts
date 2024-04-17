import axios from "axios";

function login(body: any) {
  return axios.post(`/login`, {
    ...body,
  });
}
function verifyUser() {
  return axios.post("/");
}

function signUp(body: any) {
  return axios.post("/signup", {
    ...body,
  });
}

export default {
  login,
  verifyUser,
  signUp,
};
