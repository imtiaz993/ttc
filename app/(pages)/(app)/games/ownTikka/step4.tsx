import { useDispatch, useSelector } from "react-redux";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";
import { nextStep } from "../../../../redux/slices/navigationSlice";

const OwnTikkaStep4 = () => {
  const userData = useSelector((state: any) => state.user.userData);
  const dispatch = useDispatch();
  const next = () => dispatch(nextStep());

  return (
    <>
      <Menu />
      <GameStepper showNext={false} showPrev={false} />
      <div className="h-full pt-16 px-4 flex flex-col justify-start items-center bg-[#FFF8E7]">
        <div className="flex justify-center items-center mb-16">
          <img src="/images/own-tikka-final.png" alt="" className="w-80" />
        </div>
        <div className="w-full flex items-start mb-10">
          <div>
            <img
              src={`/images/${userData.char}.png`}
              alt=""
              className="w-11 rounded-lg"
            />
            <p className="mt-1 text-xs font-medium text-center">You</p>
          </div>
          <p className="ml-4 font-medium w-[calc(100%-44px)]">
            Look at that! I just made my first Tika. I should save it.
          </p>
        </div>
        <div className="w-full grid grid-cols-2 gap-4">
          <button
            onClick={() => {
              next();
            }}
            className="border border-black bg-transparent rounded font-semibold flex justify-center py-3 w-full"
          >
            <img src="/icons/download.svg" alt="" className="w-6 mr-2" />
            Download
          </button>
          <button
            onClick={() => {
              next();
            }}
            className="text-[#FFF8E7] font-semibold rounded flex justify-center bg-black border border-black py-3 w-full"
          >
            <img src="/icons/share.svg" alt="" className="w-6 mr-2" />
            Share
          </button>
        </div>
      </div>
    </>
  );
};

export default OwnTikkaStep4;
