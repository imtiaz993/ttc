import Image from "next/image";
import React from "react";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";

const ScratchStep1 = () => {
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
          <p>7th April, 1886</p>
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
        <p className="text-sm mb-6">
          Last evening we had one of Papa’s merchant friends over for dinner. He
          brought us the loveliest fabric from Calcutta! But what caught my eye
          was not the fabric itself, but this strange label stuck on it.
          <br />
          Can’t wait to show it to my closest friend Selma.Her family’s in the
          textile business after all!
        </p>
        <div className="flex justify-center items-center mb-32">
          <Image
            src="/images/scratch-card.png"
            priority={true}
            sizes="100vw"
            height={0}
            width={0}
            alt=""
            className="w-60"
          />
        </div>
      </div>
    </>
  );
};

export default ScratchStep1;
