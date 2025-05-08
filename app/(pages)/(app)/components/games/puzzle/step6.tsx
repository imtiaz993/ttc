import React from "react";
import Menu from "../../menu";
import GameStepper from "../../gameStepper";
import Image from "next/image";

const PuzzleStep6 = ({ step, next, prev, reset, userData, setUserData }) => {
  return (
    <>
      <Menu reset={reset} userData={userData} setUserData={setUserData} />
      <GameStepper step={step} next={next} prev={prev} />
      <div className="h-full pt-16 px-4 flex flex-col justify-between items-center bg-[#FFF8E7]">
        <div className="w-full flex items-start mb-6">
          <div>
            <Image
              src={`/images/${userData.char}.png`}
              priority={true}
              sizes="100vw"
              height={0}
              width={0}
              alt=""
              className="w-11 rounded-lg"
            />
            <p className="mt-1 text-xs font-medium text-center">You</p>
          </div>
          <p className="ml-4 font-medium w-[calc(100%-46px)]">
            The more I look, the more I am surrounded by tikas!
          </p>
        </div>
        <div className="relative w-full">
          <div
            style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
            className="absolute left-2 -top-14 w-[152px] py-3 px-4 bg-[#FDD931] rounded-lg text-xs fade-in opacity-0"
          >
            What are all these tickets trying to say?
          </div>
          <div
            className="absolute left-8 -bottom-10 w-[152px] py-3 px-4 bg-[#FDD931] rounded-lg text-xs fade-in opacity-0"
            style={{ animationDelay: "1.5s", animationFillMode: "forwards" }}
          >
            How did they survive all these centuries?
          </div>
          <div
            className="absolute -right-2 top-28 w-[150px] py-3 px-4 bg-[#FDD931] rounded-lg text-xs fade-in opacity-0"
            style={{ animationDelay: "1s", animationFillMode: "forwards" }}
          >
            Take a small pause to reflect..
          </div>
          <div
            className="absolute -right-2 -bottom-28 w-[150px] py-3 px-4 bg-[#FDD931] rounded-lg text-xs fade-in opacity-0"
            style={{ animationDelay: "2s", animationFillMode: "forwards" }}
          >
            Who were they meant to attract?
          </div>
          <div className="flex justify-center items-center">
            <Image
              src="/images/manchester.png"
              priority={true}
              sizes="100vw"
              height={0}
              width={0}
              alt=""
              className="w-48"
            />
          </div>
        </div>
        <div className="h-28"></div>
      </div>
    </>
  );
};

export default PuzzleStep6;
