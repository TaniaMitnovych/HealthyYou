import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  return (
    <div className="flex w-full justify-between px-10 py-5 drop-shadow-lg bg-gray-100">
      <h1 className="text-3xl font-semibold">
        <span className="text-blue-900">Healthy</span>
        <span className="text-red-900">You</span>
      </h1>
      <div className="flex gap-4 cursor-pointer text-xl text-gray-500">
        <div onClick={() => navigate("/appointments")}>Appointments</div>
        <div onClick={() => navigate("/chat")}>Chat</div>
        <div onClick={() => navigate("/doctors")}>Doctors</div>
        <div onClick={() => navigate("/chat")}>Logout</div>
      </div>
    </div>
  );
}
export default NavBar;
