import React from "react";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";
import Image from "next/image";
import { useSelector } from "react-redux";

const SareeStep2 = () => {
  const userData = useSelector((state: any) => state.user.userData);
  return (
    <>
      <Menu />
      <GameStepper />
      <div className="h-full pt-16 px-4 flex flex-col justify-start items-center bg-[#FFF8E7]">
        <div className="w-full flex justify-between items-start">
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
          <div className="ml-4 w-[calc(100%-46px-16px)]">
            <p className="font-medium">
              Overlapping different colours to make almost any colour I can
              imagine? This does sound quite magical!
            </p>
            <p className="font-medium">
              Chromolithography layers primary colours which mix to create
              secondary colours.
            </p>
          </div>
        </div>
        <div className="mt-10 mb-10 w-full">
          <Image
            src="/images/color-pallets.png"
            priority={true}
            sizes="100vw"
            height={0}
            width={0}
            alt=""
            className="w-11/12 mx-auto"
          />
        </div>
        <div className="w-full">
          <p className="text-sm font-medium mb-4">
            You’ll be assigned one colour out of these
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-[#EA865B] mr-2"></div>
              <p className="font-semibold">Orange</p>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-[#67B85E] mr-2"></div>
              <p className="font-semibold">Green</p>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-[#9F71DC] mr-2"></div>
              <p className="font-semibold">Purple</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SareeStep2;
