import Image from "next/image";
import React from "react";

const Failure = () => {
  return (
    <div className="h-full pt-16 px-4 flex flex-col justify-start items-center bg-[#FFF8E7]">
      <Image
        src="/images/failure-2.gif"
        priority={true}
        sizes="100vw"
        height={0}
        width={0}
        alt=""
        className="w-28"
      />
      <div className="my-6">
        <p className="font-semibold text-xs mb-2">Oops! Not quite.</p>
        <p className="text-xs">
          You just created &lt; wrong colour &gt; instead of purple.
        </p>
        <p className="text-xs">A simple fix would be to try again.</p>
      </div>
      <div>
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
    </div>
  );
};

export default Failure;
