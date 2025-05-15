import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { nextStep, prevStep } from "../../../../redux/slices/navigationSlice";

const Failure = () => {
  const dispatch = useDispatch();
  const next = () => dispatch(nextStep());
  const prev = () => dispatch(prevStep());
  return (
    <div className="h-full pt-16 px-4 flex flex-col justify-start items-center bg-[#FFF8E7]">
      <Image
        src="/images/failure.gif"
        priority={true}
fetchPriority="high"
        sizes="100vw"
        height={0}
        width={0}
        alt=""
        className="w-28"
      />
      <div className="my-6">
        <p className="font-semibold text-xs mb-2 text-center">
          Oops! Not quite.
        </p>
        <p className="text-xs text-center">
          You just created &lt; wrong colour &gt; instead of purple.
        </p>
        <p className="text-xs text-center"> Would you like to try again?</p>
      </div>
      <div>
        <Image
          src="/images/saree.png"
          priority={true}
fetchPriority="high"
          sizes="100vw"
          height={0}
          width={0}
          alt=""
          className="w-52"
        />
      </div>
      <div className="w-full grid grid-cols-2 gap-4 mt-auto mb-16">
        <button
          onClick={() => {
            next();
          }}
          className="border border-black bg-transparent rounded font-semibold flex justify-center py-3 w-full"
        >
          <Image
            src="/icons/skip.svg"
            priority={true}
fetchPriority="high"
            sizes="100vw"
            height={0}
            width={0}
            alt=""
            className="w-6 mr-2"
          />
          Skip
        </button>
        <button
          onClick={() => {
            prev();
            prev();
          }}
          className="text-[#FFF8E7] font-semibold rounded flex justify-center bg-black border border-black py-3 w-full"
        >
          <Image
            src="/icons/refresh.svg"
            priority={true}
fetchPriority="high"
            sizes="100vw"
            height={0}
            width={0}
            alt=""
            className="w-6 mr-2"
          />
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Failure;
