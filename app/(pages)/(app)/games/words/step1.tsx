import React from "react";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";
import Image from "next/image";

const WordsStep1 = () => {
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
        <p className="text-sm mb-6">
          Now I see that tikas can be inspired by almost anything - from famous
          artworks to photographs to architecture and even mangoes!
          <br />
          <br />
          But I wonder what it all means…
        </p>
      </div>
    </>
  );
};

export default WordsStep1;
