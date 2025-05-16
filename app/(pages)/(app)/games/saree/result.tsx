import React, { useEffect } from "react";
import Success from "./success";
import Failure from "./failure";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";
import { useDispatch, useSelector } from "react-redux";
import { nextStep } from "../../../../redux/slices/navigationSlice";

const SareeResult = () => {
  const userData = useSelector((state: any) => state.user.userData);
  const success = false;



  return (
    <>
      <Menu />
      <GameStepper showNext={success} showPrev={false} />{" "}
      {success ? <Success userData={userData} /> : <Failure />}
    </>
  );
};

export default SareeResult;
