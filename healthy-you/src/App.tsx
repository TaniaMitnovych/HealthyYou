import React, { useEffect } from "react";
import "./App.css";
import LoginForm from "./components/Login";
import "./i18n/i18n";
import Router from "./routes/Router";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import api from "./api";
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
