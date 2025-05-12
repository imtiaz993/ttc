import React from "react";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";
import Image from "next/image";
import { useSelector } from "react-redux";

const SpotTikkaStep2 = () => {
  const userData = useSelector((state: any) => state.user.userData);
  return (
    <>
      <Menu />
      <GameStepper />
      <div className="h-full pt-16 px-4 flex flex-col justify-between pb-24 items-center bg-[#FFF8E7]">
        <div className="w-full">
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
            <p className="ml-4 font-medium text-left w-[cacl(100%-46px)]">
              &lt;text copy&gt;
            </p>
          </div>
          <div className="bg-[#FDD931] w-full rounded py-3 px-4">
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
                Spot this tika in the gallery
              </p>
            </div>
            <p className="mt-2 text-xs">
              Find this tika to see the complete picture
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Image
            src="/images/spot-tikka.png"
            priority={true}
            sizes="100vw"
            height={0}
            width={0}
            alt=""
            className="w-52"
          />
        </div>
      </div>
    </>
  );
};

export default SpotTikkaStep2;
