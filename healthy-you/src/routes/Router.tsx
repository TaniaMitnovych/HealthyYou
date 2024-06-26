import { Route, Routes } from "react-router-dom";
import LoginForm from "../components/Login";
import Main from "../pages/Main";
import SignUp from "../components/SignUp";
import AdditionalInfoForm from "../components/AdditionalInfoForm";
import ChatPage from "../pages/ChatPage";
import Doctors from "../pages/Doctors";
import Layout from "../pages/Layout";
import AppointmentPage from "../pages/AppointmentPage";
import Patients from "../pages/Patients";
import Schedule from "../pages/Schedule";
import DoctorsAdditionalInfo from "../components/DoctorsAdditionalInfo";

function Router() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/chat/:id" element={<ChatPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/appointments" element={<AppointmentPage />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/schedule" element={<Schedule />} />
        </Route>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/doctors/info" element={<DoctorsAdditionalInfo />} />
        <Route path="/info" element={<AdditionalInfoForm />} />
      </Routes>
    </div>
  );
}

export default Router;
