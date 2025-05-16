import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep } from "../../../redux/slices/navigationSlice";

const GameStepper = ({
  iswhite = false,
  showCamera = false,
  showNext = true,
  showPrev = true,
  onCameraClick = () => {},
}) => {
  const steps = [
    { step: [2], icon: "/images/game1.png" },
    { step: [5, 6], icon: "/images/game2.png" },
    { step: [9, 10], icon: "/images/game3.png" },
    { step: [13, 14], icon: "/images/game4.png" },
    { step: [18, 19], icon: "/images/game5.png" },
    { step: [24, 25], icon: "/images/game6.png" },
  ];

  const dispatch = useDispatch();
  const step = useSelector((state: any) => state.navigation.step);
  console.log(step);

  const next = () => dispatch(nextStep());
  const prev = () => dispatch(prevStep());

  const getProgress = () => {
    let value = 0;
    switch (step) {
      case 3:
        value = 8;
        break;
      case 4:
        value = 12;
        break;
      case 5:
      case 6:
        value = 20;
        break;
      case 7:
        value = 28;
        break;
      case 8:
        value = 32;
        break;
      case 9:
      case 10:
        value = 40;
        break;
      case 11:
      case 12:
        value = 48;
        break;
      case 13:
      case 14:
        value = 60;
        break;
      case 15:
        value = 64;
        break;
      case 16:
        value = 68;
        break;
      case 17:
        value = 71;
        break;
      case 18:
      case 19:
        value = 78;
        break;
      case 20:
        value = 82;
        break;
      case 21:
        value = 85;
        break;
      case 22:
        value = 88;
        break;
      case 23:
        value = 91;
        break;
      case 24:
      case 25:
        value = 100;
        break;

      default:
        break;
    }
    return value;
  };

  return (
    <div className="px-4 fixed bottom-6 left-0 right-0 z-20">
      <div className="mb-5 flex justify-between items-center h-[25px]">
        <div>
          {showPrev && (
            <img
              src="/icons/swipe-arrow-dark.svg"
              alt=""
              className="w-4"
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
              className="w-4 rotate-180"
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
          } `}
        ></div>
        {step > 2 && (
          <>
            {!steps.find((i) => i.step.includes(step)) && (
              <div
                className={`absolute -bottom-[7px] w-3 h-3 rounded-full bg-[#243200]`}
                style={{
                  left: `${getProgress()}%`,
                }}
              ></div>
            )}
            <div
              className={`absolute  h-0.5 bg-[#243200]
          `}
              style={{
                width: `${getProgress()}%`,
              }}
            ></div>
          </>
        )}
        <div className="flex items-center justify-between absolute left-0 right-0 bottom-0 top-0 z-10">
          {steps.map((item, index) => (
            <div
              key={index}
              className={`w-5 h-5 rounded-full overflow-hidden  ${
                item.step.includes(step)
                  ? "border-4 border-[#243200]"
                  : step > item.step[item.step.length - 1]
                  ? "border border-[#243200]"
                  : "border border-[#FFFFFF]"
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
