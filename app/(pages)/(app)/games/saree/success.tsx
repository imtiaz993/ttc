import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { nextStep } from "../../../../redux/slices/navigationSlice";
import Lottie from "react-lottie";
import successAnimation from "../../../animation/Correct Case.json";

const Success = ({ userData, sareePath }) => {
  const dispatch = useDispatch();

  const next = () => dispatch(nextStep());

  useEffect(() => {
    setTimeout(() => {
      next();
    }, 3000);
  }, []);
  return (
    <div className="h-full pt-16 px-4 flex flex-col justify-between pb-24 items-center bg-[#FFF8E7]">
      <div className="w-full flex justify-between items-start">
        <div>
          <img
            src={`/images/${userData.char}.png`}
            alt=""
            className="w-11 rounded-lg"
          />
          <p className="mt-1 text-xs font-medium text-center">You</p>
        </div>
        <div className="ml-4 w-[calc(100%-46px-16px)]">
          <p className="font-medium">
            I am an absolute pro at this! 19th century printing houses would
            have started a bidding war to hire me as their printer! hehe
          </p>
        </div>
      </div>
      <div className="relative">
        <img src={sareePath} alt="" className="w-52" />
        <div className="w-36 absolute top-16 left-8">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: successAnimation,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            }}
            height={144}
            width={144}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Success;
