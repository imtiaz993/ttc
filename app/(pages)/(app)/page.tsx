"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { toggleMute } from "../../redux/slices/userSlice";

import Welcome from "./components/welcome";

import ScratchStep1 from "./games/scratch/step1";
const ScratchStep2 = dynamic(() => import("./games/scratch/step2"), {
  ssr: false,
});

import SareeStep1 from "./games/saree/step1";
import SareeStep2 from "./games/saree/step2";
import SareeStep3 from "./games/saree/step3";

// import SpotTikkaStep1 from "./games/spotTikka/step1";
// import SpotTikkaStep2 from "./games/spotTikka/step2";

// import WordsStep1 from "./games/words/step1";
// import WordsStep2 from "./games/words/step2";

// import PuzzleStep1 from "./games/puzzle/step1";
// import PuzzleStep2 from "./games/puzzle/step2";
// import PuzzleStep3 from "./games/puzzle/step3";
// import PuzzleStep4 from "./games/puzzle/step4";
// import PuzzleStep5 from "./games/puzzle/step5";

// import OwnTikkaStep1 from "./games/ownTikka/step1";
// import OwnTikkaStep2 from "./games/ownTikka/step2";
// import OwnTikkaStep3 from "./games/ownTikka/step3";
// import OwnTikkaStep4 from "./games/ownTikka/step4";

import Feedback from "./components/feedback";
import Thankyou from "./components/thankyou";

export default function Home() {
  const dispatch = useDispatch();
  const step = useSelector((state: any) => state.navigation.step);
  const isMuted = useSelector((state: any) => state.user.isMuted);
  const handleToggleMute = (data) => dispatch(toggleMute(data));
  const bgMusicRef = useRef(null);

  useEffect(() => {
    const audioFiles = ["/audio/Music 1.mp3", "/audio/Music 2.mp3"];
    let currentIndex = 0;

    bgMusicRef.current = new Audio(audioFiles[currentIndex]);
    bgMusicRef.current.loop = false; // Disable loop for sequential play
    bgMusicRef.current.muted = isMuted;

    const playNext = () => {
      currentIndex++;
      if (currentIndex < audioFiles.length) {
        bgMusicRef.current.src = audioFiles[currentIndex];
        bgMusicRef.current
          .play()
          .catch((error) => console.error("Play failed:", error));
      }
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
    if (bgMusicRef.current) {
      bgMusicRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const ScratchGame = [<ScratchStep1 />, <ScratchStep2 />];

  const SareeGame = [<SareeStep1 />, <SareeStep2 />, <SareeStep3 />];

  // const SpotTikka = [<SpotTikkaStep1 />, <SpotTikkaStep2 />];

  // const WordsGame = [<WordsStep1 />, <WordsStep2 />];

  // const PuzzleGame = [
  //   <PuzzleStep1 />,
  //   <PuzzleStep2 />,
  //   <PuzzleStep3 />,
  //   <PuzzleStep4 />,
  //   <PuzzleStep5 />,
  // ];

  // const OwnTikkaGame = [
  //   <OwnTikkaStep1 />,
  //   <OwnTikkaStep2 />,
  //   <OwnTikkaStep3 />,
  //   <OwnTikkaStep4 />,
  // ];

  const components = [
    <Welcome playMusic={playMusic} />,
    ...ScratchGame,
    ...SareeGame,
    // ...SpotTikka,
    // ...WordsGame,
    // ...PuzzleGame,
    // ...OwnTikkaGame,
    <Feedback />,
    <Thankyou />,
  ];
  return components[step - 1];
}
