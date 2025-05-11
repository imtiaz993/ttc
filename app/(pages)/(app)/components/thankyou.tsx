import Image from "next/image";

const Thankyou = () => {
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
        <p className="text-[#D02E01] text-4xl font-bold mb-10 text-center">
          Thanks for visiting!
        </p>
      </div>
      <div className="w-full px-7">
        <div className="flex justify-center">
          <Image
            src="/icons/bofa.svg"
            priority={true}
            sizes="100vw"
            height={0}
            width={0}
            alt=""
            className="w-full"
          />
        </div>
        <p className="text-center text-[#D02E01] text-sm mt-3">
          Supported by the Bank of America
        </p>
        <p className="text-center text-[#D02E01] text-sm mt-5">
          All images courtesy of the Museum of Art & Photography (MAP)
          Collection, Bengaluru.
        </p>
        <div className="mt-5">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-[#D02E01]">Concept</p>
            <p className="text-[#D02E01] font-semibold">MAP Bengaluru</p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-[#D02E01]">Photography</p>
            <p className="text-[#D02E01] font-semibold">MAP Bengaluru</p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-[#D02E01]">UI UX</p>
            <p className="text-[#D02E01] font-semibold">Sensory+</p>
          </div>
          <div className="flex justify-between items-center mb-5">
            <p className="text-sm text-[#D02E01]">Development</p>
            <p className="text-[#D02E01] font-semibold">United Monks</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Image
            src="/icons/social1.svg"
            priority={true}
            sizes="100vw"
            height={0}
            width={0}
            alt=""
            className="w-7"
          />
          <Image
            src="/icons/insta.svg"
            priority={true}
            sizes="100vw"
            height={0}
            width={0}
            alt=""
            className="w-7"
          />
          <Image
            src="/icons/x.svg"
            priority={true}
            sizes="100vw"
            height={0}
            width={0}
            alt=""
            className="w-7"
          />
        </div>
      </div>
    </div>
  );
};

export default Thankyou;
