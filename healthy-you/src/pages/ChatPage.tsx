import { useState } from "react";
import Chat from "../components/Chat/Chat";
import ChatList from "../components/Chat/ChatList";

function ChatPage() {
  const [selectedChat, setChat] = useState();
  return (
    <div>
      <h2>Chat</h2>
      <div className="flex mx-8 gap-8 h-[85vh]">
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
