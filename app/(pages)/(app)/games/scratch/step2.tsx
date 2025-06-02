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

const ScratchStep2 = () => {
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
    time: 8000000,
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
        style={{
          backgroundImage: "url('/images/yellow-bg.png')",
          backgroundSize: "cover",
          backgroundRepeat: "round",
        }}
        className="h-full pt-16 px-4 flex flex-col justify-start items-center"
      >
        <div className="w-full flex justify-between items-start mb-4 ">
          <p className="font-playwriteDEGrund">7th April, 1886</p>
          <div>
            <img src="/images/kamla.png" alt="" className="w-11 rounded-lg" />
            <p className="mt-1 text-sm font-medium text-center font-manrope">
              Kamla
            </p>
          </div>
        </div>
        <p className="text-sm font-playwriteDEGrund">
          Last evening, I went shopping and found another one of these! Selma
          says they are called "tickets". She mentioned she'd also heard her
          father refer to them as "chaaps" or "tikas" on some occasions.
          <br />
          They are meant to be advertisements, except they don’t sell us
          Coca-Cola or Pears soap but instead cotton cloth!
          <br />
          How delightfully vibrant and colourful they are! I wonder how they are
          made?
        </p>
        <div className="scale-[0.85] xs:scale-100 flex justify-center items-center mt-2 xs:mt-6">
          <img src="/images/scratch-2.png" alt="" className="w-[178px]" />
        </div>
      </div>
    </>
  );
};

export default ScratchStep2;
