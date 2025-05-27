import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, resetStep } from "../../../redux/slices/navigationSlice";
import {
  setUserData,
  toggleMute,
  closeMenu,
  toggleMenu,
} from "../../../redux/slices/userSlice";

const Menu = ({
  isOpen = false,
  isGameOptions = false,
  isUndoDisabled = false,
  showSkip = true,
  showInfo = false,
  showFinish = false,
  showSpeaker = false,
  showContinue = false,
  handleUndo = () => {},
  handleInfo = () => {},
  handleSkip = () => {},
  handleFinish = () => {},
  playMusic = () => {},
}) => {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.user.userData);

  const toggleMenuBar = (data) => dispatch(toggleMenu(data));
  const next = () => dispatch(nextStep());
  const reset = () => dispatch(resetStep());
  const closeDrawer = () => dispatch(closeMenu());
  const updateUserData = (data) => dispatch(setUserData(data));
  const handleToggleMute = (data) => dispatch(toggleMute(data));

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isOpen);
    toggleMenuBar(!isOpen);
  }, []);

  return (
    <div className="font-manrope">
      {!open &&
        (isGameOptions ? (
          <div className="fixed top-5 right-4 left-4 flex justify-between">
            <div>
              {showSkip && (
                <p
                  className="text-sm font-medium"
                  onClick={() => {
                    handleSkip();
                    next();
                  }}
                >
                  SKIP
                </p>
              )}
              {showSpeaker && (
                <img
                  src={
                    userData.sound
                      ? "/icons/volume.svg"
                      : "/icons/mute-black.svg"
                  }
                  decoding="sync"
                  alt=""
                  className={`${userData.sound ? "w-6" : "w-5"} cursor-pointer`}
                />
              )}
            </div>
            <div className="flex items-center justify-between gap-4">
              <img
                src={
                  isUndoDisabled
                    ? "/icons/undo-disabled.svg"
                    : "/icons/undo.svg"
                }
                decoding="sync"
                alt=""
                className="w-6 cursor-pointer"
                onClick={() => {
                  if (!isUndoDisabled) {
                    handleUndo();
                  }
                }}
              />
              <img
                src="/icons/info-black.svg"
                decoding="sync"
                alt=""
                className="w-6 cursor-pointer"
                onClick={handleInfo}
              />
            </div>
          </div>
        ) : (
          <div className="fixed top-5 right-4 left-4 flex justify-between">
            <img
              src={
                userData.sound ? "/icons/volume.svg" : "/icons/mute-black.svg"
              }
              decoding="sync"
              alt=""
              className={`${userData.sound ? "w-6" : "w-5"} cursor-pointer`}
            />

            <div className="flex items-center justify-between gap-4">
              {showInfo && (
                <img
                  src="/icons/info-black.svg"
                  decoding="sync"
                  alt=""
                  className="w-6 cursor-pointer"
                  onClick={handleInfo}
                />
              )}

              {showContinue && (
                <p
                  className="text-sm font-manrope font-medium"
                  onClick={() => {
                    next();
                  }}
                >
                  CONTINUE
                </p>
              )}
              {showFinish ? (
                <p
                  className="text-sm font-manrope font-medium"
                  onClick={handleFinish}
                >
                  FINISH
                </p>
              ) : (
                <img
                  src="/icons/menu.svg"
                  decoding="sync"
                  alt=""
                  className="w-6 cursor-pointer"
                  onClick={() => {
                    setOpen(true);
                    toggleMenuBar(false);
                  }}
                />
              )}
            </div>
          </div>
        ))}
      <div
        className={`fixed z-50 top-0 bottom-0 right-0 w-full transition-transform duration-500 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          backgroundImage: "url('/images/menu-overlay.png')",
          backgroundSize: "cover",
          backgroundRepeat: "round",
        }}
      >
        <div className="pt-5 pb-[60px] px-4 flex flex-col justify-start h-full">
          <div>
            <div className="flex justify-between">
              <p className="text-[#FFF8E7] text-sm font-semibold">MENU</p>
              {!isOpen && (
                <img
                  src="/icons/close.svg"
                  decoding="sync"
                  alt=""
                  className="w-6 cursor-pointer"
                  onClick={() => {
                    setOpen(false);
                    toggleMenuBar(true);
                    closeDrawer();
                  }}
                />
              )}
            </div>
            <p className="mt-4 font-manrope text-[#FFF8E7] font-medium">
              Step back in time to join two best friends, Kamla and Selma, as
              they help you uncover the many mysteries behind “tickets” or
              textile labels.
            </p>
            <div className="mt-10">
              <p className="text-[#FFF8E7] font-medium mb-2.5">
                On this adventure. I’d like to be
              </p>
              <div className="flex justify-between gap-4 mb-10">
                {Array.from({ length: 4 }).map((_, index) => (
                  <img
                    key={index}
                    src={
                      userData.char == `char${index + 1}`
                        ? `/images/char${index + 1}.png`
                        : `/images/char${index + 1}-inactive.png`
                    }
                    height={75}
                    width={75}
                    decoding="sync"
                    alt=""
                    className="cursor-pointer object-cover rounded-full"
                    onClick={() => {
                      updateUserData({
                        ...userData,
                        char: `char${index + 1}`,
                      });
                    }}
                  />
                ))}
              </div>
              <div>
                <div className="pb-2.5 mb-3 h-9 flex justify-between items-center border-b border-[#FFFFFF1A]">
                  <p className="text-[#FFF8E7] font-medium">Sound</p>
                  <img
                    src={
                      userData?.sound
                        ? "/icons/volume-white.svg"
                        : "/icons/mute.svg"
                    }
                    decoding="sync"
                    alt=""
                    className={`${
                      userData.sound ? "w-6" : "w-5"
                    } cursor-pointer`}
                    onClick={() => {
                      handleToggleMute(userData.sound);
                    }}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[#FFF8E7] font-medium">
                    Restart the adventure
                  </p>
                  <img
                    src="/icons/refresh.svg"
                    decoding="sync"
                    alt=""
                    className="w-6 cursor-pointer"
                    onClick={() => {
                      localStorage.removeItem("wordsData");
                      localStorage.removeItem("selectedWordsData");
                      reset();
                      updateUserData({
                        name: "",
                        sound: userData.sound,
                        char: "char1",
                        tooltip: false,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          {isOpen && (
            <p
              className="text-sm mt-auto flex justify-end items-center text-[#FFF8E7] font-semibold gap-3"
              onClick={() => {
                toggleMenuBar(true);
                setOpen(false);
                closeDrawer();
                if (userData?.sound) {
                  playMusic();
                }
              }}
            >
              CONTINUE
              <img
                src="/icons/swipe-arrow-forward.svg"
                alt=""
                className="w-6"
              />
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
