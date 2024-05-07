import axios from "axios";

function getRoom(currentUserId: string, userId: string) {
  return axios.get("/chat", {
    params: { currentUserId, userId },
  });
}

function getRooms(id: string) {
  return axios.get(`/chat/list/${id}`);
}
function createRoom(currentUserId: string, userId: string) {
  return axios.post("/chat", {
    body: { currentUserId, userId },
  });
}
function getMessages(roomId: string) {
  return axios.get(`/chat/${roomId}`);
}
export default {
  getRoom,
  getMessages,
  getRooms,
  createRoom,
};
