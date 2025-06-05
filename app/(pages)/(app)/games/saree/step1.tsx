import { useEffect, useRef, useState } from "react";
import Menu from "../../components/menu";
import { useDispatch, useSelector } from "react-redux";
import {
  resetStepperProps,
  setStepperProps,
} from "../../../../redux/slices/progressSlice";
import { openOverlay, toggleMute } from "../../../../redux/slices/userSlice";
import SwipeOverlay from "../../components/swipeOverlay";
import { useInactivity } from "../../../../hooks/useInactivity";

const SareeStep1 = () => {
  const dispatch = useDispatch();
  const handleToggleMute = (data) => dispatch(toggleMute(data));
  const isMuted = useSelector((state: any) => state.user.isMuted);
  const [playingBg, setPlayingBg] = useState(isMuted ? "paused" : "playing");
  const [playSound, setPlaySound] = useState(false);
  const bgMusicRef = useRef(null);

  const [overlay, setOverlay] = useState(false);
  const displayOverlay = () => dispatch(openOverlay());
  useInactivity({
    time: 8000,
    onInactivity: () => {
      setOverlay(true);
      displayOverlay();
    },
    condition: () => {
      return !overlay && !playSound;
    },
  });

  useEffect(() => {
    bgMusicRef.current = new Audio("/audio/chromo.mp3");
    bgMusicRef.current.loop = false;

    bgMusicRef.current.addEventListener("ended", () => {
      setPlaySound(false);
    });

    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current = null;
      }
    };
  }, []);

  const playMusic = () => {
    if (bgMusicRef.current) {
      bgMusicRef.current
        .play()
        .catch((error) => console.error("Play failed:", error));
    }
  };

  useEffect(() => {
    if (playSound) {
      if (playingBg === "playing") {
        handleToggleMute(true);
        setPlayingBg("delaying");
      }
      playMusic();
    } else {
      if (playingBg === "delaying") {
        handleToggleMute(false);
        setPlayingBg("playing");
      }
      bgMusicRef.current.pause();
    }
  }, [playSound]);

  useEffect(() => {
    dispatch(
      setStepperProps({
        showPrev: false,
        showContinue: true,
      })
    );
    return () => {
      dispatch(resetStepperProps()); // This resets to initialState
    };
  }, []);

  return (
    <>
      {overlay && <SwipeOverlay setOverlay={setOverlay} />}
      <Menu />
      <div className="h-full pt-16 pb-24 px-4 flex flex-col justify-between items-center bg-[#FFF8E7]">
        <div>
          <div className="w-full flex justify-between items-start mb-4">
            <div>
              <img
                src="/images/selma.png"
                alt=""
                className="w-11 rounded-full bg-[#EA865B] border border-black"
              />
              <p className="mt-1 text-sm font-medium text-center font-manrope">
                Selma
              </p>
            </div>
            <p className="text-right font-playwriteDEGrund">
              111 Arthur Road,
              <br />
              Bombay,
              <br />
              400025
              <br />
              18th April, 1886
            </p>
          </div>
          <div className="w-full">
            <p className="text-sm">
              <p className="mt-4 font-playwriteDEGrund"> Dearest Kamla, </p>
            </p>
            <div className="text-sm mb-4 xs:mb-6 font-playwriteDEGrund">
              <p className="mb-4">
                Papa says tickets are made using this modern printing technique
                called “Chromolithography.” Impressions taken from many metal
                plates are overlapped to build a picture layer by layer. Some
                Frenchman invented it to make playing cards!
              </p>
              <p>
                Oh, I almost forgot! The most fascinating part about this
                process is that you can print thousands of copies of a single
                design!
              </p>
              <p> Sounds like magic, doesn’t it?</p>
              <p> Much love,</p>
              Selma
            </div>
          </div>
        </div>
        <div className="mt-2 xs:mt-5">
          <div
            className="bg-[#FDD931] rounded py-3 px-4"
            onClick={() => {
              setPlaySound(!playSound);
            }}
          >
            <div className="w-full flex justify-start items-center mb-2 font-manrope">
              <img
                src={playSound ? "/icons/pause.svg" : "/icons/sound.svg"}
                alt=""
                className="w-6"
              />
              <p
                className={`ml-2 flex items-center text-sm font-semibold w-[calc(100%-24px)] ${
                  playSound ? "underline" : ""
                }`}
              >
                Chromolithography
                <img
                  src={"/icons/volume.svg"}
                  alt=""
                  className="w-[18px] ml-1"
                />
              </p>
            </div>
            <p className="mt-2 text-sm">
              Chromolithography is a print making technique which layers
              impressions from a series of stones or metal plates.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SareeStep1;
