import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Menu from "../../components/menu";
import { nextStep } from "../../../../redux/slices/navigationSlice";
import successAnimation from "../../../animation/Correct Case.json";
import dynamic from "next/dynamic";
import { resetStepperProps, setStepperProps } from "../../../../redux/slices/progressSlice";

const Animation = dynamic(() => import("../../components/animation"), {
  ssr: false,
});

const PuzzleStep3 = () => {
  const dispatch = useDispatch();
  const next = () => dispatch(nextStep());

  const [overlay, setOverlay] = useState(false);
  const [completionTime, setCompletionTime] = useState<any>({
    display: "",
  });
  const [isGameOptions, setIsGameOptions] = useState(true);

  const getStoredTime = (storageKey) => {
    const stored = localStorage.getItem(storageKey);
    return stored
      ? JSON.parse(stored)
      : { minutes: 0, seconds: 0, display: "00 minutes 00 seconds" };
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTime = getStoredTime("puzzle-time");
      setCompletionTime(storedTime);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setOverlay(true);
    }, 5000);
  }, []);

  useEffect(() => {
    dispatch(
      setStepperProps({
        showNext: !overlay,
        showPrev: !overlay,
      })
    );
    return () => {
      dispatch(resetStepperProps()); // This resets to initialState
    };
  }, [overlay]);

  return (
    <>
      <Menu isGameOptions={isGameOptions} />
      {overlay && (
        <div>
          <div className="fixed inset-0 bg-[#00000040] z-30"></div>
          <div className="fixed z-40 h-fit w-11/12 inset-0 rounded py-3 px-4 bg-[#FDD931] mx-auto left-1/2 top-1/2 transform -translate-x-1/2 font-manrope">
            <div className="w-full flex justify-between items-center mb-2">
              <div className="flex items-center">
                <img src="/icons/search.svg" alt="" className="w-6" />
                <p className="ml-2 text-sm font-semibold w-[calc(100%-24px)]">
                  Find the ticket
                </p>
              </div>

              <p
                className="text-xs font-medium flex items-center gap-1"
                onClick={() => {
                  next();
                }}
              >
                CONTINUE
                <img
                  src="/icons/forward-dark.svg"
                  alt=""
                  className="w-[18px]"
                />
              </p>
            </div>
            <p className="mt-2 text-sm">
              Walk ahead to spot this ticket in the exhibition
            </p>
          </div>
        </div>
      )}
      <div className="h-full pt-16 pb-24 px-4 flex flex-col justify-between items-center bg-[#FFF8E7] font-manrope">
        <div>
          <p className="text-sm font-medium mt-5">
            Great job! You finished the puzzle in{" "}
          </p>
          <p className="text-xl font-medium mt-2 mb-6 font-lora">
            {completionTime?.display}
          </p>
        </div>
        <div className="flex justify-center items-center w-full relative">
          <img src="/images/completed-puzzle.png" alt="" className="w-[264px]" />
          <div className="absolute">
            <Animation animation={successAnimation} height={144} width={144} />
          </div>
        </div>
        <div className="min-h-20 w-full"></div>
      </div>
    </>
  );
};

export default PuzzleStep3;
