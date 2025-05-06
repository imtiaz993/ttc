import React from "react";
import Success from "./success";
import Failure from "./failure";
import Menu from "../../menu";
import GameStepper from "../../gameStepper";

const ScratchResult = ({ step, next, prev, reset, userData, setUserData }) => {
  const success = true;
  return (
    <>
      <Menu reset={reset} userData={userData} setUserData={setUserData} />
      <GameStepper step={step} next={next} prev={prev} />{" "}
      {success ? <Success /> : <Failure next={next} prev={prev} />}
    </>
  );
};

export default ScratchResult;
