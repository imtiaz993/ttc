import React from "react";
import Success from "./success";
import Failure from "./failure";

const WordsResult = ({ step, next, prev, reset }) => {
  const success = true;
  return success ? <Success /> : <Failure />;
};

export default WordsResult;
