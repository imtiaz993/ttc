import React from "react";
import Menu from "../../menu";
import GameStepper from "../../gameStepper";

const OwnTikkaStep1 = ({ step, next, prev, reset }) => {
  return (
    <>
      <Menu reset={reset} />
      <GameStepper step={step} next={next} prev={prev} />
    </>
  );
};

export default OwnTikkaStep1;
