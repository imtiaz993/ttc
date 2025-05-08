import React from "react";
import Menu from "../../menu";
import GameStepper from "../../gameStepper";
import Image from "next/image";

const PuzzleStep5 = ({ step, next, prev, reset, userData, setUserData }) => {
  return (
    <>
      <Menu reset={reset} userData={userData} setUserData={setUserData} />
      <GameStepper step={step} next={next} prev={prev} />
      <div className="h-full pt-16 px-4 flex flex-col justify-start items-center bg-[#FFF8E7]">
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
          <p className="ml-4 font-medium w-[cacl(100%-46px)]">
            Wow! A wall of modern wonders - some oddly familiar, some utterly
            bizarre
          </p>
        </div>
        <div className="bg-[#FDD931] rounded py-3 px-4 w-full">
          <div className="w-full flex items-center mb-2">
            <Image
              src="/icons/zoom-in.svg"
              priority={true}
              sizes="100vw"
              height={0}
              width={0}
              alt=""
              className="w-6"
            />
            <p className="ml-2 text-xs font-semibold w-[calc(100%-24px)]">
              A secret chamber calls you…
            </p>
          </div>
          <p className="mt-2 text-xs">
            Once inside, you’ll know what to do next!
          </p>
        </div>
      </div>
    </>
  );
};

export default PuzzleStep5;
