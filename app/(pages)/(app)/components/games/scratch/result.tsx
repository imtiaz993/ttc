import React from "react";
import Success from "./success";
import Failure from "./failure";

const Result = ({ next }) => {
  const success = true;
  return success ? <Success /> : <Failure />;
};

export default Result;
