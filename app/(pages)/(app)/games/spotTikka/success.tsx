import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { nextStep } from "../../../../redux/slices/navigationSlice";

const Success = () => {
  const dispatch = useDispatch();

  const next = () => dispatch(nextStep());

  useEffect(() => {
    setTimeout(() => {
      next();
    }, 3000);
  }, []);

  return (
    <div className="h-full pt-16 pb-24 px-4 flex flex-col justify-center items-center bg-[#FFF8E7]">
      <img src="/images/success.gif" alt="" className="w-36" />
      <p className="text-xs font-semibold mt-6">Great job!</p>
      <p className="text-xs mt-2">You got it right in the first go</p>
    </div>
  );
};

export default Success;
