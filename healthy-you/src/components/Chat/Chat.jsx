import MessagesReceived from "./Messages";
import { useEffect, useState } from "react";
import SendMessage from "./SendMessage";
import api from "../../api";
import { useDispatch, useSelector } from "react-redux";
//import socket from "../../socket/socket";
import io from "socket.io-client"; // Add this
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

console.log(Cookies.get("token"));
const socket = io.connect("http://localhost:4000", {
  query: {
    token: Cookies.get("token"),
  },
});
function Chat({ id }) {
  //const { id } = useParams();
  const [username, setUsername] = useState(""); // Add this
  const [room, setRoom] = useState(""); // Add this
  const user = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);

  async function joinRoom() {
    console.log(user.id, id);
    const roomRes = await api.chat.getRoom(user.id, id);
    let roomData = roomRes.data;
    console.log(roomData);

    if (!roomData.length) {
      const createdRoomRes = await api.chat.createRoom(user.id, id);
      roomData = createdRoomRes.data;
    }
    setRoom(roomData[0]);
    socket.emit("join_room", { roomId: roomData[0].RoomId });
    const messRes = await api.chat.getMessages(roomData[0].RoomId);
    console.log(messRes);
    setMessages(messRes.data);
  }
  useEffect(() => {
    console.log(id);
    if (id) {
      joinRoom();
    }
  }, [id]);

  return (
    <div className="h-full flex items-center justify-center">
      {id ? (
        <div className="w-full h-full">
          <div className="pl-5 pb-3 border-0 border-b font-bold text-lg">{`${room.firstName} ${room.lastName}`}</div>
          <MessagesReceived
            socket={socket}
            messages={messages}
            setMessages={setMessages}
          />
          <SendMessage socket={socket} userId={id} roomId={room.RoomId} />
        </div>
      ) : (
        <div className="w-full text-center my-auto">
          Choose a chat to start a converstion
        </div>
      )}
    </div>
  );
}

export default Chat;
