const Thankyou = () => {
  return (
    <div
      id="screen-32"
      className="flex flex-col justify-center items-center border-transparent h-dvh px-7 xs:px-10 py-[60px] max-h-[1000px] bg-[#B9D7B0]"
    >
      <div className="w-full">
        <p className="text-[#D02E01] text-xl font-medium mb-2 text-center font-lora">
          Thank you for playing
        </p>
        <div className="flex justify-center">
          <img src="/icons/logo.svg" alt="" className="w-44 xs:w-52 mb-6" />
        </div>
        <div className="text-[#D02E01] text-xs font-manrope">
          <div className="flex justify-between items-center mb-2.5">
            <p className="font-light">Concept</p>
            <p className="font-semibold">Shyamli Singbal</p>
          </div>
          <div className="flex justify-between items-center mb-2.5">
            <p className="font-light">Narrative Design & Scripting</p>
            <p className="font-semibold whitespace-nowrap">Hina Siddiqui</p>
          </div>
          <div className="flex justify-between items-strat mb-3">
            <p className="font-light">Design Support</p>
            <p className="font-semibold text-right text-xs whitespace-nowrap">
              Alexis Fu, Kusuma S,
              <br />
              Cibal Prems, Madhur Arora
            </p>
          </div>
          <div className="flex justify-between items-center mb-2.5">
            <p className="font-light">Design Consultant</p>
            <p className="font-semibold">Nilay Gomkale</p>
          </div>

          <div className="flex justify-between items-center mb-2.5">
            <p className="font-light">Creative Editor</p>
            <p className="font-semibold text-right text-xs">
              Shilpa Vijayakrishnan
            </p>
          </div>
          <div className="flex justify-between items-center mb-2.5">
            <p className="font-light">Digitization</p>
            <p className="font-semibold text-right text-xs">
              Bela Bahirat, Ramesha N S
            </p>
          </div>
          <div className="flex justify-between items-center mb-2.5">
            <p className="font-light">Tech Support</p>
            <p className="font-semibold">Mohammad Imran</p>
          </div>
          <div className="flex justify-between items-center mb-2.5">
            <p className="font-light">Animations</p>
            <p className="font-semibold">Jason Azyu</p>
          </div>
          <div className="flex justify-between items-center mb-2.5">
            <p className="font-light">Development</p>
            <p className="font-semibold">United Monks Technologies</p>
          </div>
          <div className="flex justify-between items-center mb-2.5">
            <p className="font-light">UI & UX Design</p>
            <p className="font-semibold">Sensoryplus</p>
          </div>
        </div>
      </div>
      <div className="mt-10 w-full">
        <p className="text-center text-[#D02E01] text-xs font-manrope font-light">
          All images courtesy of the Museum of Art & Photography (MAP)
          Collection, Bengaluru
        </p>
      </div>
      <div className="w-full mt-6 flex justify-between items-center">
        <img src="/images/bofa-bank.png" alt="" className="w-52" />
        <img src="/images/map-logo.png" alt="" className="w-16" />
      </div>
    </div>
  );
};

export default Thankyou;
