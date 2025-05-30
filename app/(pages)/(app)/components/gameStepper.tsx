import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep } from "../../../redux/slices/navigationSlice";
import { useEffect, useState } from "react";

const GameStepper = () => {
  const {
    iswhite,
    showCamera,
    showNext,
    showPrev,
    onCameraClick,
    reduceProgress,
    showContinue,
    continueText = "CONTINUE",
    isContinueDisabled = false,
  } = useSelector((state: any) => state.stepper);

  const steps = [
    { step: [2], icon: "/images/game1.png" },
    { step: [4], icon: "/images/game2.png" },
    { step: [7], icon: "/images/game3.png" },
    { step: [9], icon: "/images/game4.png" },
    { step: [14, 15], icon: "/images/game5.png" },
    { step: [20, 21], icon: "/images/game6.png" },
  ];

  const dispatch = useDispatch();
  const step = useSelector((state: any) => state.navigation.step);
  console.log(step);

  const getProgress = () => {
    let value = 0;
    switch (step) {
      case 3:
        value = 10;
        break;
      case 4:
        value = 22;
        break;
      case 5:
        value = 26;
        break;
      case 6:
        value = 30;
        break;
      case 7:
        value = 38;
        break;
      case 8:
        value = 46;
        break;
      case 9:
        value = 58;
        break;
      case 10:
        value = 62;
        break;
      case 11:
      case 12:
        value = 66;
        break;
      case 13:
        value = 69;
        break;
      case 14:
      case 15:
        value = 76;
        break;
      case 16:
        value = 80;
        break;
      case 17:
        value = 83;
        break;
      case 18:
        value = 86;
        break;
      case 19:
        value = 89;
        break;
      case 20:
      case 21:
        value = 100;
        break;
      default:
        break;
    }
    return value - reduceProgress;
  };

  const [progress, setProgress] = useState(getProgress());

  const next = () => dispatch(nextStep());
  const prev = () => dispatch(prevStep());

  useEffect(() => {
    const timeout = setTimeout(() => {
      const newProgress = getProgress();
      if (newProgress !== progress) {
        setProgress(newProgress);
      }
    }, 50);
    return () => clearTimeout(timeout);
  }, [step, reduceProgress]);

  return (
    <div className="px-4 fixed bottom-6 left-0 right-0 z-20">
      <div className="mb-5 flex justify-between items-center h-[25px]">
        <div>
          {showPrev && (
            <img
              src="/icons/swipe-arrow-dark.svg"
              alt=""
              className="w-6"
              onClick={() => {
                prev();
              }}
            />
          )}
        </div>
        <div className="flex items-center">
          {showCamera && (
            <img
              src="/icons/camera.svg"
              alt=""
              className="w-6 mr-2"
              onClick={onCameraClick}
            />
          )}
          {showNext && (
            <div
              className="flex items-center"
              onClick={() => {
                if (!isContinueDisabled && !showCamera) {
                  next();
                }
                if (showCamera) {
                  onCameraClick();
                }
              }}
            >
              {showContinue && (
                <p
                  className={`text-sm font-manrope font-medium mr-2 ${
                    isContinueDisabled ? "text-[#817c74]" : ""
                  }`}
                >
                  {continueText || "CONTINUE"}
                </p>
              )}
              <img
                src={
                  isContinueDisabled
                    ? "/icons/swipe-arrow-dark-disabled.svg"
                    : "/icons/swipe-arrow-dark.svg"
                }
                alt=""
                className="w-6 rotate-180"
              />
            </div>
          )}
          <p></p>
        </div>
      </div>
      <div className="relative">
        <div
          className={`absolute w-full h-0.5 ${
            iswhite ? "bg-[#FFFFFF40]" : "bg-[#00000040]"
          }`}
        ></div>
        {step > 2 && (
          <>
            {(!steps.find((i) => i.step.includes(step)) ||
              reduceProgress !== 0) && (
              <div
                className={`absolute -bottom-[7px] w-3 h-3 rounded-full bg-[#243200] transition-all duration-300 ease-in-out`}
                style={{
                  left: `${progress}%`,
                }}
              ></div>
            )}
            <div
              className={`absolute h-0.5 bg-[#243200] transition-all duration-300 ease-in-out`}
              style={{
                width: `${progress}%`,
              }}
            ></div>
          </>
        )}
        <div className="flex items-center justify-between absolute left-0 right-0 bottom-0 top-0 z-10">
          {steps.map((item, index) => (
            <div
              key={index}
              className={`w-6 h-6 rounded-full overflow-hidden ${
                item.step.includes(step) && reduceProgress == 0
                  ? "border-4 border-[#243200]"
                  : step > item.step[item.step.length - 1]
                  ? "border border-[#243200]"
                  : "border border-transparent"
              }`}
            >
              <img
                src={item.icon}
                alt={`Step ${index + 1}`}
                className="w-6 h-6 object-cover cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameStepper;
