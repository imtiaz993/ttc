import React from "react";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";
import Image from "next/image";

const SpotTikkaStep3 = () => {
  return (
    <>
      <Menu />
      <GameStepper />
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

export default SpotTikkaStep3;
