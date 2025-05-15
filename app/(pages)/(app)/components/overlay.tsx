import Image from "next/image";
import Welcome from "./welcome";
import { nextStep } from "../../../redux/slices/navigationSlice";
import { useDispatch } from "react-redux";

const Overlay = () => {
  const dispatch = useDispatch();

  const next = () => dispatch(nextStep());
  return (
    <div>
      <div className="fixed inset-0 bg-[#00000040] z-10"></div>
      <Welcome />
      <div
        className="fixed z-20 right-0 left-0 bottom-0"
        style={{
          backgroundImage: "url('/images/overlay-yellow.png')",
          backgroundSize: "contain",
          backgroundRepeat: "round",
        }}
      >
        <div
          onClick={() => {
            next();
          }}
          className="bg-[#202F00] w-[168px] my-10 mx-auto rounded-full px-3 py-2 flex items-center justify-between"
        >
          <img
            src="/icons/swipe-arrow.svg"
           

            
            
            
            alt=""
            className="w-4 animate-sway1"
          />
          <p className="mx-1.5 text-[#FFF8E7] text-xs text-center">
            swipe to navigate
          </p>
          <img
            src="/icons/swipe-arrow-forward.svg"
           

            
            
            
            alt=""
            className="w-4 animate-sway2"
          />
        </div>
      </div>
    </div>
  );
};

export default Overlay;
