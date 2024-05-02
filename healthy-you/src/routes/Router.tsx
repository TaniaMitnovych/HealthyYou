import { Route, Routes } from "react-router-dom";
import LoginForm from "../components/Login";
import Main from "../pages/Main";
import SignUp from "../components/SignUp";
import AdditionalInfoForm from "../components/AdditionalInfoForm";
import Chat from "../components/Chat/Chat.jsx";

function Router() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/info" element={<AdditionalInfoForm />} />
        <Route
          path="/chat"
          element={<Chat userId="65d71e22-0e5a-4f40-9437-283254c548fc" />}
        />
      </Routes>
    </div>
  );
}

export default Router;
