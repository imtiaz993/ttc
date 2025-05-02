"use client";
import { useState } from "react";
import Overlay from "./components/overlay";
import Welcome from "./components/welcome";
import ScratchGame from "./components/games/scratch";

export default function Home() {
  const [step, setStep] = useState(0);
  const next = () => {
    setStep((prev) => prev + 1);
  };
  const prev = () => {
    setStep((prev) => prev - 1);
  };
  const reset = () => {
    setStep(0);
  };
  const components = [
    <Overlay next={next} />,
    <Welcome next={next} />,
    <ScratchGame step={step} next={next} reset={reset} />,
  ];
  return components[step];
}
