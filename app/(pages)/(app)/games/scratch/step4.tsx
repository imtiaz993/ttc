import React, { useEffect } from "react";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { nextStep } from "../../../../redux/slices/navigationSlice";

const ScratchStep4 = () => {
  const dispatch = useDispatch();

  const next = () => dispatch(nextStep());

  const handleVerifying = () => {
    setTimeout(() => {
      next();
    }, 3000);
  };

  useEffect(() => {
    handleVerifying();
  }, []);

  return (
    <>
      <Menu />
      <GameStepper showNext={false} showPrev={false} />
      <div className="h-full pt-16 px-4 flex flex-col justify-center items-center bg-[#FFF8E7]">
        <img
          src="/images/verifying.gif"
          decoding="sync"
          alt=""
          className="w-40"
        />
        <p className="text-sm font-medium mt-6">Verifying your picture...</p>
      </div>
    </>
  );
};

export default ScratchStep4;
