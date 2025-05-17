import { useSelector } from "react-redux";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";
import ScratchCard from "../../components/scratchCard";

const ScratchStep1 = () => {
  const userData = useSelector((state: any) => state.user.userData);
  return (
    <>
      <Menu isOpen={userData.menu} />
      <GameStepper iswhite />
      <ScratchCard />
    </>
  );
};

export default ScratchStep1;
