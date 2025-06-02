import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Menu from "../../components/menu";
import { openOverlay } from "../../../../redux/slices/userSlice";
import { useInactivity } from "../../../../hooks/useInactivity";
import SwipeOverlay from "../../components/swipeOverlay";
import { resetStepperProps, setStepperProps } from "../../../../redux/slices/progressSlice";

const WordsStep3 = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.user.userData);
  const [selectedWords, setSelectedWords] = useState([]);

  // Load selectedWords from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSelectedWords = localStorage.getItem("selectedWordsData");
      if (storedSelectedWords) {
        setSelectedWords(JSON.parse(storedSelectedWords));
      } else {
        setSelectedWords([]);
      }
    }
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

  useEffect(() => {
    dispatch(
      setStepperProps({
        showContinue:true,
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
      <div className="h-full pt-16 pb-20 px-4 flex flex-col justify-between items-center bg-[#FFF8E7] font-manrope">
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
              I am beginning to see that tickets could mean whatever people
              wanted them to mean. 
              <br /> Different strokes for different folk, I suppose.
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <img src="/images/graham-bombay.png" alt="" className="w-40" />
        </div>
        <div className="mt-2 min-h-28 w-full">
          <div className="w-full flex flex-wrap gap-4 max-h-80 overflow-auto">
            {selectedWords.length > 0 ? (
              selectedWords.map((i, index) => (
                <div
                  key={index}
                  className="flex-1 max-w-[calc(33%-0.5rem)] min-w-[calc(33.33%-1rem)] rounded p-3 px-8 text-sm font-semibold flex justify-center items-center gap-2 bg-[#2D6A42] text-white border border-[#2D6A42]"
                >
                  {i.word}
                </div>
              ))
            ) : (
              <p className="text-sm font-medium text-center w-full">
                No words selected.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WordsStep3;
