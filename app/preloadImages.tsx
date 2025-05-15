import Image from "next/image";
import React from "react";

const PreloadImages = () => {
  const images = [
    "/icons/swipe-arrow.svg",
    "/icons/swipe-arrow-forward.svg",
    "/images/overlay-yellow.png",
    "/icons/logo.svg",
    "/images/welcome-divider.png",
    "/icons/arrow-forward.svg",
    "/icons/map.svg",
    "/icons/undo-disabled.svg",
    "/icons/undo.svg",
    "/icons/info-black.svg",
    "/icons/volume.svg",
    "/icons/mute-black.svg",
    "/icons/info-black.svg",
    "/icons/menu.svg",
    "/icons/close.svg",
    "/icons/refresh.svg",
    "/icons/volume-white.svg",
    "/icons/mute.svg",
    "/images/char1.png",
    "/images/char1-inactive.png",
    "/images/char2.png",
    "/images/char2-inactive.png",
    "/images/char3.png",
    "/images/char3-inactive.png",
    "/images/char4.png",
    "/images/char4-inactive.png",
    "/images/yellow-bg.png",
    "/images/menu-overlay.png"
  ];
  return (
    <div>
      {images.map((i) => (
        <img src={i} alt="" className="w-6 cursor-pointer" />
      ))}
    </div>
  );
};

export default PreloadImages;
