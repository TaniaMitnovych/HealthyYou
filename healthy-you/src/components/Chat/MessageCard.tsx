import { useDispatch, useSelector } from "react-redux";

function MessageCard({ message }: { message: any }) {
  const user = useSelector((state: any) => state.user);

  const isMine = () => {
    console.log(user.id, message.fromId);
    return user.id === message.fromId;
  };
  function formatDateFromTimestamp(timestamp: string) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }
  return (
    <div>
      <div
        className={
          "flex items-center my-2" +
          (isMine() ? " justify-end" : " justify-start")
        }
      >
        <div
          className={
            "max-w-1/2 px-5 pt-2 pb-1 rounded-t-3xl" +
            (isMine()
              ? " bg-gray-200 rounded-bl-3xl"
              : " bg-indigo-200 rounded-br-3xl")
          }
        >
          <div>{message.text}</div>
          <div className="text-xs text-gray-400 text-right">
            {formatDateFromTimestamp(message.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageCard;
