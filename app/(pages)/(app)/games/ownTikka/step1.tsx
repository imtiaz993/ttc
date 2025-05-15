import React from "react";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";
import Image from "next/image";

const OwnTikkaStep1 = () => {
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
          <p>8th August, 1886</p>
          <div>
            <img
              src="/images/ajji.png"
             

              
              
              
              alt=""
              className="w-11 rounded-lg"
            />
            <p className="mt-1 text-xs font-medium text-center">Ajji</p>
          </div>
        </div>
        <p className="text-sm mb-6">
          My collection grows as I  almost every tika I come across.
          <br />
          Mumma says its all just junk, but I am sure, centuries from now, my
          collection will grace the halls of some famous museum and bring joy to
          some fanciful dreamer yet to be born!
        </p>
        <div className="flex justify-center items-center mb-32">
          <img
            src="/images/own-tikka.png"
           

            
            
            
            alt=""
            className="w-52"
          />
        </div>
      </div>
    </>
  );
};

export default OwnTikkaStep1;
