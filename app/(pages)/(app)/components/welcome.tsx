import Image from "next/image";

const Welcome = ({ next }) => {
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
        <div className="flex justify-between pb-2 border-b border-[#223100]">
          <input
            className="text-[#202F00] text-sm outline-none placeholder:text-[#202F00] w-full bg-transparent"
            placeholder="Enter your name to begin"
            type="text"
          />
          <Image
            src="/icons/arrow-forward.svg"
            priority={true}
            sizes="100vw"
            height={0}
            width={0}
            alt=""
            className="w-5"
            onClick={() => {
              next();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
