import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  const [searchQuery, setSearchQuery] = useState("");
  const user = useSelector((state: any) => state.user);

  const navigateToDoctors = () => {
    navigate(`/doctors?query=${searchQuery}`);
  };
  return (
    <div className="w-full h-full home_page gradient">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="h-1/2 font-semibold text-6xl text-gray-600 drop-shadow-lg flex items-center">
          <h2>Find your doctor</h2>
        </div>
        <div className="h-1/2 flex gap-2">
          <TextField
            placeholder="Search doctors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          ></TextField>
          <Button
            variant="contained"
            className="h-[53px]"
            onClick={navigateToDoctors}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Main;
