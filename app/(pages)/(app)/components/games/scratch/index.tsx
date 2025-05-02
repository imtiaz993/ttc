import React from "react";
import Menu from "../../menu";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Result from "./result";

const ScratchGame = ({ step, next }) => {
  const components = [
    null,
    null,
    <Step1 next={next} />,
    <Step2 next={next} />,
    <Step3 next={next} />,
    <Result next={next} />,
  ];

  return (
    <>
      <Menu />
      {components[step]}
    </>
  );
};

export default ScratchGame;
