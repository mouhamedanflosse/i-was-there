import logo from "../assets/logo/logo.png";
import { useNavigate } from "react-router-dom";
import SignOut from "./SignOut";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Avatar } from "@material-tailwind/react";
import { BiLogIn } from "react-icons/bi";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";

export default function Header({ darkOrLight, darkMode, userProfile }) {
  const navigate = useNavigate();
  const [UserProfile, setUserProfile] = useState();
  const [buttonPath, setButtonPath] = useState();
  const location = useLocation();

  useEffect(() => {
    setUserProfile(userProfile);
    if (!UserProfile) {
      if (location.pathname === "/sign-in") {
        setButtonPath({ path: "/sign-up", name: "sign up" });
      } else if (location.pathname === "/sign-up") {
        setButtonPath({ path: "/sign-in", name: "sign in" });
      } else {
        setButtonPath({ path: "/sign-in", name: "sign in" });
      }
    }
  }, [location, userProfile]);
  
  return (
    <div className="w-full dark:shadow-blue-gray-700 dark:border-b duration-300 dark:border-[#45347b] dark:shadow-sm bg-white dark:bg-[#291d4d]">
    <div className="flex max-w-6xl mx-auto bg-white dark:bg-[#291d4d]   justify-between px-4 py-1 items-center">
      <img
        onClick={() => navigate("/")}
        src={logo}
        className="w-28 cursor-pointer"
        alt="logo"
      />
      <div className="flex justify-center gap-5 items-center">
        <div className="p-1 text-center mr-1 mt-1 duration-300 rounded-full dark:hover:bg-blue-gray-500 hover:bg-blue-gray-100">
          {darkMode ? (
            <BsFillSunFill
              onClick={() => darkOrLight(false)}
              className="text-[25px] cursor-pointer m-1 text-white"
            />
          ) : (
            <BsFillMoonStarsFill
              onClick={() => darkOrLight(true)}
              className="text-[23px]  cursor-pointer m-1 "
            />
          )}
        </div>
        {UserProfile && UserProfile?.result?.picture ? (
          <Avatar
            src={UserProfile?.result.picture}
            alt="user"
            withBorder={true}
            className="p-0.5 w-10 h-10"
          />
        ) : UserProfile ? (
          <div className=" flex justify-center outline  outline-2 outline-offset-[2px] dark:outline-gray-500 outline-gray-900 text-white bg-[#ea3a7a] font-[540] text-[23px] items-center  relative object-cover object-center rounded-full w-8 h-8 p-0.5">
            {UserProfile?.result?.name.charAt(0)}
          </div>
        ) : (
          ""
        )}
        {UserProfile ? (
          <SignOut UserProfile={UserProfile} location={location} />
        ) : (
          <button
            onClick={() => navigate(buttonPath?.path)}
            className="flex select-none mx-auto items-center bg-purple-900 border border-gray-300 dark:border-gray-900 rounded-lg shadow-md px-3 py-2 text-sm font-medium text-white hover:bg-[#43034a]"
          >
            <BiLogIn className="text-[20px] my-0" />
            <span>{buttonPath?.name}</span>
          </button>
        )}
      </div>
    </div>
    </div>
  );
}
