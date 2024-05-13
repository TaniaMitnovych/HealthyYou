import { Route, Routes } from "react-router-dom";
import LoginForm from "../components/Login";
import Main from "../pages/Main";
import SignUp from "../components/SignUp";
import AdditionalInfoForm from "../components/AdditionalInfoForm";
import Chat from "../components/Chat/Chat.jsx";
import ChatList from "../components/Chat/ChatList";
import ChatPage from "../pages/ChatPage";
import Doctors from "../pages/Doctors";

function Router() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/info" element={<AdditionalInfoForm />} />
        <Route path="/chat/:id" element={<ChatPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/doctors" element={<Doctors />} />
      </Routes>
    </div>
  );
}

export default Router;
