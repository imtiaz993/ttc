import Image from "next/image";
import React, { useState } from "react";

const Menu = ({ isOpen = false, reset, setUserData }) => {
  const [open, setOpen] = useState(isOpen);
  const [sound, setSound] = useState(true);
  return (
    <div>
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
        className={`fixed z-50 inset-0 transition-transform duration-500 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          backgroundImage: "url('/images/menu-overlay.png')",
          backgroundSize: "cover",
          backgroundRepeat: "round",
        }}
      >
        <div className="pt-5 px-4 flex flex-col justify-between h-full">
          <div>
            <div className=" flex justify-between">
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
            <div className="mt-10">
              <p className="text-[#FFF8E7] font-medium mb-2.5">
                On this adventure. I’d like to be
              </p>
              <div className="flex gap-5 mb-10">
                <Image
                  src="/images/char1.png"
                  priority={true}
                  sizes="100vw"
                  height={0}
                  width={0}
                  alt=""
                  className="w-[75px] cursor-pointer"
                  onClick={() => {
                    setUserData((prev) => ({ ...prev, char: "char1" }));
                  }}
                />
                <Image
                  src="/images/char2.png"
                  priority={true}
                  sizes="100vw"
                  height={0}
                  width={0}
                  alt=""
                  className="w-[75px] cursor-pointer"
                  onClick={() => {
                    setUserData((prev) => ({ ...prev, char: "char2" }));
                  }}
                />
                <Image
                  src="/images/char3.png"
                  priority={true}
                  sizes="100vw"
                  height={0}
                  width={0}
                  alt=""
                  className="w-[75px] cursor-pointer"
                  onClick={() => {
                    setUserData((prev) => ({ ...prev, char: "char3" }));
                  }}
                />
                <Image
                  src="/images/char4.png"
                  priority={true}
                  sizes="100vw"
                  height={0}
                  width={0}
                  alt=""
                  className="w-[75px] cursor-pointer"
                  onClick={() => {
                    setUserData((prev) => ({ ...prev, char: "char4" }));
                  }}
                />
              </div>
              <div>
                <p className="text-[#FFF8E7] text-sm mb-2.5">
                  Accessibility options
                </p>
                <div className="pb-2.5 mb-2.5 flex justify-between items-center border-b border-[#FFFFFF1A]">
                  <p className="text-[#FFF8E7] font-medium">Tooltips</p>
                  <Image
                    src="/icons/toggle.svg"
                    priority={true}
                    sizes="100vw"
                    height={0}
                    width={0}
                    alt=""
                    className="w-6 cursor-pointer"
                  />
                </div>
                <div className="pb-2.5 mb-10 flex justify-between items-center border-b border-[#FFFFFF1A]">
                  <p className="text-[#FFF8E7] font-medium">Sound</p>
                  <Image
                    src={sound ? "/icons/volume-white.svg" : ""}
                    priority={true}
                    sizes="100vw"
                    height={0}
                    width={0}
                    alt=""
                    className="w-6 cursor-pointer"
                    onClick={() => {
                      setUserData((prev) => ({ ...prev, sound: !prev.sound }));
                    }}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[#FFF8E7] font-medium">
                    Restart the adventure
                  </p>
                  <Image
                    src="/icons/refresh.svg"
                    priority={true}
                    sizes="100vw"
                    height={0}
                    width={0}
                    alt=""
                    className="w-6 cursor-pointer"
                    onClick={() => {
                      reset();
                      setUserData(null);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-16">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-[#FFF8E7]">An initiative by</p>
              <p className="text-[#FFF8E7] font-semibold">MAP Bengaluru</p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-[#FFF8E7]">UI UX by</p>
              <p className="text-[#FFF8E7] font-semibold">Sensory+</p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-[#FFF8E7]">Developed by</p>
              <p className="text-[#FFF8E7] font-semibold">United Monks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
