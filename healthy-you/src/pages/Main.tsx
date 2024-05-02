import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import api from "../api";
import DoctorsFilterbar from "../components/DoctorsFilterbar";

const Main = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token"]);

  useEffect(() => {
    const verifyCookie = async () => {
      console.log(cookies.token);
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await api.auth.verifyUser();
      const { status } = data;
      return status
        ? toast(`Hello TANIA`, {
            position: "top-right",
          })
        : (removeCookie("token", { path: "/" }), navigate("/login"));
    };
    verifyCookie();
  }, [cookies]);

  return (
    <>
      <div className="home_page">
        <DoctorsFilterbar />
      </div>
      <ToastContainer />
    </>
  );
};

export default Main;
