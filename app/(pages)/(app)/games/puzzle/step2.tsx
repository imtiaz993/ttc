import { useEffect, useState } from "react";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";

const PuzzleStep2 = () => {
  const [overlay, setOverlay] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [undoDisabled, setUndoDisabled] = useState(false);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return {
      minutes,
      seconds: secs,
      display: `${minutes.toString().padStart(2, "0")} minute${
        minutes !== 1 ? "s" : ""
      } ${secs.toString().padStart(2, "0")} second${secs !== 1 ? "s" : ""}`,
    };
  };

  const stopTimer = () => {
    const formattedTime = formatTime(seconds);
    localStorage.setItem("puzzle-time", JSON.stringify(formattedTime));
    return formattedTime;
  };

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      setSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Menu
        isGameOptions={true}
        handleInfo={() => {
          setOverlay(true);
        }}
        isUndoDisabled={undoDisabled}
        handleUndo={() => {}}
        handleSkip={() => {
          stopTimer();
        }}
      />
      <GameStepper showNext={false} showPrev={false} />
      {overlay && (
        <div>
          <div className="fixed inset-0 bg-[#00000040] z-30"></div>
          <div className="fixed z-40 h-fit w-11/12 inset-0 rounded py-3 px-4 bg-[#FDD931] mx-auto left-1/2 top-1/2 transform -translate-x-1/2">
            <div className="w-full flex justify-between items-center mb-2">
              <img src="/icons/question-mark.svg" alt="" className="w-6" />
              <p className="ml-2 text-xs font-semibold w-[calc(100%-24px)]">
                Piece together
              </p>
              <img
                src="/icons/close-black.svg"
                alt=""
                className="w-6"
                onClick={() => {
                  setOverlay(false);
                }}
              />
            </div>
            <p className="mt-2 text-xs">
              Arrange the pieces to form the complete picture.
            </p>
          </div>
        </div>
      )}
      <div className="h-full pt-16 px-4 flex flex-col justify-start pb-24 items-center bg-[#FFF8E7]">
        <div>
          <h1 className="text-sm font-medium mb-3 flex justify-center items-center gap-5">
            TIMER{" "}
            <span className="text-xl font-medium">
              {Math.floor(seconds / 60)
                .toString()
                .padStart(2, "0")}
              :{(seconds % 60)?.toString()?.padStart(2, "0")}
            </span>
          </h1>
          <div className="w-44 h-64 border border-dashed border-black">
            <div className="grid grid-cols-2 grid-rows-3 h-full gap-0">
              <div className="border-r border-b border-dashed border-black"></div>
              <div className="border-b border-dashed border-black"></div>
              <div className="border-r border-b border-dashed border-black"></div>
              <div className="border-b border-dashed border-black"></div>
              <div className="border-r border-dashed border-black"></div>
              <div></div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-11 w-full">
          <img src="/images/puzzle.png" alt="" className="w-2/3" />
        </div>
      </div>
    </>
  );
};

export default PuzzleStep2;
