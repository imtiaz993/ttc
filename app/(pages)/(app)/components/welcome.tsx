import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextStep } from "../../../redux/slices/navigationSlice";
import { closeOverlay, setUserData } from "../../../redux/slices/userSlice";

const Welcome = ({
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}) => {
  const dispatch = useDispatch();
  const [overlay, setOverlay] = useState(false);
  const [name, setName] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragPosition, setDragPosition] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
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
    }, 500);
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
    <>
      {overlay && (
        <>
          <div
            className="fixed inset-0 bg-[#00000040] z-20"
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
              className="fixed z-20 right-0 left-0 bottom-0 w-full flex flex-col justify-center h-20"
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
        </>
      )}
      <div
        className="relative flex flex-col justify-center items-center border-transparent h-dvh"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={() => {
          if (name)
            onMouseUp({ forward: true }, () => {
              updateUserData({ ...userData, name });
              localStorage.removeItem("wordsData");
              localStorage.removeItem("selectedWordsData");
              next();
            });
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={() => {
          if (name)
            onTouchEnd({ forward: true }, () => {
              updateUserData({ ...userData, name });
              localStorage.removeItem("wordsData");
              localStorage.removeItem("selectedWordsData");
              next();
            });
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-fill z-0"
          src="/videos/welcome-video.mp4"
        />
        <div className="relative z-10 flex flex-col justify-center items-center">
          <p className="text-[#D02E01] font-medium text-center font-manrope">
            Welcome to
          </p>
          <img src="/icons/logo.svg" alt="" className="w-[260px] mb-10" />
          <img
            src="/images/welcome-divider.png"
            alt=""
            className="w-full px-12"
          />
        </div>
        <div className="relative z-10 mt-7 px-5">
          <p className="text-[#D02E01] text-sm mb-6 text-center font-playwriteDEGrund">
            A world within a world…
            <br /> Messages from a time forgotten…
            <br /> Wish you well on this journey,
            <br /> friend!
          </p>
          <form
            onSubmit={(e: any) => {
              e.preventDefault();
              updateUserData({ ...userData, name });
              localStorage.removeItem("wordsData");
              localStorage.removeItem("selectedWordsData");
              next();
            }}
            className={`flex justify-between pb-2 border-b border-[#223100] ${
              disabled ? "opacity-50" : ""
            }`}
          >
            <input
              className="text-[#202F00] text-sm font-lora outline-none placeholder:text-[#202F00] w-full bg-transparent"
              placeholder="Enter your name to begin"
              type="text"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
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
            <img
              src="/images/map-logo.png"
              alt=""
              className="relative z-10 w-32"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
