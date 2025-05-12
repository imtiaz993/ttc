import React from "react";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";
import Image from "next/image";
import { useSelector } from "react-redux";

const OwnTikkaStep2 = () => {
  const userData = useSelector((state: any) => state.user.userData);
  return (
    <>
      <Menu />
      <GameStepper />
      <div className="h-full pt-16 px-4 flex flex-col justify-start items-center bg-[#FFF8E7]">
        <div className="w-full flex items-start mb-6">
          <div>
            <Image
              src={`/images/${userData.char}.png`}
              priority={true}
              sizes="100vw"
              height={0}
              width={0}
              alt=""
              className="w-11 rounded-lg"
            />
            <p className="mt-1 text-xs font-medium text-center">You</p>
          </div>
          <p className="ml-4 font-medium w-[cacl(100%-46px)]">
            ‘Tikas’- A legacy of 200 years of advertising that has influenced
            everything from newspapers and tv ads to social media ! Simply
            fascinating.
            <br />
            <br />
            Oh! How I’d love to try and make my own!
          </p>
        </div>
      </div>
    </>
  );
};

export default OwnTikkaStep2;
