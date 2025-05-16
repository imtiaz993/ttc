import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextStep } from "../../../redux/slices/navigationSlice";
import { closeOverlay, setUserData } from "../../../redux/slices/userSlice";

const Welcome = ({ playMusic = () => {} }) => {
  const dispatch = useDispatch();
  const [overlay, setOverlay] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragPosition, setDragPosition] = useState(0);
  const userData = useSelector((state: any) => state.user.userData);
  const next = () => dispatch(nextStep());
  const hideOverlay = () => dispatch(closeOverlay());

  const updateUserData = (data) => dispatch(setUserData(data));

  useEffect(() => {
    setTimeout(() => {
      if (userData.overlay) {
        setOverlay(true);
      } else {
        setDisabled(false);
      }
    }, 1000);
    if (!userData.overlay) {
      setDisabled(false);
    }
  }, []);

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
    if (dragPosition < -screenWidth * 0.5 || dragPosition > screenWidth * 0.5) {
      setOverlay(false);
      setDisabled(false);
      hideOverlay();
    }
    setDragStartX(0);
    setDragPosition(0);
  };

  return (
    <>
      {overlay && (
        <>
          <div
            className="fixed inset-0 bg-[#00000040] z-10"
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            style={{
              transform: `translateX(${dragPosition}px)`,
              transition:
                dragPosition === 0 ? "transform 0.3s ease-out" : "none",
            }}
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
          >
            <div
              className="fixed z-20 right-0 left-0 bottom-0"
              style={{
                backgroundImage: "url('/images/overlay-yellow.png')",
                backgroundSize: "contain",
                backgroundRepeat: "round",
                transform: `translateX(${dragPosition}px)`,
                transition:
                  dragPosition === 0 ? "transform 0.3s ease-out" : "none",
              }}
            >
              <div className="bg-[#202F00] w-[168px] my-10 mx-auto rounded-full px-3 py-2 flex items-center justify-between">
                <img
                  src="/icons/swipe-arrow.svg"
                  alt=""
                  className="w-4 animate-sway1"
                />
                <p className="mx-1.5 text-[#FFF8E7] text-xs text-center">
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
        </>
      )}
      <div
        className="flex flex-col justify-center items-center border-transparent h-dvh px-12"
        style={{
          backgroundImage: "url('/images/welcome-frame.png')",
          backgroundSize: "contain",
          backgroundRepeat: "round",
        }}
      >
        <div className="px-10">
          <p className="text-[#D02E01] text-sm font-medium mb-3 text-center">
            Welcome to
          </p>
          <img src="/icons/logo.svg" alt="" className="w-60 mb-14" />
        </div>
        <img src="/images/welcome-divider.png" alt="" className="w-full" />
        <div className="mt-7 px-10">
          <p className="text-[#D02E01] text-sm mb-6 text-center max-w-60">
            A world within a world… Messages from a time forgotten… Wish you
            well on this journey, friend!
          </p>
          <form
            onSubmit={(e: any) => {
              e.preventDefault();
              playMusic();
              const name = e.target.name.value;
              updateUserData({ ...userData, name });
              next();
            }}
            className={`flex justify-between pb-2 border-b border-[#223100] ${
              disabled ? "opacity-50" : ""
            }`}
          >
            <input
              className="text-[#202F00] text-sm outline-none placeholder:text-[#202F00] w-full bg-transparent"
              placeholder="Enter your name to begin"
              type="text"
              name="name"
              autoComplete="off"
              disabled={disabled}
              required
            />
            <button type="submit" className="w-5 h-5">
              <img
                src="/icons/arrow-forward.svg"
                alt="Submit"
                className="w-full h-full"
              />
            </button>
          </form>
          <div className="flex justify-center mt-6">
            <img src="/icons/map.svg" alt="" className="w-16" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
