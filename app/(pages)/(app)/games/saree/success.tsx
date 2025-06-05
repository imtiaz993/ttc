import { useDispatch } from "react-redux";
import successAnimation from "../../../animation/Correct Case.json";
import dynamic from "next/dynamic";
import { useState } from "react";
import { openOverlay } from "../../../../redux/slices/userSlice";
import { useInactivity } from "../../../../hooks/useInactivity";
import SwipeOverlay from "../../components/swipeOverlay";

const Animation = dynamic(() => import("../../components/animation"), {
  ssr: false,
});

const Success = ({ userData, sareePath }) => {
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
      <div className="h-full pt-16 px-4 flex flex-col justify-between pb-24 items-center bg-[#FFF8E7] font-manrope">
        <div className="w-full flex justify-between items-start">
          <div>
            <img
              src={`/images/${userData.char}.png`}
              alt=""
              className="w-11 rounded-lg"
            />
            <p className="mt-1 text-sm font-medium text-center">You</p>
          </div>
          <div className="ml-4 w-[calc(100%-46px-16px)]">
            <p className="font-medium">
              What a pro! 19th century printing houses would have started a
              bidding war over such a talented colourist!
            </p>
          </div>
        </div>
        <div className="relative">
          <img src={sareePath} alt="" className="w-52" />
          <div className="w-36 absolute top-16 left-8">
            <Animation animation={successAnimation} height={144} width={144} />
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Success;
