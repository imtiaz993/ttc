import React from "react";
import Menu from "../../menu";
import GameStepper from "../../gameStepper";

const SpotTikkaStep2 = ({ step, next, prev, reset, userData, setUserData }) => {
  return (
    <div>
      <Menu reset={reset} userData={userData} setUserData={setUserData} />
      <GameStepper step={step} next={next} prev={prev} />
    </div>
  );
};

export default SpotTikkaStep2;
