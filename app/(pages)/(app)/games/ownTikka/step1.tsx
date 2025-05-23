import Menu from "../../components/menu";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  resetStepperProps,
  setStepperProps,
} from "../../../../redux/slices/progressSlice";

const OwnTikkaStep1 = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setStepperProps({
        iswhite: true,
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
        <div className="w-full flex justify-between items-start mb-4">
          <p className="font-playwriteDEGrund">8th August, 1886</p>
          <div>
            <img src="/images/kamla.png" alt="" className="w-11 rounded-lg" />
            <p className="mt-1 text-sm font-medium text-center font-manrope">
              Kamla
            </p>
          </div>
        </div>
        <p className="text-sm mb-6 font-playwriteDEGrund">
          I am saving almost every ticket I come across.
          <br />
          Mama says it's all just junk, but I am sure, centuries from now, my
          collection will grace the halls of some famous museum and bring joy to
          some fanciful dreamer just like me!
        </p>
        <div className="flex justify-center items-center mb-32">
          <img src="/images/own-tikka.gif" alt="" className="w-52" />
        </div>
      </div>
    </>
  );
};

export default OwnTikkaStep1;
