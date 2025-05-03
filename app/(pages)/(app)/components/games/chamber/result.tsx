import React from "react";
import Success from "./success";
import Failure from "./failure";

const ChamberResult = ({ step, next, prev, reset }) => {
  const success = true;
  return success ? <Success /> : <Failure />;
};

export default ChamberResult;
