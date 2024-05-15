import { useState } from "react";
import Chat from "../components/Chat/Chat";
import ChatList from "../components/Chat/ChatList";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

function ChatPage() {
  const { id } = useParams();
  const [selectedChat, setChat] = useState(id);
  return (
    <div className="gradient py-5 h-full">
      <div className="flex mx-8 gap-8 h-full">
        <div className="w-1/4 bg-gray-100 p-4 rounded-3xl">
          <ChatList setChat={setChat} />
        </div>
        <div className="w-3/4 bg-gray-100 p-4 rounded-3xl relative">
          <Chat id={selectedChat} />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
