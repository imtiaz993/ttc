import React, { useState } from "react";
import Image from "next/image";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";

const WordsStep2 = () => {
  const [overlay, setOverlay] = useState(true);
  const [word, setWord] = useState("");
  const [words, setWords] = useState([
    {
      id: 1,
      word: "Quality",
      isCustom: false,
    },
    {
      id: 2,
      word: "Royalty",
      isCustom: false,
    },
    {
      id: 3,
      word: "Nature",
      isCustom: false,
    },
    {
      id: 4,
      word: "Affordability",
      isCustom: false,
    },
    {
      id: 5,
      word: "Originality",
      isCustom: false,
    },
    {
      id: 6,
      word: "Fashion",
      isCustom: false,
    },
    {
      id: 7,
      word: "Durability",
      isCustom: false,
    },
    {
      id: 8,
      word: "Strength",
      isCustom: false,
    },
  ]);
  const [selectedWords, setSelectedWords] = useState([]);

  return (
    <>
      <Menu isGameOptions={true} />
      <GameStepper />
      {overlay && (
        <div>
          <div className="fixed inset-0 bg-[#00000040] z-30"></div>
          <div className="fixed z-40 h-fit w-11/12 inset-0 rounded py-3 px-4 bg-[#FDD931] mx-auto left-1/2 top-1/2 transform -translate-x-1/2">
            <div className="w-full flex justify-between items-start mb-2">
              <Image
                src="/icons/question-mark.svg"
                priority={true}
                sizes="100vw"
                height={0}
                width={0}
                alt=""
                className="w-6"
              />
              <p className="ml-2 text-xs font-semibold w-[calc(100%-24px)]">
                Why choose a warrior to advertise cotton cloth?
              </p>
              <Image
                src="/icons/close-black.svg"
                priority={true}
                sizes="100vw"
                height={0}
                width={0}
                alt=""
                className="w-6"
                onClick={() => {
                  setOverlay(false);
                }}
              />
            </div>
            <p className="mt-2 text-xs">
              Look closely at the tika and click all the words you  think it
              could signify!
            </p>
          </div>
        </div>
      )}
      <div className="h-full pt-16 px-4 flex flex-col justify-start pb-24 items-center bg-[#FFF8E7]">
        <div className="flex justify-center items-center">
          <Image
            src="/images/graham-bombay.png"
            priority={true}
            sizes="100vw"
            height={0}
            width={0}
            alt=""
            className="w-36"
          />
        </div>
        <div className="w-full mt-6">
          <div className="flex flex-wrap gap-4 max-h-64 overflow-auto">
            {words.map((i, index) => (
              <div
                key={index}
                onClick={() => {
                  if (selectedWords.find((word) => word.id === i.id)) {
                    setSelectedWords(
                      selectedWords.filter((word) => word.id !== i.id)
                    );
                  } else {
                    setSelectedWords([...selectedWords, i]);
                  }
                }}
                className={` rounded p-3 text-sm font-semibold flex items-center gap-2 ${
                  selectedWords.find((word) => word.id === i.id)
                    ? "bg-[#2D6A42] text-white border border-[#2D6A42]"
                    : "bg-transparent text-black border border-black"
                }`}
              >
                {i.isCustom && (
                  <Image
                    src={
                      selectedWords.find((word) => word.id === i.id)
                        ? "/icons/close.svg"
                        : "/icons/close-black.svg"
                    }
                    priority={true}
                    sizes="100vw"
                    height={0}
                    width={0}
                    alt=""
                    className="w-5"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (selectedWords.find((word) => word.id === i.id)) {
                        setSelectedWords(
                          selectedWords.filter((word) => word.id !== i.id)
                        );
                      }
                      setWords(words.filter((word) => word.id !== i.id));
                    }}
                  />
                )}
                {i.word}
              </div>
            ))}
          </div>
          <div className="mt-5 pb-2 border-b border-[#223100] flex justify-between">
            <input
              type="text"
              value={word}
              onChange={(e) => {
                setWord(e.target.value);
              }}
              placeholder="Any more that come to mind? Add them here"
              className="outline-none placeholder:text-[#00000040] text-sm font-semibold bg-transparent w-full"
            />
            <Image
              src="/icons/plus.svg"
              priority={true}
              sizes="100vw"
              height={0}
              width={0}
              alt=""
              className="w-6"
              onClick={() => {
                if (word) {
                  setWords([
                    ...words,
                    {
                      id: words.length + 1,
                      word: word,
                      isCustom: true,
                    },
                  ]);
                  setWord("");
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WordsStep2;
