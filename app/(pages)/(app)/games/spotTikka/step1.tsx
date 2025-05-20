import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";

const SpotTikkaStep1 = () => {
  return (
    <>
      <Menu />
      <GameStepper iswhite />
      <div
        style={{
          backgroundImage: "url('/images/yellow-bg.png')",
          backgroundSize: "cover",
          backgroundRepeat: "round",
        }}
        className="h-full pt-16 px-4 flex flex-col justify-start items-center"
      >
        <div className="w-full flex justify-between items-start mb-4 ">
          <p className="font-playwriteDEGrund">30th April, 1886</p>
          <div>
            <img src="/images/kamla.png" alt="" className="w-11 rounded-lg" />
            <p className="mt-1 text-xs font-medium text-center font-manrope">Ajji</p>
          </div>
        </div>
        <p className="text-sm mb-10 font-playwriteDEGrund">
          From the extraordinary to the everyday, tikas ran a range of design.
          What imaginations their creators must have!
          <br />
          <br />I am collecting more tikas to figure what their inspirations
          were. Alas, this one just got ripped apart by my clumsy efforts!
        </p>
        <div className="flex justify-center items-center">
          <img src="/images/spot-tikka.png" alt="" className="w-52" />
        </div>
      </div>
    </>
  );
};

export default SpotTikkaStep1;
