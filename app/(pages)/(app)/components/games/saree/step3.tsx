import React, { useState } from "react";
import Menu from "../../menu";
import GameStepper from "../../gameStepper";
import Image from "next/image";

const SareeStep3 = ({ step, next, prev, reset, userData, setUserData }) => {
  const [overlay, setOverlay] = useState(true);
  const [selectedColor, setSelectedColor] = useState([]);
  return (
    <>
      <Menu reset={reset} userData={userData} setUserData={setUserData} />
      <GameStepper step={step} next={next} prev={prev} />
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
                Colour the saree purple
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
              Drag and drop the correct combination of colours to make her saree
              purple
            </p>
          </div>
        </div>
      )}
      <div className="h-full pt-16 px-4 flex flex-col justify-start items-center bg-[#FFF8E7]">
        <Image
          src="/images/saree.png"
          priority={true}
          sizes="100vw"
          height={0}
          width={0}
          alt=""
          className="w-4/5"
        />
        <div className="mt-12 flex justify-center items-center">
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
        </div>
        <div className="mt-10 flex justify-center items-center gap-6">
          {["bg-[#EA5B7C]", "bg-[#F6D44C]", "bg-[#71B0DC]"].map((i, index) => (
            <div
              key={index}
              className={`flex justify-center items-center w-[60px] h-[60px] ${i} rounded-full`}
              onClick={() => {
                if (selectedColor.includes(i)) {
                  setSelectedColor(
                    selectedColor.filter((color) => color !== i)
                  );
                } else {
                  if (selectedColor.length == 0) {
                    setSelectedColor([i, ""]);
                  } else {
                    setSelectedColor([selectedColor[0], i]);
                  }
                }
              }}
            >
              {selectedColor.includes(i) && (
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
          ))}
        </div>
      </div>
    </>
  );
};

export default SareeStep3;
