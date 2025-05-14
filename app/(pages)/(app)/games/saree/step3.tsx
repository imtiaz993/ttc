import React, { useEffect, useState } from "react";
import Image from "next/image";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";
import { useDispatch } from "react-redux";
import { nextStep } from "../../../../redux/slices/navigationSlice";

const SareeStep3 = () => {
  const [overlay, setOverlay] = useState(true);
  const [selectedColor, setSelectedColor] = useState([]);
  const [finalColor, setFinalColor] = useState("");
  const [undoDisabled, setUndoDisabled] = useState(false);
  const dispatch = useDispatch();

  const next = () => dispatch(nextStep());

  useEffect(() => {
    if (selectedColor[0] && selectedColor[1]) {
      if (
        selectedColor.includes("bg-[#EA5B7C]") &&
        selectedColor.includes("bg-[#F6D44C]")
      ) {
        setFinalColor("bg-[#FA9439]");
      } else if (
        selectedColor.includes("bg-[#F6D44C]") &&
        selectedColor.includes("bg-[#71B0DC]")
      ) {
        setFinalColor("bg-[#78CC87]");
      } else if (
        selectedColor.includes("bg-[#EA5B7C]") &&
        selectedColor.includes("bg-[#71B0DC]")
      ) {
        setFinalColor("bg-[#937DC5]");
      }

      setTimeout(() => {
        next();
      }, 2000);
    }
    if (selectedColor.length < 2) {
      setFinalColor("");
    }
    if (selectedColor[0] || selectedColor[1]) {
      setUndoDisabled(false);
    } else {
      setUndoDisabled(true);
    }
  }, [selectedColor]);

  return (
    <>
      <Menu
        isGameOptions={true}
        handleInfo={() => {
          setOverlay(true);
        }}
        isUndoDisabled={undoDisabled}
        handleUndo={() => {
          setSelectedColor([]);
        }}
      />
      <GameStepper showNext={false} showPrev={false} />
      {overlay && (
        <div>
          <div className="fixed inset-0 bg-[#00000040] z-30"></div>
          <div className="fixed z-40 h-fit w-11/12 inset-0 rounded py-3 px-4 bg-[#FDD931] mx-auto left-1/2 top-1/2 transform -translate-x-1/2">
            <div className="w-full flex justify-between items-center mb-2">
              <Image
                src="/icons/paint.svg"
                priority={true}
                sizes="100vw"
                height={0}
                width={0}
                alt=""
                className="w-6"
              />
              <p className="ml-2 text-xs font-semibold w-[calc(100%-24px)]">
                Mix it Up!
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
              Select the two colours that make up Orange
            </p>
          </div>
        </div>
      )}
      <div className="h-full pt-16 px-4 flex flex-col justify-start items-center bg-[#FFF8E7]">
        <p className="text-xs mb-3">
          Select the two colours that make up{" "}
          <span className="font-semibold">Orange</span>
        </p>
        <Image
          src="/images/saree.png"
          priority={true}
          sizes="100vw"
          height={0}
          width={0}
          alt=""
          className="w-4/5"
        />
        <div className="w-full mt-12 flex justify-center items-center">
          <div
            className={`rounded-full w-8 h-8 ${
              selectedColor[0]
                ? `${selectedColor[0]}`
                : "border border-dashed border-black "
            }`}
          ></div>
          <div className="mx-3">
            <Image
              src="/icons/plus.svg"
              priority={true}
              sizes="100vw"
              height={0}
              width={0}
              alt=""
              className="w-6"
            />
          </div>
          <div
            className={`rounded-full w-8 h-8  ${
              selectedColor[1]
                ? `${selectedColor[1]}`
                : "border border-dashed border-black"
            }`}
          ></div>
          <div className="mx-3">
            <Image
              src="/icons/equal.svg"
              priority={true}
              sizes="100vw"
              height={0}
              width={0}
              alt=""
              className="w-6"
            />
          </div>
          <div
            className={`rounded-full w-8 h-8  ${
              finalColor ? `${finalColor}` : "border border-dashed border-black"
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
                  if (selectedColor.includes(i.color)) {
                    setSelectedColor(
                      selectedColor.filter((color) => color !== i.color)
                    );
                  } else {
                    if (selectedColor.length == 0) {
                      setSelectedColor([i.color, ""]);
                    } else {
                      setSelectedColor([selectedColor[0], i.color]);
                    }
                  }
                }}
              >
                {selectedColor.includes(i.color) && (
                  <Image
                    src="/icons/check-white.svg"
                    priority={true}
                    sizes="100vw"
                    height={0}
                    width={0}
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
  );
};

export default SareeStep3;
