import { useDispatch, useSelector } from "react-redux";
import Menu from "../../components/menu";
import { useEffect, useState } from "react";
import {
  resetStepperProps,
  setStepperProps,
} from "../../../../redux/slices/progressSlice";
import SwipeOverlay from "../../components/swipeOverlay";
import { openOverlay } from "../../../../redux/slices/userSlice";
import { useInactivity } from "../../../../hooks/useInactivity";

const PuzzleStep5 = () => {
  const userData = useSelector((state: any) => state.user.userData);

  const dispatch = useDispatch();

  const [overlay, setOverlay] = useState(false);
  const displayOverlay = () => dispatch(openOverlay());
  useInactivity({
    time: 8000,
    onInactivity: () => {
      setOverlay(true);
      displayOverlay();
    },
    condition: () => {
      return !overlay;
    },
  });

  return (
    <>
      {overlay && <SwipeOverlay setOverlay={setOverlay} />}
      <Menu />
      <div className="h-full pt-16 px-4 flex flex-col justify-between items-center bg-[#FFF8E7] font-manrope">
        <div className="w-full flex items-start mb-2 xs:mb-4">
          <div>
            <img
              src={`/images/${userData.char}.png`}
              alt=""
              className="w-11 rounded-lg"
            />
            <p className="mt-1 text-xs font-medium text-center">You</p>
          </div>
          <p className="ml-4 font-medium w-[calc(100%-46px)]">
            Tickets here, tickets there, tickets tickets everywhere!
            <br />
            <br />
            Let’s go fishing!
            <br />
            Can you help find the catch of the day?
          </p>
        </div>
        <div className="relative w-full">
          <div
            className="w-[148px] absolute left-0 -top-12 fade-in opacity-0"
            style={{ animationDelay: "1s", animationFillMode: "forwards" }}
          >
            <p className="py-3 px-4 text-xs absolute text-white z-10">
              Spot a pair of winged mermaids. . .
            </p>
            <img className="relative mt-0.5" src="/icons/cloud.svg" alt="" />
          </div>

          <div
            className="w-[148px] absolute -right-2 top-24 fade-in opacity-0"
            style={{ animationDelay: "2s", animationFillMode: "forwards" }}
          >
            <p className="py-3 px-4 text-xs absolute text-white z-10">
              Did you see a pair of black cats yet?
            </p>
            <img className="relative mt-1" src="/icons/cloud.svg" alt="" />
          </div>
          <div
            className="w-[151px] absolute left-8 -bottom-16 fade-in opacity-0"
            style={{ animationDelay: "3s", animationFillMode: "forwards" }}
          >
            <p className="py-3 px-4 text-xs absolute bottom-0 text-white z-10">
              Keep safe distance! A family of sharks swims underwater..
            </p>
            <img className="relative" src="/icons/cloud-2.svg" alt="" />
          </div>
          <div
            className="w-[133px] absolute -right-2 -bottom-32 fade-in opacity-0"
            style={{ animationDelay: "4s", animationFillMode: "forwards" }}
          >
            <p className="py-3 px-4 bottom-0 text-xs absolute text-white z-10">
              What a feast! Find as many items one could eat!
            </p>
            <img className="relative mb-1" src="/icons/cloud-2.svg" alt="" />
          </div>
          <div className="flex justify-center items-center">
            <img src="/images/manchester.png" alt="" className="w-40" />
          </div>
        </div>
        <div className="h-28"></div>
      </div>
    </>
  );
};

export default PuzzleStep5;
