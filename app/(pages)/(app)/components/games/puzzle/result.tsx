import React from "react";
import Success from "./success";
import Menu from "../../menu";
import GameStepper from "../../gameStepper";

const PuzzleResult = ({ step, next, prev, reset, userData, setUserData }) => {
  return (
    <>
      <Menu reset={reset} userData={userData} setUserData={setUserData} />
      <GameStepper step={step} next={next} prev={prev} /> <Success />
    </>
  );
};

export default PuzzleResult;
