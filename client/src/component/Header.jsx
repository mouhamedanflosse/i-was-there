import {
  IconButton,
  Input,
  Navbar,
  Typography,
  Button,
} from "@material-tailwind/react";
import {PiUserCircleFill} from "react-icons/pi"
import logo from "../assets/logo/logo.png"
import test from "../assets/test.webp"
import {FiLogOut} from "react-icons/fi"

export default function Header() {
  return (
    <div className="flex bg-white mt-2  justify-between px-4 py-1 rounded-md items-center" >
        <img src={logo} className="w-28" alt="logo"/>
        {/* <h1 >i was there</h1>  */}
        <div className="flex justify-center gap-5 items-center">
        <img src={test} className="w-12 h-12" alt="logo"/>
        <FiLogOut className="text-[24px] cursor-pointer font-bold " />
        </div>
    </div>
  );
}
