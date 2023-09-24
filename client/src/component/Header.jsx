import logo from "../assets/logo/logo.png";
import test from "../assets/test.webp";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionType } from "../constants/actionType";
import SignOut from "./SignOut";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [UserProfile, setUserProfile] = useState();
  const location = useLocation()

  useEffect(() => {
    setUserProfile(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  console.log(UserProfile);
  return (
 
    <div className="flex bg-white mt-2  justify-between px-4 py-1 rounded-md items-center">
      <img
        onClick={() => navigate("/")}
        src={logo}
        className="w-28 cursor-pointer"
        alt="logo"
      />
      {/* <h1 >i was there</h1>  */}
      <div className="flex justify-center gap-5 items-center">
        {   UserProfile && 
          <img
            src={UserProfile.picture}
            className="w-11 h-11 shadow-md rounded-full"
            alt="logo"
          />}
        <SignOut />
        {/* <FiLogOut onClick={() => logOUt()} className="text-[24px] cursor-pointer font-bold " /> */}
      </div>
    </div>
  );
}
