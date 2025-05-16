import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";
import { useSelector } from "react-redux";

const OwnTikkaStep2 = () => {
  const userData = useSelector((state: any) => state.user.userData);
  return (
    <>
      <Menu />
      <GameStepper />
      <div className="h-full pt-16 px-4 flex flex-col justify-start items-center bg-[#FFF8E7]">
        <div className="w-full flex items-start mb-6">
          <div>
            <img
              src={`/images/${userData.char}.png`}
             

              
              
              
              alt=""
              className="w-11 rounded-lg"
            />
            <p className="mt-1 text-xs font-medium text-center">You</p>
          </div>
          <p className="ml-4 font-medium w-[cacl(100%-46px)]">
            Tickets - A legacy of 200 years of advertising! I wonder how much
            they have  influenced newspapers, television commercials, even
            social media… 
            <br />
            <br />I wish I could try my hand at making a ticket!
          </p>
        </div>
      </div>
    </>
  );
};

export default OwnTikkaStep2;
