import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextStep } from "../../../redux/slices/navigationSlice";
import { closeOverlay, setUserData } from "../../../redux/slices/userSlice";
import SwipeOverlay from "./swipeOverlay";

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
  const userData = useSelector((state: any) => state.user.userData);
  const next = () => dispatch(nextStep());

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

  return (
    <>
      {overlay && (
        <SwipeOverlay setOverlay={setOverlay} setDisabled={setDisabled} />
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
