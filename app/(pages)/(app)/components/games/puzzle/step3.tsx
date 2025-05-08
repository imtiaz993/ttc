import React from "react";
import Menu from "../../menu";
import GameStepper from "../../gameStepper";
import Image from "next/image";

const PuzzleStep3 = ({ step, next, prev, reset, userData, setUserData }) => {
  return (
    <div>
      <Menu reset={reset} userData={userData} setUserData={setUserData} />
      <GameStepper step={step} next={next} prev={prev} />
      <div className="h-full pt-16 px-4 flex flex-col justify-start pb-24 items-center bg-[#FFF8E7]">
        <h1 className="text-sm font-medium flex justify-center items-center gap-5">
          TIMER <span className="text-xl font-medium">01:22</span>
        </h1>
        <div className="flex justify-center items-center mt-3 w-full">
          <Image
            src="/images/completed-puzzle.png"
            priority={true}
            sizes="100vw"
            height={0}
            width={0}
            alt=""
            className="w-64"
          />
        </div>
      </div>
    </div>
  );
};

export default PuzzleStep3;
