import { useSelector } from "react-redux";
import Menu from "../../components/menu";

const WordsStep3 = () => {
  const userData = useSelector((state: any) => state.user.userData);
  return (
    <>
      <Menu />
      <div className="h-full pt-16 pb-24 px-4 flex flex-col justify-between items-center bg-[#FFF8E7] font-manrope">
        <div className="w-full flex justify-between items-start">
          <div>
            <img
              src={`/images/${userData.char}.png`}
              alt=""
              className="w-11 rounded-lg"
            />
            <p className="mt-1 text-sm font-medium text-center">You</p>
          </div>
          <div className="ml-4 w-[calc(100%-46px-16px)]">
            <p className="font-medium">
              I am beginning to see that tickets could mean whatever people
              wanted them to mean. 
              <br /> Different strokes for different folk, I suppose.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 max-h-80 overflow-auto">
          {[
            {
              id: 1,
              word: "Strength",
              isCustom: false,
            },
            {
              id: 2,
              word: "Royalty",
              isCustom: false,
            },
            {
              id: 3,
              word: "Fashion",
              isCustom: false,
            },
            {
              id: 4,
              word: "Affordability",
              isCustom: false,
            },
            {
              id: 5,
              word: "Sustainability",
              isCustom: false,
            },
            {
              id: 6,
              word: "Originality",
              isCustom: false,
            },
            {
              id: 7,
              word: "Magic",
              isCustom: false,
            },
            {
              id: 6,
              word: "Originality",
              isCustom: false,
            },
            {
              id: 7,
              word: "Magic",
              isCustom: false,
            },
            {
              id: 6,
              word: "Originality",
              isCustom: false,
            },
            {
              id: 7,
              word: "Magic",
              isCustom: false,
            },
            {
              id: 6,
              word: "Originality",
              isCustom: false,
            },
            {
              id: 7,
              word: "Magic",
              isCustom: false,
            },
            {
              id: 6,
              word: "Originality",
              isCustom: false,
            },
            {
              id: 7,
              word: "Magic",
              isCustom: false,
            },
            {
              id: 6,
              word: "Originality",
              isCustom: false,
            },
            {
              id: 7,
              word: "Magic",
              isCustom: false,
            },
          ].map((i, index) => (
            <div
              key={index}
              className="flex-1 max-w-[calc(50%-0.5rem)] min-w-[calc(33.33%-1rem)] rounded p-3 px-8 text-sm font-semibold flex justify-center items-center gap-2 bg-[#2D6A42] text-white border border-[#2D6A42]"
            >
              {i.word}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WordsStep3;
