import React from "react";
import Menu from "../../menu";
import GameStepper from "../../gameStepper";

const OwnTikkaStep1 = ({ step, next, prev, reset, setUserData }) => {
  return (
    <>
      <Menu reset={reset} setUserData={setUserData} />
      <GameStepper step={step} next={next} prev={prev} />
    </>
  );
};

export default OwnTikkaStep1;
