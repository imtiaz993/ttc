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
        <p className="text-[#D02E01] text-4xl font-bold mb-14 text-center">
          Thanks for visiting!
        </p>
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
      <div className="w-full px-5">
        <div className="mt-12">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-[#D02E01]">An initiative by</p>
            <p className="text-[#D02E01] font-medium">MAP Bengaluru</p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-[#D02E01]">UI UX by</p>
            <p className="text-[#D02E01] font-medium">Sensory+</p>
          </div>
          <div className="flex justify-between items-center mb-16">
            <p className="text-sm text-[#D02E01]">Developed by</p>
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
