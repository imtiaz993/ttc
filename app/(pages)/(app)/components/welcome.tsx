import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { nextStep } from "../../../redux/slices/navigationSlice";
import { setUserData } from "../../../redux/slices/userSlice";

const Welcome = ({ playMusic = () => {} }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.user.userData);
  const next = () => dispatch(nextStep());
  const updateUserData = (data) => dispatch(setUserData(data));

  return (
    <div
      className="flex flex-col justify-center items-center border-transparent h-dvh px-12"
      style={{
        backgroundImage: "url('/images/welcome-frame.png')",
        backgroundSize: "contain",
        backgroundRepeat: "round",
      }}
    >
      <div className="px-10">
        <p className="text-[#D02E01] text-sm font-medium mb-3 text-center">
          Welcome to
        </p>
        <Image
          src="/icons/logo.svg"
          priority={true}
          fetchPriority="high"
          sizes="100vw"
          height={0}
          width={0}
          alt=""
          className="w-60 mb-14"
        />
      </div>
      <Image
        src="/images/welcome-divider.png"
        priority={true}
        fetchPriority="high"
        sizes="100vw"
        height={0}
        width={0}
        alt=""
        className="w-full"
      />
      <div className="mt-7 px-10">
        <p className="text-[#D02E01] text-sm mb-6 text-center max-w-60">
          A world within a world… Messages from a time forgotten… Wish you well
          on this journey, friend!
        </p>
        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            playMusic();
            const name = e.target.name.value;
            updateUserData({ ...userData, name });
            next();
          }}
          className="flex justify-between pb-2 border-b border-[#223100]"
        >
          <input
            className="text-[#202F00] text-sm outline-none placeholder:text-[#202F00] w-full bg-transparent"
            placeholder="Enter your name to begin"
            type="text"
            name="name"
            autoComplete="off"
            required
          />
          <button type="submit" className="w-5 h-5">
            <Image
              src="/icons/arrow-forward.svg"
              priority={true}
              fetchPriority="high"
              sizes="100vw"
              height={0}
              width={0}
              alt="Submit"
              className="w-full h-full"
            />
          </button>
        </form>
        <div className="flex justify-center mt-6">
          <Image
            src="/icons/map.svg"
            priority={true}
            fetchPriority="high"
            sizes="100vw"
            height={0}
            width={0}
            alt=""
            className="w-16"
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
