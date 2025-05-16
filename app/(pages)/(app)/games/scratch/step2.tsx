import React from "react";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";

const ScratchStep2 = () => {
  return (
    <>
      <Menu />
      <GameStepper iswhite />
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
            <img src="/images/ajji.png" alt="" className="w-11 rounded-lg" />
            <p className="mt-1 text-xs font-medium text-center">Kamla</p>
          </div>
        </div>
        <p className="text-sm mb-6">
          Selma says this unusual picture is called a “Ticket”. She did however
          mention how she had heard her dad refer to them as “chaaps” or “tikas”
          too on some occasions.
          <br />
          They are meant to be advertisements just like the ones in newspapers.
          Except, these don’t sell us Coca-Cola or Pears soap! 
          <br />
          But I wonder.. how are they so colourful?
        </p>
        <div className="flex justify-center items-center mb-32">
          <img src="/images/scratch-card-2.png" alt="" className="w-60" />
        </div>
      </div>
    </>
  );
};

export default ScratchStep2;
