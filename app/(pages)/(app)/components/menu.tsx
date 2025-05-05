import Image from "next/image";
import React, { useState } from "react";

const Menu = ({ isOpen = false, reset, userData = null, setUserData }) => {
  const [open, setOpen] = useState(isOpen);
  const [sound, setSound] = useState(true);
  const [tooltips, setTooltips] = useState(true);
  console.log(userData?.sound);

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
                  className={`w-[75px] cursor-pointer rounded-lg ${
                    userData.char == "char1" ? "border-2 border-black" : ""
                  }`}
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
                  className={`w-[75px] cursor-pointer rounded-lg ${
                    userData.char == "char2" ? "border-2 border-black" : ""
                  }`}
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
                  className={`w-[75px] cursor-pointer rounded-lg ${
                    userData.char == "char3" ? "border-2 border-black" : ""
                  }`}
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
                  className={`w-[75px] cursor-pointer rounded-lg ${
                    userData.char == "char4" ? "border-2 border-black" : ""
                  }`}
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
                  <div
                    className="w-5 h-2.5 flex items-center rounded-full cursor-pointer bg-[#FFF8E7]"
                    onClick={() => {
                      setUserData((prev) => ({
                        ...prev,
                        tooltip: !prev.tooltip,
                      }));
                    }}
                  >
                    <div
                      className={`bg-[#641D1D] w-2 h-2 rounded-full shadow-md transform transition-transform duration-300 ${
                        userData.tooltip ? "translate-x-3" : "translate-x-0"
                      }`}
                    />
                  </div>
                </div>
                <div className="pb-2.5 mb-10 flex justify-between items-center border-b border-[#FFFFFF1A]">
                  <p className="text-[#FFF8E7] font-medium">Sound</p>
                  <Image
                    src={userData?.sound ? "/icons/volume-white.svg" : "/icons/muted.svg"}
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
                      setUserData({
                        name: "",
                        sound: true,
                        char: "char1",
                        tooltip: false,
                      });
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
