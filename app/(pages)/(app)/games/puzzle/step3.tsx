import React, { useEffect, useState } from "react";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";
import Image from "next/image";
import { nextStep } from "../../../../redux/slices/navigationSlice";
import { useDispatch } from "react-redux";

const PuzzleStep3 = () => {
  const dispatch = useDispatch();
  const next = () => dispatch(nextStep());

  const [overlay, setOverlay] = useState(false);
  const [success, setSuccess] = useState(false);
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
    }, 3000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setSuccess(true);
      setIsGameOptions(false);
    }, 1000);
  }, []);

  return (
    <>
      <Menu isGameOptions={isGameOptions} />
      <GameStepper showPrev={false} />
      {overlay && (
        <div>
          <div className="fixed inset-0 bg-[#00000040] z-30"></div>
          <div className="fixed z-40 h-fit w-11/12 inset-0 rounded py-3 px-4 bg-[#FDD931] mx-auto left-1/2 top-1/2 transform -translate-x-1/2">
            <div className="w-full flex justify-between items-center mb-2">
              <Image
                src="/icons/question-mark.svg"
                priority={true}
fetchPriority="high"
                sizes="100vw"
                height={0}
                width={0}
                alt=""
                className="w-6"
              />
              <p className="ml-2 text-xs font-semibold w-[calc(100%-24px)]">
                Find the tika
              </p>

              <p
                className="text-sm font-medium"
                onClick={() => {
                  next();
                }}
              >
                CONTINUE
              </p>
            </div>
            <p className="mt-2 text-xs">
              Walk ahead to spot this tika in the gallery.
            </p>
          </div>
        </div>
      )}
      {success && (
        <div className="h-full pt-16 px-4 flex flex-col justify-between items-center bg-[#FFF8E7]">
          <div>
            <p className="text-xs font-medium mt-5">
              Great job! You finished the puzzle in{" "}
            </p>
            <p className="text-xl font-medium mt-2 mb-6">
              {completionTime?.display}
            </p>
          </div>
          <div className="flex justify-center items-center w-full relative">
            <Image
              src="/images/completed-puzzle.png"
              priority={true}
fetchPriority="high"
              sizes="100vw"
              height={0}
              width={0}
              alt=""
              className="w-48"
            />
            <Image
              src="/images/success.gif"
              priority={true}
fetchPriority="high"
              sizes="100vw"
              height={0}
              width={0}
              alt=""
              className="w-36 absolute"
            />
          </div>
          <div></div>
        </div>
      )}
      {!success && (
        <div className="h-full pt-16 px-4 flex flex-col justify-start pb-24 items-center bg-[#FFF8E7]">
          <h1 className="text-sm font-medium flex justify-center items-center gap-5">
            TIMER{" "}
            <span className="text-xl font-medium">
              {completionTime?.minutes?.toString()?.padStart(2, "0")}:
              {completionTime?.seconds?.toString()?.padStart(2, "0")}
            </span>
          </h1>
          <div className="flex justify-center items-center mt-3 w-full">
            <Image
              src="/images/completed-puzzle.png"
              priority={true}
fetchPriority="high"
              sizes="100vw"
              height={0}
              width={0}
              alt=""
              className="w-64"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PuzzleStep3;
