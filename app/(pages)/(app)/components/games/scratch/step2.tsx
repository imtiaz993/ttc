import React from "react";
import Menu from "../../menu";
import GameStepper from "../../gameStepper";
import Image from "next/image";

const ScratchStep2 = ({ step, next, prev, reset, userData, setUserData }) => {
  return (
    <>
      <Menu reset={reset} userData={userData} setUserData={setUserData} />
      <GameStepper step={step} next={next} prev={prev} />
      <div className="h-full pt-16 px-4 flex flex-col justify-start items-center bg-[#FFF8E7]">
        <div className="w-full flex justify-between items-start mb-4">
          <div>
            <Image
              src="/images/char1.png"
              priority={true}
              sizes="100vw"
              height={0}
              width={0}
              alt=""
              className="w-11 rounded-lg"
            />
            <p className="mt-1 text-xs font-medium text-center">You</p>
          </div>
          <p className="ml-4 font-medium">
            Phew! Glad I have a smartphone to help me solve ancient mysteries.
          </p>
        </div>
        <div className="mt-10 mb-6 relative">
          <Image
            src="/images/camera.gif"
            priority={true}
            sizes="100vw"
            height={0}
            width={0}
            alt=""
            className="w-64 relative z-20"
          />
          <Image
            src="/images/camera-scanning-art.png"
            priority={true}
            sizes="100vw"
            height={0}
            width={0}
            alt=""
            className="w-28 absolute top-[52px] left-[70px] z-10"
          />
        </div>
        <div className="bg-[#FDD931] rounded py-3 px-4">
          <div className="w-full flex justify-between items-start mb-4">
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
              Find this colorful image of a lion & lioness within a glass case
              around you
            </p>
          </div>
          <p className="mt-2 text-xs">Swipe to begin scanning</p>
        </div>
      </div>
    </>
  );
};

export default ScratchStep2;
