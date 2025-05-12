import React from "react";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";
import Image from "next/image";
import { useSelector } from "react-redux";

const OwnTikkaStep4 = () => {
  const userData = useSelector((state: any) => state.user.userData);
  return (
    <>
      <Menu />
      <GameStepper />
      <div className="h-full pt-16 px-4 flex flex-col justify-start items-center bg-[#FFF8E7]">
        <div className="flex justify-center items-center mb-16">
          <Image
            src="/images/own-tikka-final.png"
            priority={true}
            sizes="100vw"
            height={0}
            width={0}
            alt=""
            className="w-80"
          />
        </div>
        <div className="w-full flex items-start mb-10">
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
            Look at that! I just made my first Tika. I should save it.
          </p>
        </div>
        <div className="w-full grid grid-cols-2 gap-4">
          <button className="border border-black bg-transparent rounded font-semibold flex justify-center py-3 w-full">
            <Image
              src="/icons/download.svg"
              priority={true}
              sizes="100vw"
              height={0}
              width={0}
              alt=""
              className="w-6 mr-2"
            />
            Download
          </button>
          <button className="text-[#FFF8E7] font-semibold rounded flex justify-center bg-black border border-black py-3 w-full">
            <Image
              src="/icons/share.svg"
              priority={true}
              sizes="100vw"
              height={0}
              width={0}
              alt=""
              className="w-6 mr-2"
            />
            Share
          </button>
        </div>
      </div>
    </>
  );
};

export default OwnTikkaStep4;
