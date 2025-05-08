import Image from "next/image";
import React, { useEffect, useState } from "react";

const Success = () => {
  const [overlay, setOverlay] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setOverlay(true);
    }, 1000);
  }, []);
  return (
    <>
      {overlay && (
        <div>
          <div className="fixed inset-0 bg-[#00000040] z-30"></div>
          <div className="fixed z-40 h-fit w-11/12 inset-0 rounded py-3 px-4 bg-[#FDD931] mx-auto left-1/2 top-1/2 transform -translate-x-1/2">
            <div className="w-full flex justify-between items-center mb-2">
              <Image
                src="/icons/question-mark.svg"
                priority={true}
                sizes="100vw"
                height={0}
                width={0}
                alt=""
                className="w-6"
              />
              <p className="ml-2 text-xs font-semibold w-[calc(100%-24px)]">
                Find the tika
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
              Walk ahead to spot this tika in the gallery.
            </p>
          </div>
        </div>
      )}
      <div className="h-full pt-16 px-4 flex flex-col justify-start items-center bg-[#FFF8E7]">
        <Image
          src="/images/success.gif"
          priority={true}
          sizes="100vw"
          height={0}
          width={0}
          alt=""
          className="w-36"
        />
        <p className="text-xs font-medium mt-5">
          Great job! You finished the puzzle in{" "}
        </p>
        <p className="text-xl font-medium mt-2 mb-6">01 minute 22 seconds!</p>
        <div className="flex justify-center items-center w-full">
          <Image
            src="/images/completed-puzzle.png"
            priority={true}
            sizes="100vw"
            height={0}
            width={0}
            alt=""
            className="w-48"
          />
        </div>
      </div>
    </>
  );
};

export default Success;
