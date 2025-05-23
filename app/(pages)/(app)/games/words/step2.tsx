import { useEffect, useState } from "react";
import Menu from "../../components/menu";
import {
  resetStepperProps,
  setStepperProps,
} from "../../../../redux/slices/progressSlice";
import { useDispatch } from "react-redux";

const wordsInitialData = [
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
];

const WordsStep2 = () => {
  const [overlay, setOverlay] = useState(true);
  const [word, setWord] = useState("");
  const [undoDisabled, setUndoDisabled] = useState(false);
  const [words, setWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [customWordCount, setCustomWordCount] = useState(0);

  const dispatch = useDispatch();

  // Load words and selectedWords from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load words
      const storedWords = localStorage.getItem("wordsData");
      if (storedWords) {
        const parsedWords = JSON.parse(storedWords);
        setWords(parsedWords);
        const customCount = parsedWords.filter((w) => w.isCustom).length;
        setCustomWordCount(customCount);
      } else {
        setWords(wordsInitialData);
        localStorage.setItem("wordsData", JSON.stringify(wordsInitialData));
        setCustomWordCount(0);
      }

      // Load selectedWords
      const storedSelectedWords = localStorage.getItem("selectedWordsData");
      if (storedSelectedWords) {
        setSelectedWords(JSON.parse(storedSelectedWords));
      } else {
        setSelectedWords([]);
        localStorage.setItem("selectedWordsData", JSON.stringify([]));
      }
    }
  }, []);

  // Update undo button state
  useEffect(() => {
    if (selectedWords.length || words.length > wordsInitialData.length) {
      setUndoDisabled(false);
    } else {
      setUndoDisabled(true);
    }
  }, [selectedWords, words]);

  // Update stepper props
  useEffect(() => {
    dispatch(
      setStepperProps({
        showPrev: false,
      })
    );
    return () => {
      dispatch(resetStepperProps());
    };
  }, [dispatch]);

  const handleAddWord = () => {
    if (word && customWordCount < 2) {
      const newWord = {
        id: words.length + 1,
        word: word,
        isCustom: true,
      };
      const updatedWords = [...words, newWord];
      const updatedSelectedWords = [...selectedWords, newWord];
      setWords(updatedWords);
      setSelectedWords(updatedSelectedWords);
      setWord("");
      setCustomWordCount(customWordCount + 1);
      // Save to localStorage
      localStorage.setItem("wordsData", JSON.stringify(updatedWords));
      localStorage.setItem(
        "selectedWordsData",
        JSON.stringify(updatedSelectedWords)
      );
    }
  };

  const handleRemoveWord = (wordId) => {
    const wordToRemove = words.find((word) => word.id === wordId);
    if (wordToRemove.isCustom) {
      const updatedWords = words.filter((word) => word.id !== wordId);
      const updatedSelectedWords = selectedWords.filter(
        (word) => word.id !== wordId
      );
      setWords(updatedWords);
      setSelectedWords(updatedSelectedWords);
      setCustomWordCount(customWordCount - 1);
      // Update localStorage
      localStorage.setItem("wordsData", JSON.stringify(updatedWords));
      localStorage.setItem(
        "selectedWordsData",
        JSON.stringify(updatedSelectedWords)
      );
    }
  };

  const handleSelectWord = (wordItem) => {
    if (selectedWords.find((word) => word.id === wordItem.id)) {
      const updatedSelectedWords = selectedWords.filter(
        (word) => word.id !== wordItem.id
      );
      setSelectedWords(updatedSelectedWords);
      localStorage.setItem(
        "selectedWordsData",
        JSON.stringify(updatedSelectedWords)
      );
    } else {
      const updatedSelectedWords = [...selectedWords, wordItem];
      setSelectedWords(updatedSelectedWords);
      localStorage.setItem(
        "selectedWordsData",
        JSON.stringify(updatedSelectedWords)
      );
    }
  };

  const handleUndo = () => {
    setSelectedWords([]);
    setWords(wordsInitialData);
    setCustomWordCount(0);
    // Reset localStorage
    localStorage.setItem("wordsData", JSON.stringify(wordsInitialData));
    localStorage.setItem("selectedWordsData", JSON.stringify([]));
  };

  return (
    <>
      <Menu
        isGameOptions={true}
        handleInfo={() => {
          setOverlay(true);
        }}
        isUndoDisabled={undoDisabled}
        handleUndo={handleUndo}
      />
      {overlay && (
        <div>
          <div className="fixed inset-0 bg-[#00000040] z-30"></div>
          <div className="fixed z-40 h-fit w-11/12 inset-0 rounded py-3 px-4 bg-[#FDD931] mx-auto left-1/2 top-1/2 transform -translate-x-1/2 font-manrope">
            <div className="w-full flex justify-between items-center mb-2">
              <img src="/icons/psychology.svg" alt="" className="w-6" />
              <p className="ml-2 text-sm font-semibold w-[calc(100%-24px)]">
                A warrior to advertise cotton cloth?
              </p>
              <img
                src="/icons/close-black.svg"
                alt=""
                className="w-6"
                onClick={() => {
                  setOverlay(false);
                }}
              />
            </div>
            <p className="mt-2 text-sm">
              Look closely at the ticket and click all the words you think it
              could signify!
            </p>
          </div>
        </div>
      )}
      <div className="h-full pt-16 px-4 flex flex-col justify-between pb-24 items-center bg-[#FFF8E7] font-manrope">
        <div className="flex justify-center items-center">
          <img src="/images/graham-bombay.png" alt="" className="w-44" />
        </div>
        <div className="w-full mt-6">
          <div className="flex flex-wrap gap-4 max-h-64 overflow-auto">
            {words.map((i, index) => (
              <div
                key={index}
                onClick={() => handleSelectWord(i)}
                className={`flex-1 max-w-[calc(50%-0.5rem)] min-w-[calc(33.33%-1rem)] rounded p-3 px-8 text-sm font-semibold flex justify-center items-center gap-2 ${
                  selectedWords.find((word) => word.id === i.id)
                    ? "bg-[#2D6A42] text-white border border-[#2D6A42]"
                    : "bg-transparent text-black border border-black"
                }`}
              >
                {i.isCustom && (
                  <img
                    src={
                      selectedWords.find((word) => word.id === i.id)
                        ? "/icons/close.svg"
                        : "/icons/close-black.svg"
                    }
                    alt=""
                    className="w-5"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveWord(i.id);
                    }}
                  />
                )}
                {i.word}
              </div>
            ))}
          </div>
          <div
            className={`mt-5 pb-2 border-b border-[#223100] flex justify-between ${
              customWordCount < 2 ? "visible" : "invisible"
            }`}
          >
            <input
              type="text"
              value={word}
              onChange={(e) => {
                setWord(e.target.value);
              }}
              placeholder="Any more that come to mind? Add them here"
              className="outline-none placeholder:text-[#00000040] text-sm font-semibold bg-transparent w-full"
            />
            <img
              src="/icons/plus.svg"
              alt=""
              className="w-6"
              onClick={handleAddWord}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WordsStep2;
