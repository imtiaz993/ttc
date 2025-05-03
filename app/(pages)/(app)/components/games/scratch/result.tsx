import React from "react";
import Success from "./success";
import Failure from "./failure";
import Menu from "../../menu";
import GameStepper from "../../gameStepper";

const ScratchResult = ({ step, next, prev, reset }) => {
  const success = true;
  return (
    <>
      <Menu reset={reset} />
      <GameStepper step={step} next={next} prev={prev} />{" "}
      {!success ? <Success /> : <Failure />}
    </>
  );
};

export default ScratchResult;
