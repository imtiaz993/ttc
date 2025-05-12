import React from "react";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";
import Image from "next/image";

const SpotTikkaStep1 = () => {
  return (
    <>
      <Menu />
      <GameStepper showPrev={false} />
      <div
        style={{
          backgroundImage: "url('/images/yellow-bg.png')",
          backgroundSize: "cover",
          backgroundRepeat: "round",
        }}
        className="h-full pt-16 px-4 flex flex-col justify-start items-center"
      >
        <div className="w-full flex justify-between items-start mb-4">
          <p>30th April, 1886</p>
          <div>
            <Image
              src="/images/ajji.png"
              priority={true}
              sizes="100vw"
              height={0}
              width={0}
              alt=""
              className="w-11 rounded-lg"
            />
            <p className="mt-1 text-xs font-medium text-center">Ajji</p>
          </div>
        </div>
        <p className="text-sm mb-10">
          From the extraordinary to the everyday, tikas ran a range of design.
          What imaginations their creators must have!
          <br />
          <br />I am collecting more tikas to figure what their inspirations
          were. Alas, this one just got ripped apart by my clumsy efforts!
        </p>
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

export default SpotTikkaStep1;
