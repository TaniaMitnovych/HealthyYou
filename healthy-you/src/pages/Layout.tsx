import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import api from "../api";
import { string } from "yup";

function Layout() {
  const [cookies, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyCookie = async () => {
      if (typeof cookies.token !== "string") {
        navigate("/login");
      }
      const { data } = await api.auth.verifyUser();
      const { status } = data;
      return (
        status ?? (removeCookie("token", { path: "/" }), navigate("/login"))
      );
    };
    verifyCookie();
  }, [cookies]);
  return (
    <div>
      <NavBar />
      <div className="h-[calc(100vh-66.5px)]">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
