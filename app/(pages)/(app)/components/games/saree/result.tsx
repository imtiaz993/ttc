import React from "react";
import Success from "./success";
import Failure from "./failure";
import Menu from "../../menu";
import GameStepper from "../../gameStepper";

const SareeResult = ({ step, next, prev, reset, userData, setUserData }) => {
  const success = false;
  return (
    <>
      <Menu reset={reset} userData={userData} setUserData={setUserData} />
      <GameStepper step={step} next={next} prev={prev} />{" "}
      {success ? <Success userData={userData} /> : <Failure />}
    </>
  );
};

export default SareeResult;
