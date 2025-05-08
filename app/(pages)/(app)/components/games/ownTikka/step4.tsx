import React from "react";
import Menu from "../../menu";
import GameStepper from "../../gameStepper";

const OwnTikkaStep4 = ({ step, next, prev, reset, userData, setUserData }) => {
  return (
    <>
      <Menu reset={reset} userData={userData} setUserData={setUserData} />
      <GameStepper step={step} next={next} prev={prev} />
    </>
  );
};

export default OwnTikkaStep4;
