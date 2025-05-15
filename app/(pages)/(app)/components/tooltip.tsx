import Image from "next/image";
import React from "react";

const Tooltip = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="mt-5 bg-[#202F00] rounded-full py-1.5 px-3 flex items-center w-fit">
        <img
          src="/icons/info.svg"
         

          
          
          
          alt=""
          className="w-6"
        />
        <p className="ml-2 text-xs text-[#FFF8E7]">Tooltips are now on</p>
      </div>
    </div>
  );
};

export default Tooltip;
