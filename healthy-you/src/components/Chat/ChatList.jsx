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
    <section className="h-full">
      <ul className="h-full overflow-y-auto">
        {chatList.map((chat) => {
          return <ChatCard chat={chat} key={chat.id} setChat={setChat} />;
        })}
      </ul>
    </section>
  );
}
export default ChatList;
