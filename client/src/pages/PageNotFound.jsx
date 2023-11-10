import Lottie from "lottie-react";
import animationData from "../assets/svg/page2.json";
import animationDataDark from "../assets/svg/page4.json";
export default function PageNotFound({ darkMode }) {
  return (
    <div className="mt-10">
      <Lottie
        className="w-64 mx-auto p-0"
        animationData={darkMode ? animationDataDark : animationData}
      />
    </div>
  );
}
