import Lottie from "lottie-react";
import animationData from "../assets/svg/page2.json";
import animationDataDark from "../assets/svg/page4.json";
export default function PageNotFound({ darkMode }) {
  return (
    <div className="mt-10">
      {/* <p className="text-center text-[20px] translate-y-8 font-semibold  text-[#b5b5b5]">Oops!</p> */}
      <Lottie
        className="w-64 mx-auto p-0"
        animationData={darkMode ? animationDataDark : animationData}
      />
      {/* <p className="text-center text-[20px] font-semibold  text-[#b5b5b5]">Page Not Found</p> */}
    </div>
  );
}
