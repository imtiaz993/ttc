import Image from "next/image";
import Welcome from "./welcome";

const Overlay = ({ next }) => {
  return (
    <div>
      <div className="fixed inset-0 bg-[#00000040] z-10"></div>
      <Welcome next={next} />
      <div
        className="fixed z-20 right-0 left-0 bottom-0"
        style={{
          backgroundImage: "url('/images/overlay-yellow.png')",
          backgroundSize: "contain",
          backgroundRepeat: "round",
        }}
      >
        <div
          onClick={() => {
            next();
          }}
          className="bg-[#202F00] w-[168px] my-10 mx-auto rounded-full px-3 py-2 flex items-center justify-between"
        >
          <Image
            src="/icons/swipe-arrow.svg"
            priority={true}
            sizes="100vw"
            height={0}
            width={0}
            alt=""
            className="w-4 animate-sway1"
          />
          <p className="mx-1.5 text-[#FFF8E7] text-xs text-center">
            swipe to navigate
          </p>
          <Image
            src="/icons/swipe-arrow-forward.svg"
            priority={true}
            sizes="100vw"
            height={0}
            width={0}
            alt=""
            className="w-4 animate-sway2"
          />
        </div>
      </div>
    </div>
  );
};

export default Overlay;
