import { useDispatch, useSelector } from "react-redux";
import Menu from "../../components/menu";
import SwipeOverlay from "../../components/swipeOverlay";
import { useEffect, useState } from "react";
import { openOverlay } from "../../../../redux/slices/userSlice";
import { useInactivity } from "../../../../hooks/useInactivity";
import {
  resetStepperProps,
  setStepperProps,
} from "../../../../redux/slices/progressSlice";

const OwnTikkaStep2 = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.user.userData);

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

  useEffect(() => {
    dispatch(
      setStepperProps({
        showContinue: true,
      })
    );
    return () => {
      dispatch(resetStepperProps()); // This resets to initialState
    };
  }, []);

  return (
    <>
      {overlay && <SwipeOverlay setOverlay={setOverlay} />}
      <Menu />
      <div className="h-full pt-16 px-4 flex flex-col justify-start items-center bg-[#FFF8E7] font-manrope">
        <div className="w-full flex items-start mb-4 xs:mb-6">
          <div>
            <img
              src={`/images/${userData.char}.png`}
              alt=""
              className="w-11 rounded-lg"
            />
            <p className="mt-1 text-sm font-medium text-center">You</p>
          </div>
          <p className="ml-4 font-medium w-[calc(100%-44px)]">
            Tickets - A legacy of 200 years of advertising! I wonder how much
            they have  influenced newspapers, television commercials, even
            social media… 
            <br />
            <br />I wish I could try my hand at making a ticket!
          </p>
        </div>
        <div className="flex justify-center items-center mb-32 scale-[0.85] xs:scale-100">
          <img src="/images/tikka-process.gif" alt="" className="w-[230px]" />
        </div>
      </div>
    </>
  );
};

export default OwnTikkaStep2;
