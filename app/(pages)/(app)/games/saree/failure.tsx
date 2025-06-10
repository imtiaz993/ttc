import { useDispatch } from "react-redux";
import { nextStep } from "../../../../redux/slices/navigationSlice";
import failureAnimation from "../../../animation//Try again.json";
import dynamic from "next/dynamic";

const Animation = dynamic(() => import("../../components/animation"), {
  ssr: false,
});

const Failure = ({ finalColor, resultColor, results, undo, sareePath }) => {
  const dispatch = useDispatch();
  const next = () => dispatch(nextStep());
  return (
    <div
      id="screen-12"
      className="h-full pt-16 px-4 flex flex-col justify-start items-center bg-[#FFF8E7] font-manrope"
    >
      <Animation animation={failureAnimation} height={92} width={92} />
      <div className="my-6">
        <p className="font-semibold text-sm mb-2 text-center">
          Uh, oh! That wasn't what was supposed to happen.
        </p>
        <p className="text-sm text-center">
          You just created {results?.find((i) => i.color == finalColor)?.name}{" "}
          instead of <span className="font-bold"> {resultColor.name}</span>
        </p>
        <p className="text-sm text-center"> Would you like to try again?</p>
      </div>
      <div>
        <img src={sareePath} alt="" className="w-52" />
      </div>
      <div className="w-full grid grid-cols-2 gap-4 mt-auto mb-14">
        <button
          onClick={() => {
            next();
          }}
          className="border border-black bg-transparent rounded font-semibold flex justify-center py-3 w-full"
        >
          <img src="/icons/skip.svg" alt="" className="w-6 mr-2" />
          Skip
        </button>
        <button
          onClick={() => {
            undo(finalColor);
          }}
          className="text-[#FFF8E7] font-semibold rounded flex justify-center bg-black border border-black py-3 w-full"
        >
          <img src="/icons/refresh.svg" alt="" className="w-6 mr-2" />
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Failure;
