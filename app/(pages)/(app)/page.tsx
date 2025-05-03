"use client";
import { useState } from "react";
import Overlay from "./components/overlay";
import Welcome from "./components/welcome";

import ScratchStep1 from "./components/games/scratch/step1";
import ScratchStep2 from "./components/games/scratch/step2";
import ScratchStep3 from "./components/games/scratch/step3";
import ScratchResult from "./components/games/scratch/result";

import SareeStep1 from "./components/games/saree/step1";
import SareeStep2 from "./components/games/saree/step2";
import SareeStep3 from "./components/games/saree/step3";
import SareeResult from "./components/games/saree/result";

import SpotTikkaStep1 from "./components/games/spotTikka/step1";
import SpotTikkaStep2 from "./components/games/spotTikka/step2";
import SpotTikkaStep3 from "./components/games/spotTikka/step3";
import SpotTikkaResult from "./components/games/spotTikka/result";

import WordsStep1 from "./components/games/words/step1";
import WordsStep2 from "./components/games/words/step2";
import WordsStep3 from "./components/games/words/step3";
import WordsResult from "./components/games/words/result";

import PuzzleStep1 from "./components/games/puzzle/step1";
import PuzzleStep2 from "./components/games/puzzle/step2";
import PuzzleStep3 from "./components/games/puzzle/step3";
import PuzzleResult from "./components/games/puzzle/result";

import ChamberStep1 from "./components/games/chamber/step1";
import ChamberStep2 from "./components/games/chamber/step2";
import ChamberStep3 from "./components/games/chamber/step3";
import ChamberResult from "./components/games/chamber/result";

import OwnTikkaStep1 from "./components/games/ownTikka/step1";
import OwnTikkaStep2 from "./components/games/ownTikka/step2";
import OwnTikkaStep3 from "./components/games/ownTikka/step3";
import OwnTikkaResult from "./components/games/ownTikka/result";

import Feedback from "./components/feedback";
import Thankyou from "./components/thankyou";

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

  const ScratchGame = [
    <ScratchStep1 step={step} next={next} prev={prev} reset={reset} />,
    <ScratchStep2 step={step} next={next} prev={prev} reset={reset} />,
    <ScratchStep3 step={step} next={next} prev={prev} reset={reset} />,
    <ScratchResult step={step} next={next} prev={prev} reset={reset} />,
  ];

  const SareeGame = [
    <SareeStep1 step={step} next={next} prev={prev} reset={reset} />,
    <SareeStep2 step={step} next={next} prev={prev} reset={reset} />,
    <SareeStep3 step={step} next={next} prev={prev} reset={reset} />,
    <SareeResult step={step} next={next} prev={prev} reset={reset} />,
  ];

  const SpotTikka = [
    <SpotTikkaStep1 step={step} next={next} prev={prev} reset={reset} />,
    <SpotTikkaStep2 step={step} next={next} prev={prev} reset={reset} />,
    <SpotTikkaStep3 step={step} next={next} prev={prev} reset={reset} />,
    <SpotTikkaResult step={step} next={next} prev={prev} reset={reset} />,
  ];

  const WordsGame = [
    <WordsStep1 step={step} next={next} prev={prev} reset={reset} />,
    <WordsStep2 step={step} next={next} prev={prev} reset={reset} />,
    <WordsStep3 step={step} next={next} prev={prev} reset={reset} />,
    <WordsResult step={step} next={next} prev={prev} reset={reset} />,
  ];

  const PuzzleGame = [
    <PuzzleStep1 step={step} next={next} prev={prev} reset={reset} />,
    <PuzzleStep2 step={step} next={next} prev={prev} reset={reset} />,
    <PuzzleStep3 step={step} next={next} prev={prev} reset={reset} />,
    <PuzzleResult step={step} next={next} prev={prev} reset={reset} />,
  ];

  const ChamberGame = [
    <ChamberStep1 step={step} next={next} prev={prev} reset={reset} />,
    <ChamberStep2 step={step} next={next} prev={prev} reset={reset} />,
    <ChamberStep3 step={step} next={next} prev={prev} reset={reset} />,
    <ChamberResult step={step} next={next} prev={prev} reset={reset} />,
  ];

  const OwnTikkaGame = [
    <OwnTikkaStep1 step={step} next={next} prev={prev} reset={reset} />,
    <OwnTikkaStep2 step={step} next={next} prev={prev} reset={reset} />,
    <OwnTikkaStep3 step={step} next={next} prev={prev} reset={reset} />,
    <OwnTikkaResult step={step} next={next} prev={prev} reset={reset} />,
  ];

  const components = [
    <Overlay next={next} />,
    <Welcome next={next} />,
    ...ScratchGame,
    ...SareeGame,
    SpotTikka,
    WordsGame,
    PuzzleGame,
    ChamberGame,
    OwnTikkaGame,
    <Feedback />,
    <Thankyou />,
  ];
  return components[step];
}
