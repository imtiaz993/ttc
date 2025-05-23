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
  } = useSelector((state: any) => state.stepper);


  const steps = [
    { step: [2], icon: "/images/game1.png" },
    { step: [3], icon: "/images/game2.png" },
    { step: [6], icon: "/images/game3.png" },
    { step: [8], icon: "/images/game4.png" },
    { step: [12, 13], icon: "/images/game5.png" },
    { step: [18, 19], icon: "/images/game6.png" },
  ];

  const dispatch = useDispatch();
  const step = useSelector((state: any) => state.navigation.step);

  const getProgress = () => {
    let value = 0;
    switch (step) {
      case 3:
        value = 20;
        break;
      case 4:
        value = 28;
        break;
      case 5:
        value = 32;
        break;
      case 6:
        value = 40;
        break;
      case 7:
        value = 48;
        break;
      case 8:
        value = 60;
        break;
      case 9:
        value = 64;
        break;
      case 10:
        value = 68;
        break;
      case 11:
        value = 71;
        break;
      case 12:
      case 13:
        value = 78;
        break;
      case 14:
        value = 82;
        break;
      case 15:
        value = 85;
        break;
      case 16:
        value = 88;
        break;
      case 17:
        value = 91;
        break;
      case 18:
      case 19:
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
            <img
              src="/icons/swipe-arrow-dark.svg"
              alt=""
              className="w-6 rotate-180"
              onClick={() => {
                next();
              }}
            />
          )}
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
                className="w-full h-full object-cover cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameStepper;
