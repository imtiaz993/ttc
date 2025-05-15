import Image from "next/image";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";

const PuzzleStep1 = () => {
  return (
    <>
      <Menu />
      <GameStepper showPrev={false} />
      <div
        style={{
          backgroundImage: "url('/images/yellow-bg.png')",
          backgroundSize: "cover",
          backgroundRepeat: "round",
        }}
        className="h-full pt-16 px-4 flex flex-col justify-start items-center"
      >
        <div className="w-full flex justify-between items-start mb-4">
          <p>9th June, 1886</p>
          <div>
            <Image
              src="/images/ajji.png"
              priority={true}
fetchPriority="high"
              sizes="100vw"
              height={0}
              width={0}
              alt=""
              className="w-11 rounded-lg"
            />
            <p className="mt-1 text-xs font-medium text-center">Ajji</p>
          </div>
        </div>
        <p className="text-sm mb-6">
          My brother cut up my newest ticket when playing with his pair of
          scissors!
          <br />
          He makes me so mad at times!
        </p>
        <div className="flex justify-center items-center">
          <Image
            src="/images/puzzle.png"
            priority={true}
fetchPriority="high"
            sizes="100vw"
            height={0}
            width={0}
            alt=""
            className="w-72"
          />
        </div>
      </div>
    </>
  );
};

export default PuzzleStep1;
