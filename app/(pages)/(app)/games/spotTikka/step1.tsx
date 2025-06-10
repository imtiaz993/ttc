import Menu from "../../components/menu";
import { useDispatch } from "react-redux";
import {
  resetStepperProps,
  setStepperProps,
} from "../../../../redux/slices/progressSlice";
import { useEffect, useState } from "react";
import { openOverlay } from "../../../../redux/slices/userSlice";
import { useInactivity } from "../../../../hooks/useInactivity";
import SwipeOverlay from "../../components/swipeOverlay";

const SpotTikkaStep1 = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setStepperProps({
        iswhite: true,
        showContinue: true,
      })
    );
    return () => {
      dispatch(resetStepperProps()); // This resets to initialState
    };
  }, []);

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
        id="screen-13"
        style={{
          backgroundImage: "url('/images/yellow-bg.png')",
          backgroundSize: "cover",
          backgroundRepeat: "round",
        }}
        className="h-full pt-16 px-4 flex flex-col justify-start items-center"
      >
        <div className="w-full flex justify-between items-start mb-4 ">
          <p className="font-playwriteDEGrund">30th April, 1886</p>
          <div>
            <img src="/images/kamla.png" alt="" className="w-11 rounded-lg" />
            <p className="mt-1 text-sm font-medium text-center font-manrope">
              Kamla
            </p>
          </div>
        </div>
        <p className="text-sm font-playwriteDEGrund">
          From the extraordinary to the everyday, tickets run such a range of
          designs. What imaginations their creators must have!
          <br />
          <br />I am collecting more of them to find out what inspired their
          creators. Alas, this one just got ripped apart by my clumsy efforts!
        </p>
        <div className="flex justify-center items-center">
          <img src="/images/spot-tikka.png" alt="" className="w-[264px]" />
        </div>
      </div>
    </>
  );
};

export default SpotTikkaStep1;
