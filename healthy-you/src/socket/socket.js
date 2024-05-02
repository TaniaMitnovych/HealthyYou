import io from "socket.io-client"; // Add this
import Cookies from "js-cookie";

console.log(Cookies.get("token"));
const socket = io.connect("http://localhost:4000", {
  auth: {
    token: Cookies.get("token"),
  },
});
console.log(socket);
export default socket;
