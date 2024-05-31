import { useEffect } from "react";
import MessageCard from "./MessageCard";

const Messages = ({ socket, messages, setMessages }) => {
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((messages) => [
        ...messages,
        {
          ...data,
          createdAt: new Date(),
        },
      ]);
    });

    return () => socket.off("receive_message");
  }, [socket]);

  return (
    <div className="overflow-y-scroll min-h-[calc(100%-100px)] max-h-[calc(100%-100px)]">
      {messages.map((msg) => {
        return <MessageCard message={msg} key={msg.id} />;
      })}
    </div>
  );
};

export default Messages;
