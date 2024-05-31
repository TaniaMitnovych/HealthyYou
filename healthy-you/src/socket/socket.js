import io from "socket.io-client";
import Cookies from "js-cookie";

const socket = io.connect("http://localhost:4000", {
  auth: {
    token: Cookies.get("token"),
  },
});
export default socket;
