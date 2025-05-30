import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Menu from "../../components/menu";
import Success from "./success";
import Failure from "./failure";
import {
  resetStepperProps,
  setStepperProps,
} from "../../../../redux/slices/progressSlice";

const SareeStep3 = () => {
  const userData = useSelector((state: any) => state.user.userData);
  const [overlay, setOverlay] = useState(true);
  const [firstSareePath, setFirstSareePath] = useState(
    "/images/saree-white.png"
  );
  const [secondSareePath, setSecondSareePath] = useState(null);
  const [resultSareePath, setResultSareePath] = useState(null);
  const [state, setState] = useState("initial");
  const [selectedColor, setSelectedColor] = useState([]);
  const [finalColor, setFinalColor] = useState("");
  const [undoDisabled, setUndoDisabled] = useState(true);
  const [resultColor, setResultColor] = useState<any>({});
  const [firstSareeOpacity, setFirstSareeOpacity] = useState(1);
  const [secondSareeOpacity, setSecondSareeOpacity] = useState(0);
  const [resultSareeOpacity, setResultSareeOpacity] = useState(0);
  const results = [
    { name: "Orange", color: "bg-[#FA9439]", path: "/images/saree-orange.png" },
    { name: "Green", color: "bg-[#78CC87]", path: "/images/saree-green.png" },
    { name: "Purple", color: "bg-[#937DC5]", path: "/images/saree-purple.png" },
  ];

  useEffect(() => {
    let timeout1, timeout2;

    if (selectedColor[0]) {
      if (selectedColor[0] === "bg-[#EA5B7C]") {
        setFirstSareePath("/images/saree-red.png");
      } else if (selectedColor[0] === "bg-[#F6D44C]") {
        setFirstSareePath("/images/saree-yellow.png");
      } else if (selectedColor[0] === "bg-[#71B0DC]") {
        setFirstSareePath("/images/saree-blue.png");
      }
      setUndoDisabled(false);
    } else {
      setFirstSareePath("/images/saree-white.png");
      setSecondSareePath(null);
      setResultSareePath(null);
      setUndoDisabled(true);
      setFirstSareeOpacity(1);
      setSecondSareeOpacity(0);
      setResultSareeOpacity(0);
    }

    if (selectedColor[0] && selectedColor[1]) {
      let newResultSareePath = "";
      let newFinalColor = "";
      if (selectedColor[1] === "bg-[#EA5B7C]") {
        setSecondSareePath("/images/saree-red.png");
      } else if (selectedColor[1] === "bg-[#F6D44C]") {
        setSecondSareePath("/images/saree-yellow.png");
      } else if (selectedColor[1] === "bg-[#71B0DC]") {
        setSecondSareePath("/images/saree-blue.png");
      }
      if (
        selectedColor.includes("bg-[#EA5B7C]") &&
        selectedColor.includes("bg-[#F6D44C]")
      ) {
        newResultSareePath = "/images/saree-orange.png";
        newFinalColor = "bg-[#FA9439]";
      } else if (
        selectedColor.includes("bg-[#F6D44C]") &&
        selectedColor.includes("bg-[#71B0DC]")
      ) {
        newResultSareePath = "/images/saree-green.png";
        newFinalColor = "bg-[#78CC87]";
      } else if (
        selectedColor.includes("bg-[#EA5B7C]") &&
        selectedColor.includes("bg-[#71B0DC]")
      ) {
        newResultSareePath = "/images/saree-purple.png";
        newFinalColor = "bg-[#937DC5]";
      }

      // First second: Second color/saree fades in
      setFirstSareeOpacity(1);
      setSecondSareeOpacity(0);
      setResultSareeOpacity(0);
      setResultSareePath(newResultSareePath);
      setFinalColor(newFinalColor);

      timeout1 = setTimeout(() => {
        setSecondSareeOpacity(0.5); // Second saree at half opacity
        // Second second: Resultant color/saree fades in
        timeout2 = setTimeout(() => {
          setResultSareeOpacity(0.7); // Resultant saree at higher opacity
          setState("result");
        }, 500); // Start resultant fade-in at 2 seconds
      }, 500); // Start second color/saree fade-in at 1 second
    } else {
      setFinalColor("");
      setSecondSareePath(null);
      setResultSareePath(null);
      setFirstSareeOpacity(1);
      setSecondSareeOpacity(0);
      setResultSareeOpacity(0);
    }

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [selectedColor]);

  const undo = () => {
    setSelectedColor([]);
    setState("initial");
    setFirstSareePath("/images/saree-white.png");
    setSecondSareePath(null);
    setResultSareePath(null);
    setFinalColor("");
    setFirstSareeOpacity(1);
    setSecondSareeOpacity(0);
    setResultSareeOpacity(0);
  };

  const setRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * results.length);
    const selectedColor = results[randomIndex];
    setResultColor(selectedColor);
  };
  useEffect(() => {
    setRandomColor();
  }, []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setStepperProps({
        showPrev: false,
        showNext: state == "result" && finalColor === resultColor.color,
        showContinue: state == "result" && finalColor === resultColor.color,
      })
    );
    return () => {
      dispatch(resetStepperProps()); // This resets to initialState
    };
  }, [finalColor, state, resultColor]);
  return (
    <>
      <Menu
        isGameOptions={state === "initial"}
        handleInfo={() => setOverlay(true)}
        isUndoDisabled={undoDisabled}
        handleUndo={undo}
      />
      {state === "initial" ? (
        <>
          {overlay && (
            <div>
              <div className="fixed inset-0 bg-[#00000040] z-30"></div>
              <div className="fixed z-40 h-fit w-11/12 inset-0 rounded py-3 px-4 bg-[#FDD931] mx-auto left-1/2 top-1/2 transform -translate-x-1/2 font-manrope">
                <div className="w-full flex justify-between items-center mb-2">
                  <img src="/icons/paint.svg" alt="" className="w-6" />
                  <p className="ml-2 text-sm font-semibold w-[calc(100%-24px)]">
                    Mix it Up!
                  </p>
                  <img
                    src="/icons/close-black.svg"
                    alt=""
                    className="w-6"
                    onClick={() => setOverlay(false)}
                  />
                </div>
                <p className="mt-2 text-sm">
                  Select the two colours that make up{" "}
                  <span className="font-semibold">{resultColor?.name}</span>
                </p>
              </div>
            </div>
          )}
          <div className="h-full pt-16 px-4 flex flex-col justify-start items-center bg-[#FFF8E7] font-manrope">
            <p className="text-sm mb-3">
              Select the two colours that make up{" "}
              <span className="font-semibold">{resultColor?.name}</span>
            </p>
            <div className="relative w-64 h-[324px]">
              <img
                src={firstSareePath}
                alt="First Saree"
                className={`w-64 absolute top-0 left-0 transition-opacity duration-500 opacity-${Math.round(
                  firstSareeOpacity * 100
                )}`}
              />
              {secondSareePath && (
                <img
                  src={secondSareePath}
                  alt="Second Saree"
                  className={`w-64 absolute top-0 left-0 transition-opacity duration-500 opacity-${Math.round(
                    secondSareeOpacity * 100
                  )}`}
                />
              )}
              {resultSareePath && (
                <img
                  src={resultSareePath}
                  alt="Result Saree"
                  className={`w-64 absolute top-0 left-0 transition-opacity duration-500 opacity-${Math.round(
                    resultSareeOpacity * 100
                  )}`}
                />
              )}
            </div>
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
                {
                  color: "bg-[#EA5B7C]",
                  name: "Red",
                  path: "/images/saree-red.png",
                },
                {
                  color: "bg-[#F6D44C]",
                  name: "Yellow",
                  path: "/images/saree-yellow.png",
                },
                {
                  color: "bg-[#71B0DC]",
                  name: "Blue",
                  path: "/images/saree-blue.png",
                },
              ].map((i, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`flex justify-center items-center w-[60px] h-[60px] ${
                      i.color
                    } rounded-full transition-transform duration-300 ${
                      selectedColor.includes(i.color)
                        ? "scale-105"
                        : "scale-100"
                    }`}
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
                  <p className="font-semibold text-sm mt-2">{i.name}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : finalColor === resultColor.color ? (
        <Success
          userData={userData}
          sareePath={resultSareePath || firstSareePath}
        />
      ) : (
        <Failure
          finalColor={finalColor}
          resultColor={resultColor}
          results={results}
          undo={undo}
          sareePath={resultSareePath || firstSareePath}
        />
      )}
    </>
  );
};

export default SareeStep3;
