import MessagesReceived from "./Messages";
import { useState } from "react";
import SendMessage from "./SendMessage";
import api from "../../api";
import { useDispatch, useSelector } from "react-redux";
//import socket from "../../socket/socket";
import io from "socket.io-client"; // Add this
import Cookies from "js-cookie";

console.log(Cookies.get("token"));
const socket = io.connect("http://localhost:4000", {
  query: {
    token: Cookies.get("token"),
  },
});
function Chat({ userId }) {
  const [username, setUsername] = useState(""); // Add this
  const [room, setRoom] = useState(""); // Add this
  const user = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);

  async function joinRoom() {
    console.log(user);
    const roomRes = await api.chat.getRoom(user.id, userId);
    const roomData = roomRes.data;
    if (roomData) {
      setRoom(roomData);
      socket.emit("join_room", { roomId: roomData.id });
      const messRes = await api.chat.getMessages(roomData.id);
      setMessages(messRes.data);
    }
  }
  return (
    <div>
      <div>
        <select onChange={(e) => setRoom(e.target.value)}>
          <option>-- Select Room --</option>
          <option value="javascript">JavaScript</option>
          <option value="node">Node</option>
          <option value="express">Express</option>
          <option value="react">React</option>
        </select>

        <button className="btn btn-secondary" onClick={joinRoom}>
          Join Room
        </button>
        <MessagesReceived socket={socket} messages={messages} />
        <SendMessage socket={socket} userId={userId} roomId={room.id} />
      </div>
    </div>
  );
}

export default Chat;
