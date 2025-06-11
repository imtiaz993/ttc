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
    time: 2000000,
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
        className="h-full pt-16 px-4 flex flex-col justify-start items-center bg-[#FFF8E7] font-manrope"
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
        <div className="relative w-full mt-6 xs:mt-14">
          <div
            style={{
              animationDelay: "0.5s",
              animationFillMode: "forwards",
              boxShadow: "0px 4px 4px 0px #0000001A",
            }}
            className="absolute left-0 xs:left-1 top-0 fade-in opacity-0 w-[148px] h-[56px] bg-[#FDD931] rounded-lg"
          >
            <div
              className="absolute bottom-0 right-3 w-[18px] h-[18px] bg-[#FDD931] transform -translate-y-1/2 translate-x-1/2 origin-bottom-left rotate-[90deg]"
              style={{
                clipPath: "polygon(0 100%, 100% 50%, 0 0)",
                boxShadow: "0px 4px 4px 0px #0000001A",
              }}
            ></div>
            <p className="px-4 text-xs absolute top-3 z-10">
              Spot a pair of winged mermaids. . .
            </p>
          </div>

          <div
            style={{
              animationDelay: "1.5s",
              animationFillMode: "forwards",
              boxShadow: "0px 4px 4px 0px #0000001A",
            }}
            className="absolute right-0 xs:right-2 top-16 fade-in opacity-0 w-[148px] h-[56px] bg-[#FDD931] rounded-lg"
          >
            <div
              className="absolute bottom-0 right-3 w-[18px] h-[18px] bg-[#FDD931] transform -translate-y-1/2 translate-x-1/2 origin-bottom-left rotate-[90deg]"
              style={{
                clipPath: "polygon(0 100%, 100% 50%, 0 0)",
                boxShadow: "0px 4px 4px 0px #0000001A",
              }}
            ></div>
            <p className="px-4 text-xs absolute top-3 z-10">
              Did you see a pair of black cats yet?
            </p>
          </div>

          <div
            style={{
              animationDelay: "2.5s",
              animationFillMode: "forwards",
              boxShadow: "0px 4px 4px 0px #0000001A",
            }}
            className="absolute left-0 xs:left-9 -bottom-10 fade-in opacity-0 w-[148px] h-[72px] bg-[#FDD931] rounded-lg"
          >
            <div
              className="absolute top-0 -right-1 w-[18px] h-[18px] bg-[#FDD931] transform -translate-y-1/2 translate-x-1/2 origin-bottom-left rotate-[-90deg]"
              style={{
                clipPath: "polygon(0 100%, 100% 50%, 0 0)",
                boxShadow: "0px 4px 4px 0px #0000001A",
              }}
            ></div>
            <p className="px-4 text-xs absolute top-3 z-10">
              Keep safe distance! A family of sharks swims underwater..
            </p>
          </div>

          <div
            style={{
              animationDelay: "3.5s",
              animationFillMode: "forwards",
              boxShadow: "0px 4px 4px 0px #0000001A",
            }}
            className="absolute right-0 xs:right-2 -bottom-20 xs:-bottom-32 fade-in opacity-0 w-[148px] h-[72px] bg-[#FDD931] rounded-lg"
          >
            <div
              className="absolute top-0 -right-1 w-[18px] h-[18px] bg-[#FDD931] transform -translate-y-1/2 translate-x-1/2 origin-bottom-left rotate-[-90deg]"
              style={{
                clipPath: "polygon(0 100%, 100% 50%, 0 0)",
                boxShadow: "0px 4px 4px 0px #0000001A",
              }}
            ></div>
            <p className="px-4 text-xs absolute top-3 z-10">
              Keep safe distance! A family of sharks swims underwater..
            </p>
          </div>

          <div className="flex justify-center items-center mx-auto w-40 h-[202px]"></div>
        </div>
      </div>
    </>
  );
};

export default PuzzleStep5;
