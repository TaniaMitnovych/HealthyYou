import { getUserInitials } from "../../utils/helpers";

function ChatCard({ chat, setChat }: { chat: any; setChat: any }) {
  const initials = getUserInitials(chat.firstName, chat.lastName);
  const onCardClick = () => {
    setChat(chat.UserId);
  };
  return (
    <div
      className="flex items-center gap-5 p-5 cursor-pointer border-0 border-b"
      onClick={onCardClick}
    >
      <div className="w-10 h-10 bg-indigo-500 text-center leading-10 rounded-full text-white">
        {initials}
      </div>
      <div>{`${chat.firstName} ${chat.lastName}`}</div>
    </div>
  );
}
export default ChatCard;
