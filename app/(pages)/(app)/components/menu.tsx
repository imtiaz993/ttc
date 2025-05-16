import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, resetStep } from "../../../redux/slices/navigationSlice";
import {
  setUserData,
  toggleMute,
  closeMenu,
} from "../../../redux/slices/userSlice";

const Menu = ({
  isOpen = false,
  isGameOptions = false,
  isUndoDisabled = false,
  showSkip = true,
  showInfo = false,
  handleUndo = () => {},
  handleInfo = () => {},
  handleSkip = () => {},
}) => {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.user.userData);

  const next = () => dispatch(nextStep());
  const reset = () => dispatch(resetStep());
  const closeDrawer = () => dispatch(closeMenu());
  const updateUserData = (data) => dispatch(setUserData(data));
  const handleToggleMute = (data) => dispatch(toggleMute(data));

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isOpen);
  }, []);

  return (
    <div>
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
              <img
                src="/icons/menu.svg"
                decoding="sync"
                alt=""
                className="w-6 cursor-pointer"
                onClick={() => {
                  setOpen(true);
                }}
              />
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
        <div className="pt-5 px-4 flex flex-col justify-start h-full">
          <div>
            <div className="flex justify-between">
              <p className="text-[#FFF8E7] text-sm font-semibold">MENU</p>
              <img
                src="/icons/close.svg"
                decoding="sync"
                alt=""
                className="w-6 cursor-pointer"
                onClick={() => {
                  setOpen(false);
                  closeDrawer();
                }}
              />
            </div>
            <div className="mt-10">
              <p className="text-[#FFF8E7] font-medium mb-2.5">
                On this adventure. I’d like to be
              </p>
              <div className="flex justify-between gap-5 mb-10">
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
                      reset();
                      updateUserData({
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
        </div>
      </div>
    </div>
  );
};

export default Menu;
