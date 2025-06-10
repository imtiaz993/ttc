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

const WordsStep1 = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setStepperProps({
        iswhite: true,
        showPrev: false,
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
        id="screen-18"
        style={{
          backgroundImage: "url('/images/yellow-bg.png')",
          backgroundSize: "cover",
          backgroundRepeat: "round",
        }}
        className="h-full pt-16 px-4 flex flex-col justify-start items-center"
      >
        <div className="w-full">
          <div className="w-full flex justify-between items-start mb-4">
            <p className="font-playwriteDEGrund">6th May, 1886</p>
            <div>
              <img src="/images/kamla.png" alt="" className="w-11 rounded-lg" />
              <p className="mt-1 text-sm font-medium text-center font-manrope">
                Kamla
              </p>
            </div>
          </div>
          <p className="text-sm mb-6 font-playwriteDEGrund">
            Today I showed Papa the tickets I’ve collected so far. Funnily, he
            was most struck by the torn one! He fished out a magazine which
            featured this painting. Sticking it here to show Selma later how
            remarkably similar they seem! These tickets really are inspired by
            all kinds of things!
            <br />
            <br />
            What I am puzzled by is why this warrior woman design for a ticket
            though?. . .
          </p>
        </div>
        <div className="flex justify-center items-center">
          <img src="/images/words-1.jpg" alt="" className="w-40 xs:w-44" />
        </div>
      </div>
    </>
  );
};

export default WordsStep1;
