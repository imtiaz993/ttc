"use client";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMute } from "../../redux/slices/userSlice";
import { nextStep, prevStep } from "../../redux/slices/navigationSlice";

import Welcome from "./components/welcome";

import ScratchStep1 from "./games/scratch/step1";
import ScratchStep2 from "./games/scratch/step2";
import ScratchStep3 from "./games/scratch/step3";

import SareeStep1 from "./games/saree/step1";
import SareeStep2 from "./games/saree/step2";
import SareeStep3 from "./games/saree/step3";

import SpotTikkaStep1 from "./games/spotTikka/step1";
import SpotTikkaStep2 from "./games/spotTikka/step2";

import WordsStep1 from "./games/words/step1";
import WordsStep2 from "./games/words/step2";

import PuzzleStep1 from "./games/puzzle/step1";
import PuzzleStep2 from "./games/puzzle/step2";
import PuzzleStep3 from "./games/puzzle/step3";
import PuzzleStep4 from "./games/puzzle/step4";
import PuzzleStep5 from "./games/puzzle/step5";

import OwnTikkaStep1 from "./games/ownTikka/step1";
import OwnTikkaStep2 from "./games/ownTikka/step2";
import OwnTikkaStep3 from "./games/ownTikka/step3";
import OwnTikkaStep4 from "./games/ownTikka/step4";

import Feedback from "./components/feedback";
import Thankyou from "./components/thankyou";
import GameStepper from "./components/gameStepper";
import WordsStep3 from "./games/words/step3";

export default function Home() {
  const dispatch = useDispatch();
  const next = () => dispatch(nextStep());
  const prev = () => dispatch(prevStep());
  const stepper = useSelector((state: any) => state.stepper);
  const step = useSelector((state: any) => state.navigation.step);
  const userData = useSelector((state: any) => state.user);
  const handleToggleMute = (data) => dispatch(toggleMute(data));
  const bgMusicRef = useRef(null);

  const [dragStartX, setDragStartX] = useState(0);
  const [dragPosition, setDragPosition] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const handleDragStart = (e) => {
    setIsSwiping(true);
    setDragStartX(e.type === "touchstart" ? e.touches[0].clientX : e.clientX);
  };

  const handleDragMove = (e) => {
    if (!isSwiping) return;
    const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    const diffX = clientX - dragStartX;
    setDragPosition(diffX);
  };

  const handleDragEnd = (data?: any, callback?: any) => {
    const screenWidth = window.innerWidth;
    if (dragPosition < -screenWidth * 0.25) {
      if (data.forward && callback) {
        callback();
      } else if (
        ![1, 11, 22, 23].includes(step) &&
        !stepper.showCamera &&
        stepper.showNext &&
        userData.userData.showMenu == false &&
        userData.userData.overlay == false
      ) {
        next();
      }
    } else if (
      dragPosition > screenWidth * 0.25 &&
      ![1, 22, 23].includes(step) &&
      stepper.showPrev &&
      userData.userData.showMenu == false &&
      userData.userData.overlay == false
    ) {
      prev();
    }
    setDragStartX(0);
    setDragPosition(0);
    setIsSwiping(false);
  };

  useEffect(() => {
    const audioFiles = ["/audio/Music 1.mp3", "/audio/Music 2.mp3"];
    let currentIndex = 0;

    bgMusicRef.current = new Audio(audioFiles[currentIndex]);
    bgMusicRef.current.loop = false; // Disable loop for sequential play

    const playNext = () => {
      currentIndex = (currentIndex + 1) % audioFiles.length; // Reset to 0 when reaching the end
      bgMusicRef.current.src = audioFiles[currentIndex];
      bgMusicRef.current
        .play()
        .catch((error) => console.error("Play failed:", error));
    };

    bgMusicRef.current.addEventListener("ended", playNext);

    handleToggleMute(false);

    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current.removeEventListener("ended", playNext);
        bgMusicRef.current = null;
      }
    };
  }, []);

  const playMusic = () => {
    if (bgMusicRef.current) {
      bgMusicRef.current
        .play()
        .catch((error) => console.error("Play failed:", error));
    }
  };

  useEffect(() => {
    if (bgMusicRef.current && userData.isMuted) {
      bgMusicRef.current.pause();
    } else {
      bgMusicRef.current.play();
    }
  }, [userData.isMuted]);

  const ScratchGame = [
    <ScratchStep1 playMusic={playMusic} />,
    <ScratchStep2 />,
    <ScratchStep3 />,
  ];

  const SareeGame = [<SareeStep1 />, <SareeStep2 />, <SareeStep3 />];

  const SpotTikka = [<SpotTikkaStep1 />, <SpotTikkaStep2 />];

  const WordsGame = [
    <WordsStep1 />,
    <WordsStep2
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    />,
    <WordsStep3 />,
  ];

  const PuzzleGame = [
    <PuzzleStep1 />,
    <PuzzleStep2 />,
    <PuzzleStep3 />,
    <PuzzleStep4 />,
    <PuzzleStep5 />,
  ];

  const OwnTikkaGame = [
    <OwnTikkaStep1 />,
    <OwnTikkaStep2 />,
    <OwnTikkaStep3 />,
    <OwnTikkaStep4 />,
  ];

  const components = [
    <Welcome
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    />,
    ...ScratchGame,
    ...SareeGame,
    ...SpotTikka,
    ...WordsGame,
    ...PuzzleGame,
    ...OwnTikkaGame,
    <Feedback />,
    <Thankyou />,
  ];

  return (
    <>
      <div
        className="h-dvh max-h-[1000px]"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        {![1, 22, 23].includes(step) && <GameStepper />}
        {components[step - 1]}
      </div>
    </>
  );
}
