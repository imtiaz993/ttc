import Image from "next/image";
import React from "react";

const GameStepper = ({ step, next, prev }) => {
  const steps = [
    { step: 2, icon: "/images/game1.png" },
    { step: 5, icon: "/images/game2.png" },
    { step: 8, icon: "/images/game3.png" },
    { step: 11, icon: "/images/game4.png" },
    { step: 14, icon: "/images/game5.png" },
    { step: 17, icon: "/images/game6.png" },
  ];

  return (
    <div className="px-4 fixed bottom-5 left-0 right-0 z-20">
      <div className="mb-5 flex justify-between items-center">
        <Image
          src="/icons/swipe-arrow-dark.svg"
          priority={true}
          sizes="100vw"
          height={0}
          width={0}
          alt=""
          className="w-4"
          onClick={() => {
            prev();
          }}
        />
        <Image
          src="/icons/swipe-arrow-dark.svg"
          priority={true}
          sizes="100vw"
          height={0}
          width={0}
          alt=""
          className="w-4 rotate-180"
          onClick={() => {
            next();
          }}
        />
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
