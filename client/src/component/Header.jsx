import logo from "../assets/logo/logo.png";
import { useNavigate } from "react-router-dom";
import SignOut from "./SignOut";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Avatar } from "@material-tailwind/react";
import { BiLogIn } from "react-icons/bi";

export default function Header() {
  const navigate = useNavigate();
  const [UserProfile, setUserProfile] = useState();
  const [buttonPath, setButtonPath] = useState();
  const location = useLocation();

  useEffect(() => {
    setUserProfile(JSON.parse(localStorage.getItem("profile")));
    if (!UserProfile) {
      if (location.pathname === "/sign-in") {
        setButtonPath({ path: "/sign-up", name: "sign up" });
      } else if (location.pathname === "/sign-up") {
        setButtonPath({ path: "/sign-in", name: "sign in" });
      }
      else {
        setButtonPath({ path: "/sign-in", name: "sign in" });
      }
    }
  }, [location]);
  console.log(buttonPath)
  return (
    <div className="flex bg-white mt-2  justify-between px-4 py-1 rounded-md items-center">
      <img
        onClick={() => navigate("/")}
        src={logo}
        className="w-28 cursor-pointer"
        alt="logo"
      />
      <div className="flex justify-center gap-5 items-center">
        {UserProfile && UserProfile?.result?.picture ? (
          <Avatar
            src={UserProfile?.result.picture}
            alt="user"
            withBorder={true}
            className="p-0.5 w-10 h-10"
          />
        ) : UserProfile ? (
          <div className=" flex justify-center outline  outline-2 outline-offset-[2px] outline-gray-900 text-white bg-[#008066] font-[540] text-[23px] items-center  relative object-cover object-center rounded-full w-8 h-8   p-0.5">
            {UserProfile?.result?.name.charAt(0)}
          </div>
        ) : ""}
        {UserProfile ? (
          <SignOut UserProfile={UserProfile} location={location}/>
        ) : (
          <button
            onClick={() => navigate(buttonPath?.path)}
            className="flex mt-1 select-none mx-auto items-center bg-purple-900 border border-gray-300 rounded-lg shadow-md px-3 py-2 text-sm font-medium text-white hover:bg-[#43034a]"
          >
            <BiLogIn className="text-[20px] mr-1 my-0" />
            <span>{buttonPath?.name}</span>
          </button>
        )}
      </div>
    </div>
  );
}
