import Image from "next/image";
import React from "react";

const Success = ({ userData }) => {
  return (
    <div className="h-full pt-16 px-4 flex flex-col justify-between pb-24 items-center bg-[#FFF8E7]">
      <div className="w-full flex justify-between items-start">
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
        <div className="ml-4 w-[calc(100%-46px-16px)]">
          <p className="font-medium">
            I am an absolute pro at this! 19th century printing houses would
            have started a bidding war to hire me as their printer! hehe
          </p>
        </div>
      </div>
      <div className="mt-6">
        <Image
          src="/images/success.gif"
          priority={true}
          sizes="100vw"
          height={0}
          width={0}
          alt=""
          className="w-36"
        />
      </div>
      <Image
        src="/images/saree.png"
        priority={true}
        sizes="100vw"
        height={0}
        width={0}
        alt=""
        className="w-52"
      />
    </div>
  );
};

export default Success;
