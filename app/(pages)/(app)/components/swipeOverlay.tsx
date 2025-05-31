import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { closeOverlay, openOverlay } from "../../../redux/slices/userSlice";

const SwipeOverlay = ({ setOverlay, setDisabled = () => {} }: any) => {
  const dispatch = useDispatch();
  const [dragStartX, setDragStartX] = useState(0);
  const [dragPosition, setDragPosition] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const hideOverlay = () => dispatch(closeOverlay());

  const handleDragStart = (e) => {
    setDragStartX(e.type === "touchstart" ? e.touches[0].clientX : e.clientX);
  };

  const handleDragMove = (e) => {
    if (!dragStartX) return;
    const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    const diffX = clientX - dragStartX;
    setDragPosition(diffX);
  };

  const handleDragEnd = (e) => {
    const screenWidth = window.innerWidth;
    if (
      dragPosition < -screenWidth * 0.25 ||
      dragPosition > screenWidth * 0.25
    ) {
      setFadeOut(true); // Trigger fade-out animation
      setTimeout(() => {
        setOverlay(false);
        setDisabled(false);
        hideOverlay();
        setFadeOut(false); // Reset fadeOut state
      }, 300); // Match the transition duration
    }
    setDragStartX(0);
    setDragPosition(0);
  };

  return (
    <div
      className="fixed inset-0 bg-[#00000040] z-20 max-w-md h-full w-full max-h-[1000px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.3s ease-out",
      }}
    >
      <div
        className="absolute z-20 right-0 left-0 bottom-0 w-full flex flex-col justify-center h-20 max-w-md max-h-[1000px]"
        style={{
          backgroundImage: "url('/images/overlay-yellow.png')",
          backgroundSize: "contain",
          backgroundRepeat: "round",
          opacity: fadeOut ? 0 : 1,
          transition: "opacity 1s ease-out",
        }}
      >
        <div className="bg-[#202F00] w-[168px] mx-auto rounded-full px-3 py-2 flex items-center justify-between">
          <img
            src="/icons/swipe-arrow.svg"
            alt=""
            className="w-4 animate-sway1"
          />
          <p className="mx-1.5 text-[#FFF8E7] text-xs text-center font-Manrope">
            swipe to navigate
          </p>
          <img
            src="/icons/swipe-arrow-forward.svg"
            alt=""
            className="w-4 animate-sway2"
          />
        </div>
      </div>
    </div>
  );
};

export default SwipeOverlay;
