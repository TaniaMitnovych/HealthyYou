import { Route, Routes } from "react-router-dom";
import LoginForm from "../components/Login";
import Main from "../pages/Main";
import SignUp from "../components/SignUp";
import AdditionalInfoForm from "../components/AdditionalInfoForm";
import Chat from "../components/Chat/Chat.jsx";
import ChatList from "../components/Chat/ChatList";
import ChatPage from "../pages/ChatPage";

function Router() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/info" element={<AdditionalInfoForm />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default Router;
