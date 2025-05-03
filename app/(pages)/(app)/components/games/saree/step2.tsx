import React from "react";
import Menu from "../../menu";
import GameStepper from "../../gameStepper";

const SareeStep2 = ({ step, next, prev, reset }) => {
  return (
    <div>
      <Menu reset={reset} />
      <GameStepper step={step} next={next} prev={prev} />
    </div>
  );
};

export default SareeStep2;
