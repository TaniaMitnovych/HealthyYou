import { Button } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";

const SendMessage = ({ socket, userId, roomId }) => {
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.user);
  const sendMessage = () => {
    if (message !== "") {
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
