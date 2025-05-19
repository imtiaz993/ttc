import { useSelector } from "react-redux";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";

const PuzzleStep5 = () => {
  const userData = useSelector((state: any) => state.user.userData);
  return (
    <>
      <Menu />
      <GameStepper showPrev={false} />
      <div className="h-full pt-16 px-4 flex flex-col justify-between items-center bg-[#FFF8E7] font-manrope">
        <div className="w-full flex items-start mb-6">
          <div>
            <img
              src={`/images/${userData.char}.png`}
              alt=""
              className="w-11 rounded-lg"
            />
            <p className="mt-1 text-xs font-medium text-center">You</p>
          </div>
          <p className="ml-4 font-medium w-[calc(100%-46px)]">
            The more I look, the more I am surrounded by tikas!
          </p>
        </div>
        <div className="relative w-full">
          <div
            className="w-[154px] absolute left-0 -top-12 fade-in opacity-0"
            style={{ animationDelay: "1s", animationFillMode: "forwards" }}
          >
            <p className="py-3 px-4 text-xs absolute text-white z-10">
              What are all these tickets trying to say?
            </p>
            <img className="relative" src="/icons/cloud.svg" alt="" />
          </div>
          <div
            className="w-[154px] absolute left-8 -bottom-11 fade-in opacity-0"
            style={{ animationDelay: "3s", animationFillMode: "forwards" }}
          >
            <p className="py-3 px-4 text-xs absolute bottom-0 text-white z-10">
              How did they survive all these centuries?
            </p>
            <img className="relative rotate-180" src="/icons/cloud.svg" alt="" />
          </div>
          <div
            className="w-[154px] absolute -right-2 top-28 fade-in opacity-0"
            style={{ animationDelay: "2s", animationFillMode: "forwards" }}
          >
            <p className="py-3 px-4 text-xs absolute text-white z-10">
              Take a small pause to reflect..
            </p>
            <img className="relative" src="/icons/cloud.svg" alt="" />
          </div>
          <div
            className="w-[154px] absolute -right-2 -bottom-28 fade-in opacity-0"
            style={{ animationDelay: "4s", animationFillMode: "forwards" }}
          >
            <p className="py-3 px-4 bottom-0 text-xs absolute text-white z-10">
              Who were they meant to attract?
            </p>
            <img className="relative rotate-180" src="/icons/cloud.svg" alt="" />
          </div>
          <div className="flex justify-center items-center">
            <img src="/images/manchester.png" alt="" className="w-52" />
          </div>
        </div>
        <div className="h-28"></div>
      </div>
    </>
  );
};

export default PuzzleStep5;
