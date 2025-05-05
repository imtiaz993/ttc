import React from "react";
import Menu from "../../menu";
import GameStepper from "../../gameStepper";
import Image from "next/image";

const ScratchStep3 = ({ step, next, prev, reset, setUserData }) => {
  return (
    <>
      <Menu reset={reset} setUserData={setUserData} />
      <GameStepper step={step} next={next} prev={prev} />
      <div className="h-full pt-16 px-4 flex flex-col justify-start items-center bg-[#FFF8E7]">
        <Image
          src="/images/verifying.gif"
          priority={true}
          sizes="100vw"
          height={0}
          width={0}
          alt=""
          className="w-40"
        />
        <p className="text-sm font-medium mt-6">Verifying your picture...</p>
      </div>
    </>
  );
};

export default ScratchStep3;
