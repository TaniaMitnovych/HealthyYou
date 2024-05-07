import { useState, useEffect } from "react";
import MessageCard from "./MessageCard";

const Messages = ({ socket, messages, setMessages }) => {
  //const [messagesReceived, setMessagesReceived] = useState(messages);
  console.log(messages);
  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessages((messages) => [
        ...messages,
        {
          ...data,
          createdAt: new Date(),
        },
      ]);
      // setMessagesReceived((state) => [
      //   ...state,
      //   {
      //     message: data.message,
      //     username: data.username,
      //     __createdtime__: data.__createdtime__,
      //   },
      // ]);
    });

    // Remove event listener on component unmount
    return () => socket.off("receive_message");
  }, [socket]);

  // dd/mm/yyyy, hh:mm:ss
  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <div className="overflow-y-scroll min-h-[calc(100%-100px)] max-h-[calc(100%-100px)]">
      {messages.map((msg) => {
        return <MessageCard message={msg} key={msg.id} />;
      })}
    </div>
  );
};

export default Messages;
