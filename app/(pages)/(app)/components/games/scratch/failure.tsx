import Image from "next/image";
import React from "react";

const Failure = () => {
  return (
    <div className="h-full pt-16 px-4 flex flex-col justify-start items-center bg-[#FFF8E7]">
      <Image
        src="/images/failure.gif"
        priority={true}
        sizes="100vw"
        height={0}
        width={0}
        alt=""
        className="w-20"
      />
      <p className="text-xs font-semibold mt-6">Oops! Not quite.</p>
      <p className="text-xs mt-2">How about we have another go?</p>
    </div>
  );
};

export default Failure;
