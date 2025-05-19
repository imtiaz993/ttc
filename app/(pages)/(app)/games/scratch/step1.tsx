import { useState } from "react";
import { useSelector } from "react-redux";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";
import ScratchCard from "../../components/scratchCard";

const ScratchStep1 = () => {
  const userData = useSelector((state: any) => state.user.userData);
  const [isRevealed, setIsRevealed] = useState(false);
  return (
    <>
      <Menu isOpen={userData.menu} />
      <GameStepper iswhite />
      <ScratchCard
        isRevealed={isRevealed}
        setIsRevealed={setIsRevealed}
        animation={!userData.menu}
      />
    </>
  );
};

export default ScratchStep1;
