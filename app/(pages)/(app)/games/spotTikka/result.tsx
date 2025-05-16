import Success from "./success";
import Failure from "./failure";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";

const SpotTikkaResult = () => {
  const success = true;

  return (
    <>
      <Menu />
      <GameStepper showNext={false} showPrev={false} />{" "}
      {success ? <Success /> : <Failure />}
    </>
  );
};

export default SpotTikkaResult;
