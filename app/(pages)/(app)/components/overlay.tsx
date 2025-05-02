import Image from "next/image";
import Welcome from "./welcome";

const Overlay = ({ next }) => {
  return (
    <div>
      <div className="fixed inset-0 bg-[#00000040] z-10"></div>
      <Welcome next={next} />
      <div className="fixed z-20 right-0 left-0 bottom-0 bg-[#FDD931]">
        <div
          onClick={() => {
            next();
          }}
          className="bg-[#202F00] w-[165px] my-10 mx-auto rounded-full px-3 py-2 flex items-center justify-between animate-sway"
        >
          <Image
            src="/icons/swipe-arrow.svg"
            priority={true}
            sizes="100vw"
            height={0}
            width={0}
            alt=""
            className="w-4"
          />
          <p className="mx-1 text-[#FFF8E7] text-xs text-center">
            swipe to navigate
          </p>
          <Image
            src="/icons/swipe-arrow.svg"
            priority={true}
            sizes="100vw"
            height={0}
            width={0}
            alt=""
            className="w-4 rotate-180"
          />
        </div>
      </div>
    </div>
  );
};

export default Overlay;
