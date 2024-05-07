import { Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";

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
    <div className="w-full sticky bottom-0">
      <TextField
        id="message"
        label="Message"
        variant="outlined"
        className="w-9/12"
        placeholder="Message..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        multiline
      />
      <Button
        className="text-right w-3/12"
        sx={{ padding: "16px 0" }}
        onClick={sendMessage}
        variant="contained"
      >
        Send Message
      </Button>
    </div>
  );
};

export default SendMessage;
