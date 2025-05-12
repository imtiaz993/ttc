import React from "react";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";
import Image from "next/image";

const SareeStep1 = () => {
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
          <div>
            <Image
              src="/images/selma.png"
              priority={true}
              sizes="100vw"
              height={0}
              width={0}
              alt=""
              className="w-11 rounded-lg"
            />
            <p className="mt-1 text-xs font-medium text-center">Selma</p>
          </div>
          <p>18th April, 1886</p>
        </div>
        <div className="w-full">
          <p className="text-sm">
            11 Arthur Road,
            <br />
            Bombay,
            <br />
            400025 <br />
            <p className="mt-4"> Dearest Kamla, </p>
          </p>
          <p className="text-sm mb-6">
            <p className="mb-1">
              Papa says tikas are printed in their thousands using this ultra
              modern  technique called called
            </p>
            It is believed that some Frenchman invented it to make playing
            cards! 
            <br />
            Different colors layered to make almost any colour you can imagine.{" "}
            <br />
            Doesn’t it sound so magical?! <br />
            Much love, <br />
            Selma <br />
          </p>
        </div>
        <div className="mt-5">
          <div className="bg-[#FDD931] rounded py-3 px-4">
            <div className="w-full flex justify-between items-start mb-2">
              <Image
                src="/icons/sound.svg"
                priority={true}
                sizes="100vw"
                height={0}
                width={0}
                alt=""
                className="w-6"
              />
              <p className="ml-2 text-sm font-semibold w-[calc(100%-24px)]">
                Chromolithography
              </p>
            </div>
            <p className="mt-2 text-xs">
              A printing technique which uses many metal plates to build up a
              picture layer by layer.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SareeStep1;
