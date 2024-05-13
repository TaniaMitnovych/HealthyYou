import React, { useEffect } from "react";
import "./App.css";
import LoginForm from "./components/Login";
import "./i18n/i18n";
import Router from "./routes/Router";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import api from "./api";
import { ToastContainer, toast } from "react-toastify";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <Router />
        <ToastContainer />
      </div>
    </LocalizationProvider>
  );
}

export default App;
