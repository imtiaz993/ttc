import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";

const PuzzleStep1 = () => {
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
                <div className="w-full flex justify-between items-start mb-4">
                    <p className="font-playwriteDEGrund">9th June, 1886</p>
                    <div>
                        <img src="/images/kamla.png" alt="" className="w-11 rounded-lg" />
                        <p className="mt-1 text-xs font-medium text-center font-manrope">Ajji</p>
                    </div>
                </div>
                <p className="text-sm mb-6 ont-playwriteDEGrund">
                    My brother cut up my newest ticket when playing with his pair of
                    scissors!
                    <br />
                    He makes me so mad at times!
                </p>
                <div className="flex justify-center items-center">
                    <img src="/icons/puzzle.svg" alt="" className="w-72" />
                </div>
            </div>
        </>
    );
};

export default PuzzleStep1;
