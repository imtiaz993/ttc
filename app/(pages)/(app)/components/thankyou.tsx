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
        <p className="text-[#D02E01] text-sm font-medium mb-2 text-center">
          Thanks for visiting!
        </p>
      </div>
      <img
        src="/icons/logo.svg"
       

        
        
        
        alt=""
        className="w-24 mb-6"
      />
      <p className="text-center text-[#D02E01] text-[11px] mb-3 px-10">
        This exhibition and digital experience have been supported by the Bank
        of America
      </p>
      <div className="w-full px-7">
        <div className="flex justify-center">
          <img
            src="/icons/bofa.svg"
           

            
            
            
            alt=""
            className="w-full"
          />
        </div>

        <p className="text-center text-[#D02E01] text-[11px] mt-5">
          All images courtesy of the Museum of Art & Photography (MAP)
          Collection, Bengaluru
        </p>
        <div className="mt-5">
          <div className="flex justify-between items-center mb-3">
            <p className="text-[11px] text-[#D02E01]">Concept</p>
            <p className="text-[#D02E01] font-semibold text-[11px]">
              Shyamli Singbal
            </p>
          </div>
          <div className="flex justify-between items-center mb-3">
            <p className="text-[11px] text-[#D02E01]">
              Narrative Design & Scripting
            </p>
            <p className="text-[#D02E01] text-[11px] font-semibold">
              Hina Siddiqui
            </p>
          </div>
          <div className="flex justify-between items-strat mb-3">
            <p className="text-[11px] text-[#D02E01]">Creative Asset Design</p>
            <p className="text-[#D02E01] font-semibold text-right text-[11px]">
              Alexis Fu, Kusuma S,
              <br /> Cibal Prems
            </p>
          </div>
          <div className="flex justify-between items-center mb-3">
            <p className="text-[11px] text-[#D02E01]">Design Consultant</p>
            <p className="text-[#D02E01] font-semibold text-[11px]">
              Nilay Gomkale
            </p>
          </div>
          <div className="flex justify-between items-center mb-3">
            <p className="text-[11px] text-[#D02E01]">Digitization</p>
            <p className="text-[#D02E01] font-semibold text-right text-[11px]">
              Bela Bahirat, Ramesha N S
            </p>
          </div>
          <div className="flex justify-between items-center mb-3">
            <p className="text-[11px] text-[#D02E01]">Tech Support</p>
            <p className="text-[#D02E01] font-semibold text-[11px]">
              Mohammad Imran
            </p>
          </div>
          <div className="flex justify-between items-center mb-3">
            <p className="text-[11px] text-[#D02E01]">Development</p>
            <p className="text-[#D02E01] font-semibold text-[11px]">
              United Monks
            </p>
          </div>
          <div className="flex justify-between items-center mb-3">
            <p className="text-[11px] text-[#D02E01]">
              UI & UX Design & Animation
            </p>
            <p className="text-[#D02E01] font-semibold text-[11px]">
              Sensoryplus
            </p>
          </div>
          <div className="flex justify-center mt-6">
            <img
              src="/icons/map.svg"
             

              
              
              
              alt=""
              className="w-16"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thankyou;
