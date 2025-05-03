import React from "react";
import Menu from "./menu";
import Image from "next/image";

const Feedback = ({ reset }) => {
  return (
    <>
      <Menu reset={reset} />
      <div className="h-full pt-16 px-4 flex flex-col justify-start items-center bg-[#FFF8E7]">
        <Image
          src="/images/char1.png"
          priority={true}
          sizes="100vw"
          height={0}
          width={0}
          alt=""
          className="w-20 rounded-lg"
        />
        <div className="mt-6 w-full">
          <div className="w-full flex items-start mb-2">
            <Image
              src="/icons/emoji.svg"
              priority={true}
              sizes="100vw"
              height={0}
              width={0}
              alt=""
              className="w-6"
            />
            <p className="font-semibold ml-2">Loved this little adventure? </p>
          </div>
          <p className="text-xs">
            Share your contact details with us to unravel more mysteries about
            art, only at the Museum of Art & Photography, Bangalore. 
          </p>
          <div className="flex justify-between pb-2 border-b border-[#223100] my-6">
            <input
              className="text-[#202F00] text-sm outline-none placeholder:text-[#202F00] w-full bg-transparent"
              placeholder="Enter your email"
              type="email"
            />
            <Image
              src="/icons/arrow-forward.svg"
              priority={true}
              sizes="100vw"
              height={0}
              width={0}
              alt=""
              className="w-5"
            />
          </div>
          <label className=" text-xs flex justify-center items-center">
            <input className="mr-2 w-5 h-5 -mt-1" type="checkbox" />I agree to
            the data usage policy
          </label>
          <div className="flex justify-center items-center">
            <div className="mt-5 bg-[#202F00] rounded-full py-1.5 px-3 flex items-center w-fit">
              <Image
                src="/icons/info.svg"
                priority={true}
                sizes="100vw"
                height={0}
                width={0}
                alt=""
                className="w-6"
              />
              <p className="ml-2 text-xs text-[#FFF8E7]">
                Submitted successfully!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feedback;
