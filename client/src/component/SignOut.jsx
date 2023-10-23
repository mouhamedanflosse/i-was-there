import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { actionType } from "../constants/actionType";

export default function SignOut({ UserProfile, location }) {
  // --------------------------open popup
  const [open, setOpen] = useState(false);

  //---------------------------submitin state

  const handleOpen = () => setOpen(!open);

  //---------------------------initialize useNavigate
  const navigate = useNavigate();

  // ------------------logOut
  const dispatch = useDispatch();
  const logOUt = async () => {
    try {
      await dispatch({ type: actionType.logOut });
      handleOpen();
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      console.log(err);
    }
  };
  // ----------useEffect
  useEffect(() => {
    if (jwt_decode(UserProfile?.token)?.exp * 1000 < new Date().getTime()) {
      dispatch({ type: actionType.logOut });
    }
  }, [location]);
  return (
    <>
      <button
        onClick={handleOpen}
        className="flex mt-1 dark:border-gray-900 select-none mx-auto items-center bg-purple-900 border border-gray-300 rounded-lg shadow-md px-3 py-2 text-sm font-medium text-white hover:bg-[#43034a]"
      >
        <TbLogout className="text-[20px] mr-1 my-0" />
        <span>sign Out</span>
      </button>
      <Dialog
        open={open}
        className="dark:bg-[#1a2227]"
        size="xs"
        handler={handleOpen}
      >
        <DialogHeader className="dark:text-[#dad4d4]">
          sure you want to log out
        </DialogHeader>
        {/* <DialogBody >want to log out</DialogBody> */}
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            onClick={() => logOUt()}
            className="bg-blue-600 shadow-none hover:shadow-none flex justify-center items-center gap-2 select-none  p-[12 px] text-white   hover:bg-blue-400 rounded-md "
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
