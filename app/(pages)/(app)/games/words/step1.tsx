import Menu from "../../components/menu";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { resetStepperProps, setStepperProps } from "../../../../redux/slices/progressSlice";

const WordsStep1 = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setStepperProps({
        iswhite: true,
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
      <div
        style={{
          backgroundImage: "url('/images/yellow-bg.png')",
          backgroundSize: "cover",
          backgroundRepeat: "round",
        }}
        className="h-full pt-16 px-4 flex flex-col justify-start items-center"
      >
        <div className="w-full">
          <div className="w-full flex justify-between items-start mb-4">
            <p className="font-playwriteDEGrund">6th May, 1886</p>
            <div>
              <img src="/images/kamla.png" alt="" className="w-11 rounded-lg" />
              <p className="mt-1 text-xs font-medium text-center font-manrope">
                Ajji
              </p>
            </div>
          </div>
          <p className="text-sm mb-6 font-playwriteDEGrund">
            Now I see that tickets can be inspired by almost anything - from
            famous artworks to photographs to architecture and even mangoes!
            <br />
            <br />
            But I wonder what it all means…
          </p>
        </div>
        <div className="flex justify-center items-center">
          <img src="/images/graham-bombay.png" alt="" className="w-52" />
        </div>
      </div>
    </>
  );
};

export default WordsStep1;
