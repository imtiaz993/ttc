import { useEffect, useRef, useState } from "react";
import Menu from "../../components/menu";
import { useDispatch } from "react-redux";
import {
  resetStepperProps,
  setStepperProps,
} from "../../../../redux/slices/progressSlice";

const SareeStep1 = () => {
  const [playSound, setPlaySound] = useState(false);
  const bgMusicRef = useRef(null);

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
      playMusic();
    } else {
      bgMusicRef.current.pause();
    }
  }, [playSound]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setStepperProps({
        showPrev: false,
      })
    );
    return () => {
      dispatch(resetStepperProps()); // This resets to initialState
    };
  }, []);

  return (
    <>
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
              <p className="mt-4"> Dearest Kamla, </p>
            </p>
            <p className="text-sm mb-6 font-playwriteDEGrund">
              <p className="mb-2">
                Papa says tikas are printed in their thousands using this ultra
                modern  technique called Chromolithography
              </p>
              Many metal plates are used to overlap colours and build a picture
              layer by layer. Some Frenchman invented it to make playing cards! 
              <br />
              <br />
              Sounds like magic, doesn’t it? <br />
              <br />
              Much love, <br />
              Selma <br />
            </p>
          </div>
        </div>
        <div className="mt-5">
          <div
            className="bg-[#FDD931] rounded py-3 px-4"
            onClick={() => {
              setPlaySound(!playSound);
            }}
          >
            <div className="w-full flex justify-between items-center mb-2 font-manrope">
              <img
                src={playSound ? "/icons/pause.svg" : "/icons/sound.svg"}
                alt=""
                className="w-6"
              />
              <p
                className={`ml-2 text-sm font-semibold w-[calc(100%-24px)] ${
                  playSound ? "underline" : ""
                }`}
              >
                Chromolithography
              </p>
            </div>
            <p className="mt-2 text-sm">
              Chromolithography is a print making technique which uses
              impressions from a series of stone or metal plates.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SareeStep1;
