import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";
import Success from "./success";
import Failure from "./failure";

const SareeStep3 = () => {
  const userData = useSelector((state: any) => state.user.userData);
  const [overlay, setOverlay] = useState(true);
  const [sareePath, setSareePath] = useState("/images/saree-white.png");
  const [state, setState] = useState("initial");
  const [selectedColor, setSelectedColor] = useState([]);
  const [finalColor, setFinalColor] = useState("");
  const [undoDisabled, setUndoDisabled] = useState(false);
  const [resultColor, setResultColor] = useState<any>({});
  const results = [
    { name: "Orange", color: "bg-[#FA9439]" },
    { name: "Green", color: "bg-[#78CC87]" },
    { name: "Purple", color: "bg-[#937DC5]" },
  ];

  useEffect(() => {
    if (selectedColor[0] || selectedColor[1]) {
      if (selectedColor[0] == "bg-[#EA5B7C]") {
        setSareePath("/images/saree-red.png");
      } else if (selectedColor[0] == "bg-[#F6D44C]") {
        setSareePath("/images/saree-yellow.png");
      } else if (selectedColor[0] == "bg-[#71B0DC]") {
        setSareePath("/images/saree-blue.png");
      }
      setUndoDisabled(false);
    } else {
      setSareePath("/images/saree-white.png");
      setUndoDisabled(true);
    }
    if (selectedColor[0] && selectedColor[1]) {
      if (
        selectedColor.includes("bg-[#EA5B7C]") &&
        selectedColor.includes("bg-[#F6D44C]")
      ) {
        setSareePath("/images/saree-orange.png");
        setFinalColor("bg-[#FA9439]");
        setTimeout(() => {
          setState("result");
        }, 1500);
      } else if (
        selectedColor.includes("bg-[#F6D44C]") &&
        selectedColor.includes("bg-[#71B0DC]")
      ) {
        setSareePath("/images/saree-green.png");
        setFinalColor("bg-[#78CC87]");
        setTimeout(() => {
          setState("result");
        }, 1500);
      } else if (
        selectedColor.includes("bg-[#EA5B7C]") &&
        selectedColor.includes("bg-[#71B0DC]")
      ) {
        setSareePath("/images/saree-purple.png");
        setFinalColor("bg-[#937DC5]");
        setTimeout(() => {
          setState("result");
        }, 1500);
      }
    }
    if (selectedColor.length < 2) {
      setFinalColor("");
    }
  }, [selectedColor]);

  const undo = () => {
    setSelectedColor([]);
    setRandomColor();
    setState("initial");
    setSareePath("/images/saree-white.png");
  };

  const setRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * results.length);
    const selectedColor = results[randomIndex];
    setResultColor(selectedColor);
  };
  useEffect(() => {
    setRandomColor();
  }, []);

  return (
    <>
      <Menu
        isGameOptions={state == "initial"}
        handleInfo={() => {
          setOverlay(true);
        }}
        isUndoDisabled={undoDisabled}
        handleUndo={undo}
      />
      <GameStepper showNext={false} showPrev={false} />
      {state == "initial" ? (
        <>
          {overlay && (
            <div>
              <div className="fixed inset-0 bg-[#00000040] z-30"></div>
              <div className="fixed z-40 h-fit w-11/12 inset-0 rounded py-3 px-4 bg-[#FDD931] mx-auto left-1/2 top-1/2 transform -translate-x-1/2 font-manrope">
                <div className="w-full flex justify-between items-center mb-2">
                  <img src="/icons/paint.svg" alt="" className="w-6" />
                  <p className="ml-2 text-xs font-semibold w-[calc(100%-24px)]">
                    Mix it Up!
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
                <p className="mt-2 text-xs">
                  Select the two colours that make up{" "}
                  <span className="font-semibold">{resultColor?.name}</span>
                </p>
              </div>
            </div>
          )}
          <div className="h-full pt-16 px-4 flex flex-col justify-start items-center bg-[#FFF8E7] font-manrope">
            <p className="text-xs mb-3">
              Select the two colours that make up{" "}
              <span className="font-semibold">{resultColor?.name}</span>
            </p>
            <img src={sareePath} alt="" className="w-64" />
            <div className="w-full mt-12 flex justify-center items-center">
              <div
                className={`rounded-full w-8 h-8 ${
                  selectedColor[0]
                    ? `${selectedColor[0]}`
                    : "border border-dashed border-black "
                }`}
              ></div>
              <div className="mx-3">
                <img src="/icons/plus.svg" alt="" className="w-6" />
              </div>
              <div
                className={`rounded-full w-8 h-8  ${
                  selectedColor[1]
                    ? `${selectedColor[1]}`
                    : "border border-dashed border-black"
                }`}
              ></div>
              <div className="mx-3">
                <img src="/icons/equal.svg" alt="" className="w-6" />
              </div>
              <div
                className={`rounded-full w-8 h-8  ${
                  finalColor
                    ? `${finalColor}`
                    : "border border-dashed border-black"
                }`}
              ></div>
            </div>
            <div className="mt-10 flex justify-center items-center gap-6">
              {[
                { color: "bg-[#EA5B7C]", name: "Red" },
                { color: "bg-[#F6D44C]", name: "Yellow" },
                { color: "bg-[#71B0DC]", name: "Blue" },
              ].map((i, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`flex justify-center items-center w-[60px] h-[60px] ${i.color} rounded-full`}
                    onClick={() => {
                      if (!selectedColor[0] || !selectedColor[1]) {
                        if (selectedColor.includes(i.color)) {
                          setSelectedColor(
                            selectedColor.filter((color) => color !== i.color)
                          );
                        } else {
                          if (selectedColor.length == 0) {
                            setSelectedColor([i.color, ""]);
                          } else {
                            if (selectedColor[0] == "") {
                              setSelectedColor([i.color, ""]);
                            } else {
                              setSelectedColor([selectedColor[0], i.color]);
                            }
                          }
                        }
                      }
                    }}
                  >
                    {selectedColor.includes(i.color) && (
                      <img
                        src="/icons/check-white.svg"
                        alt=""
                        className="w-6"
                      />
                    )}
                  </div>
                  <p className="font-semibold mt-2">{i.name}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : finalColor === resultColor.color ? (
        <Success userData={userData} sareePath={sareePath} />
      ) : (
        <Failure
          finalColor={finalColor}
          resultColor={resultColor}
          results={results}
          undo={undo}
          sareePath={sareePath}
        />
      )}
    </>
  );
};

export default SareeStep3;
