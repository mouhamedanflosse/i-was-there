import { Button } from "@material-tailwind/react";
import {FcGoogle} from "react-icons/fc"

const CustomGoogleButton = ({ login }) => {
  return (
    <Button
    onClick={ () => login()}
    type="button"
    className="flex mt-2 items-center gap-2 w-full justify-center mx-auto bg-white border border-gray-300 rounded-lg shadow-md pl-6 pr-2 py-3 text-sm font-medium text-gray-800 hover:bg-gray-200 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
  >
    <FcGoogle className="text-[20px] mr-1 my-0" />
    <span className="text-[14px] ">Continue with Google</span>
  </Button>
  );
};

export default CustomGoogleButton;
