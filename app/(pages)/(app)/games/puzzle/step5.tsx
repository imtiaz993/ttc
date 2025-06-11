import { useDispatch, useSelector } from "react-redux";
import Menu from "../../components/menu";
import { useState } from "react";
import SwipeOverlay from "../../components/swipeOverlay";
import { openOverlay } from "../../../../redux/slices/userSlice";
import { useInactivity } from "../../../../hooks/useInactivity";

const PuzzleStep5 = () => {
  const userData = useSelector((state: any) => state.user.userData);

  const dispatch = useDispatch();

  const [overlay, setOverlay] = useState(false);
  const displayOverlay = () => dispatch(openOverlay());
  useInactivity({
    time: 20000,
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
      <div
        id="screen-25"
        className="h-full pt-16 px-4 flex flex-col justify-between items-center bg-[#FFF8E7] font-manrope"
      >
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
            A ticket hunt!
            <br />
            Can you find these tickets ?
          </p>
        </div>
        <div className="relative w-full">
          <div
            className="w-[148px] absolute left-0 xs:left-1 top-0 fade-in opacity-0"
            style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
          >
            <p className="py-3 px-4 text-xs absolute z-10">
              Spot a pair of winged mermaids. . .
            </p>
            <img
              className="relative mt-0.5 w-[148px]"
              src="/icons/cloud.svg"
              alt=""
            />
          </div>

          <div
            className="w-[148px] absolute right-0 xs:right-2 top-16 fade-in opacity-0"
            style={{ animationDelay: "1.5s", animationFillMode: "forwards" }}
          >
            <p className="py-4 px-4 text-xs absolute z-10">
              Did you see a pair of black cats yet?
            </p>
            <img
              className="relative mt-1 w-[148px]"
              src="/icons/cloud.svg"
              alt=""
            />
          </div>
          <div
            className="w-[151px] absolute left-0 xs:left-9 -bottom-10 fade-in opacity-0"
            style={{ animationDelay: "2.5s", animationFillMode: "forwards" }}
          >
            <p className="py-6 px-4 text-xs absolute bottom-0 z-10">
              Keep safe distance! A family of sharks swims underwater..
            </p>
            <img
              className="relative w-[151px]"
              src="/icons/cloud-2.svg"
              alt=""
            />
          </div>
          <div
            className="w-[133px] absolute right-0 xs:right-2 -bottom-20 xs:-bottom-32 fade-in opacity-0"
            style={{ animationDelay: "3.5s", animationFillMode: "forwards" }}
          >
            <p className="py-5 px-4 bottom-0 text-xs absolute z-10">
              What a feast! Find as many items one could eat!
            </p>
            <img
              className="relative mb-1 w-[133px]"
              src="/icons/cloud-2.svg"
              alt=""
            />
          </div>
          <div className="flex justify-center items-center mx-auto w-40 h-[202px]"></div>
        </div>
        <div className="h-28"></div>
      </div>
    </>
  );
};

export default PuzzleStep5;
