import React from "react";
import Success from "./success";
import Failure from "./failure";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";

const ScratchResult = () => {
  const success = true;

  return (
    <>
      <Menu />
      <GameStepper showPrev={false} />{" "}
      {success ? <Success /> : <Failure />}
    </>
  );
};

export default ScratchResult;
