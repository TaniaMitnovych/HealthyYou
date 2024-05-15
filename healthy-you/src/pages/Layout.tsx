import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

function Layout() {
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
