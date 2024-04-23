import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SendMessage = ({ socket, userId, roomId }) => {
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.user);
  const sendMessage = () => {
    if (message !== "") {
      // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
      socket.emit("send_message", {
        fromId: user.id,
        toId: userId,
        roomId,
        text: message,
      });
      setMessage("");
    }
  };

  return (
    <div>
      <input
        placeholder="Message..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button className="btn btn-primary" onClick={sendMessage}>
        Send Message
      </button>
    </div>
  );
};

export default SendMessage;
