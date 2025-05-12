import React from "react";
import Success from "./success";
import Failure from "./failure";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";
import { useSelector } from "react-redux";

const SareeResult = () => {
  const userData = useSelector((state: any) => state.user.userData);
  const success = true;
  return (
    <>
      <Menu />
      <GameStepper showNext={success} showPrev={false} />{" "}
      {success ? <Success userData={userData} /> : <Failure />}
    </>
  );
};

export default SareeResult;
