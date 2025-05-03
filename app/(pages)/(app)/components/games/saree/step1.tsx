import React from "react";
import Menu from "../../menu";
import GameStepper from "../../gameStepper";

const SareeStep1 = ({ step, next, prev, reset }) => {
  return (
    <>
      <Menu reset={reset} />
      <GameStepper step={step} next={next} prev={prev} />
    </>
  );
};

export default SareeStep1;
