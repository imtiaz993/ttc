import { useDispatch, useSelector } from "react-redux";
import Menu from "../../components/menu";
import { useEffect, useState } from "react";
import {
  resetStepperProps,
  setStepperProps,
} from "../../../../redux/slices/progressSlice";
import { openOverlay } from "../../../../redux/slices/userSlice";
import { useInactivity } from "../../../../hooks/useInactivity";
import SwipeOverlay from "../../components/swipeOverlay";

const PuzzleStep4 = () => {
  const userData = useSelector((state: any) => state.user.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setStepperProps({
        showPrev: false,
      })
    );
    return () => {
      dispatch(resetStepperProps()); // This resets to initialState
    };
  }, []);

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
      <div className="h-full pt-16 px-4 flex flex-col justify-between pb-24 items-center bg-[#FFF8E7] font-manrope">
        <div>
          <div className="w-full flex items-start">
            <div>
              <img
                src={`/images/${userData.char}.png`}
                alt=""
                className="w-11 rounded-lg"
              />
              <p className="mt-1 text-sm font-medium text-center">You</p>
            </div>
            <p className="ml-4 font-medium w-[calc(100%-44px)]">
              Look! A wall full of odd looking tickets showing outdated versions
              of gadgets we use today. Amidst them an aeroplane that looks like
              it can barely seat a handful of people!
            </p>
          </div>
          <div className="w-full flex justify-center gap-10 items-start mt-2 xs:mt-4">
            <img src="/images/wonder1.png" alt="" className="w-[118px]" />
            <img src="/images/wonder2.png" alt="" className="w-[126px]" />
          </div>
          <div className="flex justify-center mt-1 xs:mt-2">
            <img src="/images/wonder3.png" alt="" className="w-[119px]" />
          </div>
        </div>
        <div className="bg-[#FDD931] rounded py-3 px-4 w-full mt-4 xs:mt-7">
          <div className="w-full flex items-center mb-2">
            <img src="/icons/location.svg" alt="" className="w-6" />
            <p className="ml-2 text-sm font-semibold w-[calc(100%-24px)]">
              I spy with my little eye. . .
            </p>
          </div>
          <p className="mt-2 text-sm">
            A doorway to your right. Enter and you’ll know what to do next!
          </p>
        </div>
      </div>
    </>
  );
};

export default PuzzleStep4;
