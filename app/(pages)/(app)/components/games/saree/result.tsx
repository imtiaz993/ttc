import React from "react";
import Success from "./success";
import Failure from "./failure";
import Menu from "../../menu";
import GameStepper from "../../gameStepper";

const SareeResult = ({ step, next, prev, reset, setUserData }) => {
  const success = true;
  return (
    <>
      <Menu reset={reset} setUserData={setUserData} />
      <GameStepper step={step} next={next} prev={prev} />{" "}
      {!success ? <Success /> : <Failure />}
    </>
  );
};

export default SareeResult;
