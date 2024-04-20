import axios from "axios";

function updateUser(body: any, userId: string) {
  return axios.put(`/user/${userId}`, { ...body });
}

export default {
  updateUser,
};
