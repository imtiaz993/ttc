import React, { useEffect } from "react";
import Success from "./success";
import Failure from "./failure";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";
import { useDispatch } from "react-redux";
import { nextStep } from "../../../../redux/slices/navigationSlice";

const ScratchResult = () => {
  const success = true;

  const dispatch = useDispatch();

  const next = () => dispatch(nextStep());

  useEffect(() => {
    setTimeout(() => {
      next();
    }, 3000);
  }, []);

  return (
    <>
      <Menu />
      <GameStepper showNext={false} showPrev={false} />{" "}
      {success ? <Success /> : <Failure />}
    </>
  );
};

export default ScratchResult;
