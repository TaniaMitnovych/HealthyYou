import { Route, Routes } from "react-router-dom";
import LoginForm from "../components/Login";
import Main from "../pages/Main";
import SignUp from "../components/SignUp";

function Router() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default Router;
