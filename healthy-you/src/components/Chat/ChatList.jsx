import { useEffect, useState } from "react";
import api from "../../api";
import { useDispatch, useSelector } from "react-redux";
import ChatCard from "./ChatCard";

function ChatList({ setChat }) {
  const user = useSelector((state) => state.user);
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    api.chat.getRooms(user.id).then((res) => {
      setChatList(res.data);
    });
  }, []);
  return (
    <div>
      <section>
        <ul>
          {chatList.map((chat) => {
            return <ChatCard chat={chat} key={chat.id} setChat={setChat} />;
          })}
        </ul>
      </section>
    </div>
  );
}
export default ChatList;
