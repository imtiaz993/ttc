import dynamic from "next/dynamic";
import { useState } from "react";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";

const ScratchCard = dynamic(() => import("../../components/scratchCard"), {
  ssr: false,
});

const ScratchStep1 = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  return (
    <>
      <Menu />
      <GameStepper iswhite />
      <ScratchCard isRevealed={isRevealed} setIsRevealed={setIsRevealed} />
    </>
  );
};

export default ScratchStep1;
