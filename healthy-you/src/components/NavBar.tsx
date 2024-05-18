import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { isDoctor } from "../utils/helpers";

function NavBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [cookies, removeCookie] = useCookies(["token"]);
  const user = useSelector((state: any) => state.user);

  const logout = () => {
    removeCookie("token", { path: "/" });
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="flex w-full justify-between px-10 py-5 drop-shadow-lg bg-gray-100">
      <h1
        className="text-3xl font-semibold cursor-pointer"
        onClick={() => navigate("/")}
      >
        <span className="text-blue-900">Healthy</span>
        <span className="text-red-900">You</span>
      </h1>
      <div className="flex gap-4 cursor-pointer text-xl text-gray-500">
        <div
          onClick={() => navigate("/appointments")}
          className={pathname === "/appointments" ? "text-blue-600" : ""}
        >
          Appointments
        </div>
        {isDoctor(user.role) && (
          <div
            onClick={() => navigate("/schedule")}
            className={pathname === "/schedule" ? "text-blue-600" : ""}
          >
            Schedule
          </div>
        )}
        <div
          onClick={() => navigate("/chat")}
          className={pathname === "/chat" ? "text-blue-600" : ""}
        >
          Chat
        </div>
        {!isDoctor(user.role) ? (
          <div
            onClick={() => navigate("/doctors")}
            className={pathname === "/doctors" ? "text-blue-600" : ""}
          >
            Doctors
          </div>
        ) : (
          <div
            onClick={() => navigate("/patients")}
            className={pathname === "/patients" ? "text-blue-600" : ""}
          >
            Patients
          </div>
        )}
        <div onClick={logout}>Logout</div>
      </div>
    </div>
  );
}
export default NavBar;
