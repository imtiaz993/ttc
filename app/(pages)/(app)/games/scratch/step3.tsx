import React from "react";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";
import Image from "next/image";
import { useSelector } from "react-redux";

const ScratchStep3 = () => {
  const userData = useSelector((state: any) => state.user.userData);
  const handleCameraClick = () => {
    console.log("Camera Clicked!");
  };
  return (
    <>
      <Menu />
      <GameStepper showCamera={true} onCameraClick={handleCameraClick} />
      <div className="h-full pt-16 px-4 flex flex-col justify-start items-center bg-[#FFF8E7]">
        <div className="w-full flex items-start mb-4">
          <div>
            <img
              src={`/images/${userData.char}.png`}
              alt=""
              className="w-11 rounded-lg"
            />
            <p className="mt-1 text-xs font-medium text-center">You</p>
          </div>
          <p className="ml-4 font-medium w-[cacl(100%-46px)]">
            Phew! Glad I have a smartphone to help me solve ancient mysteries.
          </p>
        </div>
        <div className="mt-10 mb-6 relative">
          <img
            src="/images/camera.gif"
            decoding="sync"
            alt=""
            className="w-64 relative z-20"
          />
          <img
            src="/images/camera-scanning-art.png"
            decoding="sync"
            alt=""
            className="w-28 absolute top-[52px] left-[70px] z-10"
          />
        </div>
        <div className="bg-[#FDD931] rounded py-3 px-4">
          <div className="w-full flex items-start mb-2">
            <img
              src="/icons/zoom-in.svg"
              decoding="sync"
              alt=""
              className="w-6"
            />
            <p className="ml-2 text-xs font-semibold w-[calc(100%-24px)]">
              Find this colorful image of a lion & lioness within a glass case
              around you
            </p>
          </div>
          <p className="mt-2 text-xs">
            Now take a picture of it to see what you discover next!
          </p>
        </div>
      </div>
    </>
  );
};

export default ScratchStep3;
