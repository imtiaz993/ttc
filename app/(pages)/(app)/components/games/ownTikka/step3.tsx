import React, { useState } from "react";
import Menu from "../../menu";
import GameStepper from "../../gameStepper";
import Image from "next/image";

const OwnTikkaStep3 = ({ step, next, prev, reset, userData, setUserData }) => {
  const [overlay, setOverlay] = useState(true);
  return (
    <>
      <Menu reset={reset} userData={userData} setUserData={setUserData} />
      <GameStepper step={step} next={next} prev={prev} />
      {overlay && (
        <div>
          <div className="fixed inset-0 bg-[#00000040] z-30"></div>
          <div className="fixed z-40 h-fit w-11/12 inset-0 rounded py-3 px-4 bg-[#FDD931] mx-auto left-1/2 top-1/2 transform -translate-x-1/2">
            <div className="w-full flex justify-between items-start mb-2">
              <Image
                src="/icons/mouse.svg"
                priority={true}
                sizes="100vw"
                height={0}
                width={0}
                alt=""
                className="w-6"
              />
              <p className="ml-2 text-xs font-semibold w-[calc(100%-24px)]">
                Create your own Tika
              </p>
              <Image
                src="/icons/close-black.svg"
                priority={true}
                sizes="100vw"
                height={0}
                width={0}
                alt=""
                className="w-6"
                onClick={() => {
                  setOverlay(false);
                }}
              />
            </div>
            <p className="mt-2 text-xs">
              Use backgrounds,borders, characters and more from tikas all around
              you to design your unique tika and leave a Chaap on the world!
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default OwnTikkaStep3;
