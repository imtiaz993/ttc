import Image from "next/image";
import React from "react";

const Success = () => {
  return (
    <div className="h-full pt-16 px-4 flex flex-col justify-center items-center bg-[#FFF8E7]">
      <Image
        src="/images/success.gif"
        priority={true}
fetchPriority="high"
        sizes="100vw"
        height={0}
        width={0}
        alt=""
        className="w-36"
      />
      <p className="text-xs font-semibold mt-6">Great job!</p>
      <p className="text-xs mt-2">You got it right in the first go</p>
    </div>
  );
};

export default Success;
