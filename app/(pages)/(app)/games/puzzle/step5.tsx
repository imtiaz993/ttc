import { useSelector } from "react-redux";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";

const PuzzleStep5 = () => {
  const userData = useSelector((state: any) => state.user.userData);
  return (
    <>
      <Menu />
      <GameStepper showPrev={false} />
      <div className="h-full pt-16 px-4 flex flex-col justify-between items-center bg-[#FFF8E7]">
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
          <div>
            <div
              style={{ animationDelay: "1s", animationFillMode: "forwards" }}
              className="shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] absolute left-0 -top-12  w-[152px] py-3 px-4 bg-[#243200] text-white rounded-lg text-xs fade-in bg-opacity-50 opacity-0"
            >
              What are all these tickets trying to say?
            </div>
            <img
              className="absolute left-[126px] top-1 fade-in2 opacity-0"
              src="/icons/union.svg"
              alt=""
              style={{ animationDelay: "1.5s", animationFillMode: "forwards" }}
            />
          </div>

          <div>
            <div
              className="shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] absolute left-8 -bottom-11 w-[152px] py-3 px-4 bg-[#243200] text-white rounded-lg text-xs fade-in bg-opacity-50 opacity-0"
              style={{ animationDelay: "2s", animationFillMode: "forwards" }}
            >
              How did they survive all these centuries?
            </div>
            <img
              className="absolute left-[35px] top-[233px] fade-in2 opacity-0 rotate-180"
              src="/icons/union.svg"
              alt=""
              style={{ animationDelay: "2.5s", animationFillMode: "forwards" }}
            />
          </div>

          <div>
            <div
              className="shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] absolute -right-2 top-28 w-[150px] py-3 px-4 bg-[#243200] text-white rounded-lg text-xs fade-in bg-opacity-50 opacity-0"
              style={{ animationDelay: "3s", animationFillMode: "forwards" }}
            >
              Take a small pause to reflect..
            </div>
            <img
              className="absolute -right-[8px] top-[164px]  fade-in2 opacity-0"
              src="/icons/union.svg"
              alt=""
              style={{ animationDelay: "3.5s", animationFillMode: "forwards" }}
            />
          </div>
          <div>
            <div
              className="shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] absolute -right-2 -bottom-28 w-[150px] py-3 px-4 bg-[#243200] text-white rounded-lg text-xs fade-in bg-opacity-50 opacity-0"
              style={{ animationDelay: "4s", animationFillMode: "forwards" }}
            >
              Who were they meant to attract?
            </div>
            <img
              className="absolute  right-[112px] top-[301px] rotate-180 fade-in2 opacity-0"
              src="/icons/union.svg"
              alt=""
              style={{ animationDelay: "4.5s", animationFillMode: "forwards" }}
            />
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
