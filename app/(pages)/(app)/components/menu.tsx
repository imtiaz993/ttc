import Image from "next/image";
import React, { useState } from "react";

const Menu = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className="mb-16">
      {!open && (
        <div className="fixed top-5 right-4 left-4 flex justify-between">
          <Image
            src="/icons/volume.svg"
            priority={true}
            sizes="100vw"
            height={0}
            width={0}
            alt=""
            className="w-6 cursor-pointer"
          />
          <Image
            src="/icons/menu.svg"
            priority={true}
            sizes="100vw"
            height={0}
            width={0}
            alt=""
            className="w-6 cursor-pointer"
            onClick={() => {
              setOpen(true);
            }}
          />
        </div>
      )}
      <div
        className={`fixed inset-0 transition-transform duration-500 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          backgroundImage: "url('/images/menu-overlay.png')",
          backgroundSize: "cover",
          backgroundRepeat: "round",
        }}
      >
        <div className="pt-5 px-4 flex justify-between">
          <p className="text-[#FFF8E7] text-sm font-semibold">MENU</p>
          <Image
            src="/icons/close.svg"
            priority={true}
            sizes="100vw"
            height={0}
            width={0}
            alt=""
            className="w-6 cursor-pointer"
            onClick={() => {
              setOpen(false);
            }}
          />
        </div>
        <div className="mt-10"></div>
      </div>
    </div>
  );
};

export default Menu;
