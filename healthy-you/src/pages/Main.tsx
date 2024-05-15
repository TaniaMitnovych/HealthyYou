import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import api from "../api";
import DoctorsFilterbar from "../components/DoctorsFilterbar";
import NavBar from "../components/NavBar";
import { Input } from "@mui/base";
import { Button, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
const Main = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token"]);
  const user = useSelector((state: any) => state.user);
  useEffect(() => {
    console.log(user);
    const verifyCookie = async () => {
      console.log(cookies.token);
      if (!cookies.token) {
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
    <div className="w-screen h-screen home_page gradient">
      <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-66.5px)]">
        <div className="h-1/2 font-semibold text-6xl text-gray-600 drop-shadow-lg flex items-center">
          <h2>Find your doctor</h2>
        </div>
        <div className="h-1/2 flex gap-2">
          <TextField
            className="w-full"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          ></TextField>
          <Button variant="contained" className="h-[53px]">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Main;
