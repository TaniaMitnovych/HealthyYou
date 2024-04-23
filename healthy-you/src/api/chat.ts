import axios from "axios";

function getRoom(currentUserId: string, userId: string) {
  return axios.get("/chat", {
    params: { currentUserId, userId },
  });
}

function getMessages(roomId: string) {
  return axios.get("/chat", {
    params: { roomId },
  });
}
export default {
  getRoom,
  getMessages,
};
