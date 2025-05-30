import Menu from "../../components/menu";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  resetStepperProps,
  setStepperProps,
} from "../../../../redux/slices/progressSlice";
import { openOverlay } from "../../../../redux/slices/userSlice";
import { useInactivity } from "../../../../hooks/useInactivity";
import SwipeOverlay from "../../components/swipeOverlay";

const PuzzleStep1 = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setStepperProps({
        iswhite: true,
        showContinue: true,
        continueText: "START",
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
      <div
        style={{
          backgroundImage: "url('/images/yellow-bg.png')",
          backgroundSize: "cover",
          backgroundRepeat: "round",
        }}
        className="h-full pt-16 px-4 flex flex-col justify-start items-center"
      >
        <div className="w-full flex justify-between items-start mb-4">
          <p className="font-playwriteDEGrund">9th June, 1886</p>
          <div>
            <img src="/images/kamla.png" alt="" className="w-11 rounded-lg" />
            <p className="mt-1 text-sm font-medium text-center font-manrope">
              Kamla
            </p>
          </div>
        </div>
        <p className="text-sm mb-16 font-playwriteDEGrund">
          My brother cut up my newest ticket when playing with his pair of
          scissors!
          <br />
          He makes me so mad at times!
        </p>
        <div className="flex justify-center items-center">
          <img src="/icons/puzzle.svg" alt="" className="w-80" />
        </div>
      </div>
    </>
  );
};

export default PuzzleStep1;
