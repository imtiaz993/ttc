import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep } from "../../../redux/slices/navigationSlice";

const GameStepper = ({
  showCamera = false,
  showNext = true,
  showPrev = true,
  onCameraClick = () => {},
}) => {
  const steps = [
    { step: 2, icon: "/images/game1.png" },
    { step: 6, icon: "/images/game2.png" },
    { step: 10, icon: "/images/game3.png" },
    { step: 14, icon: "/images/game4.png" },
    { step: 16, icon: "/images/game5.png" },
    { step: 21, icon: "/images/game6.png" },
  ];

  const dispatch = useDispatch();
  const step = useSelector((state: any) => state.navigation.step);

  const next = () => dispatch(nextStep());
  const prev = () => dispatch(prevStep());

  return (
    <div className="px-4 fixed bottom-6 left-0 right-0 z-20">
      <div className="mb-5 flex justify-between items-center h-[25px]">
        <div>
          {showPrev && (
            <Image
              src="/icons/swipe-arrow-dark.svg"
              priority={true}
fetchPriority="high"
              sizes="100vw"
              height={0}
              width={0}
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
            <Image
              src="/icons/camera.svg"
              priority={true}
fetchPriority="high"
              sizes="100vw"
              height={0}
              width={0}
              alt=""
              className="w-6 mr-2"
              onClick={onCameraClick}
            />
          )}
          {showNext && (
            <Image
              src="/icons/swipe-arrow-dark.svg"
              priority={true}
fetchPriority="high"
              sizes="100vw"
              height={0}
              width={0}
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
        <div className="absolute w-full h-0.5 bg-black"></div>
        <div className="flex items-center justify-between absolute left-0 right-0 bottom-0 top-0 z-10">
          {steps.map((item, index) => (
            <div
              key={index}
              className={`w-5 h-5 rounded-full overflow-hidden  ${
                step === item.step ? "border-4 border-[#FFC107]" : ""
              }`}
            >
              <Image
                src={item.icon}
                priority={true}
fetchPriority="high"
                sizes="100vw"
                height={0}
                width={0}
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
