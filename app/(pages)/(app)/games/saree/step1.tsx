import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";

const SareeStep1 = () => {
  return (
    <>
      <Menu />
      <GameStepper showPrev={false} />
      <div className="h-full pt-16 pb-24 px-4 flex flex-col justify-between items-center bg-[#FFF8E7]">
        <div>
          <div className="w-full flex justify-between items-start mb-4">
            <div>
              <img
                src="/images/selma.png"
               

                
                
                
                alt=""
                className="w-11 rounded-lg"
              />
              <p className="mt-1 text-xs font-medium text-center">Selma</p>
            </div>
            <p className="text-right">
              111 Arthur Road,
              <br />
              Bombay,
              <br />
              400025
              <br />
              18th April, 1886
            </p>
          </div>
          <div className="w-full">
            <p className="text-sm">
              <p className="mt-4"> Dearest Kamla, </p>
            </p>
            <p className="text-sm mb-6">
              <p className="mb-2">
                Papa says tikas are printed in their thousands using this ultra
                modern  technique called Chromolithography
              </p>
              Many metal plates are used to overlap colours and build a picture
              layer by layer. Some Frenchman invented it to make playing cards! 
              <br />
              <br />
              Doesn’t it sound so magical?! <br />
              <br />
              Much love, <br />
              Selma <br />
            </p>
          </div>
        </div>
        <div className="mt-5">
          <div className="bg-[#FDD931] rounded py-3 px-4">
            <div className="w-full flex justify-between items-start mb-2">
              <img
                src="/icons/sound.svg"
               

                
                
                
                alt=""
                className="w-6"
              />
              <p className="ml-2 text-sm font-semibold w-[calc(100%-24px)]">
                Chromolithography
              </p>
            </div>
            <p className="mt-2 text-xs">
              A printing technique which uses many metal plates to build up a
              picture layer by layer.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SareeStep1;
