import React from "react";
import Success from "./success";
import Failure from "./failure";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";

const SpotTikkaResult = () => {
  const success = false;
  return (
    <>
      <Menu />
      <GameStepper />{" "}
      {success ? <Success /> : <Failure />}
    </>
  );
};

export default SpotTikkaResult;
