import { useDispatch, useSelector } from "react-redux";
import Menu from "../../components/menu";
import { useEffect } from "react";
import { resetStepperProps, setStepperProps } from "../../../../redux/slices/progressSlice";

const PuzzleStep4 = () => {
  const userData = useSelector((state: any) => state.user.userData);
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
      <div className="h-full pt-16 px-4 flex flex-col justify-between pb-24 items-center bg-[#FFF8E7] font-manrope">
        <div>
          <div className="w-full flex items-start">
            <div>
              <img
                src={`/images/${userData.char}.png`}
                alt=""
                className="w-11 rounded-lg"
              />
              <p className="mt-1 text-sm font-medium text-center">You</p>
            </div>
            <p className="ml-4 font-medium w-[calc(100%-44px)]">
              Wow! A wall of modern wonders - some oddly familiar, some utterly
              bizarre
            </p>
          </div>
          <div className="w-full flex justify-between items-start mt-6">
            <img
              src="/images/wonder1.png"
              alt=""
              className="w-[138px]"
            />
            <img src="/images/wonder2.png" alt="" className="w-[146px]" />
          </div>
          <div className="flex justify-center mt-5">
            <img src="/images/wonder3.png" alt="" className="w-[139px]" />
          </div>
        </div>
        <div className="bg-[#FDD931] rounded py-3 px-4 w-full mt-7">
          <div className="w-full flex items-center mb-2">
            <img src="/icons/location.svg" alt="" className="w-6" />
            <p className="ml-2 text-sm font-semibold w-[calc(100%-24px)]">
              A secret chamber calls you…
            </p>
          </div>
          <p className="mt-2 text-sm">
            Once inside, you’ll know what to do next!
          </p>
        </div>
      </div>
    </>
  );
};

export default PuzzleStep4;
