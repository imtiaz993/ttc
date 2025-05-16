import { useSelector } from "react-redux";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";

const PuzzleStep4 = () => {
  const userData = useSelector((state: any) => state.user.userData);
  return (
    <>
      <Menu />
      <GameStepper showPrev={false} />
      <div className="h-full pt-16 px-4 flex flex-col justify-between pb-24 items-center bg-[#FFF8E7]">
        <div>
          <div className="w-full flex items-start mb-6">
            <div>
              <img
                src={`/images/${userData.char}.png`}
                alt=""
                className="w-11 rounded-lg"
              />
              <p className="mt-1 text-xs font-medium text-center">You</p>
            </div>
            <p className="ml-4 font-medium w-[cacl(100%-46px)]">
              Wow! A wall of modern wonders - some oddly familiar, some utterly
              bizarre
            </p>
          </div>
          <div className="w-full flex justify-center mt-6">
            <img src="/images/three-arts.png" alt="" className="w-11/12" />
          </div>
        </div>
        <div className="bg-[#FDD931] rounded py-3 px-4 w-full mt-10">
          <div className="w-full flex items-center mb-2">
            <img src="/icons/zoom-in.svg" alt="" className="w-6" />
            <p className="ml-2 text-xs font-semibold w-[calc(100%-24px)]">
              A secret chamber calls you…
            </p>
          </div>
          <p className="mt-2 text-xs">
            Once inside, you’ll know what to do next!
          </p>
        </div>
      </div>
    </>
  );
};

export default PuzzleStep4;
