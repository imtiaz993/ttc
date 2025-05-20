import { useSelector } from "react-redux";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";

const SareeStep2 = () => {
    const userData = useSelector((state: any) => state.user.userData);
    return (
        <>
            <Menu />
            <GameStepper />
            <div className="h-full pt-16 px-4 flex flex-col justify-start items-center bg-[#FFF8E7] font-manrope">
                <div className="w-full flex justify-between items-start">
                    <div>
                        <img
                            src={`/images/${userData.char}.png`}
                            alt=""
                            className="w-11 rounded-lg"
                        />
                        <p className="mt-1 text-xs font-medium text-center">You</p>
                    </div>
                    <div className="ml-4 w-[calc(100%-46px-16px)]">
                        <p className="font-medium">
                            Ah, I see! First we have the black and white drawing on the metal
                            plate. Then by overlapping colours, I can create the colourful
                            ticket of the lion and lioness!
                        </p>
                    </div>
                </div>
                <div className="mt-10 mb-10 w-full">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-11/12 mx-auto"
                        src="/videos/color-animation.mp4"
                    />
                </div>
            </div>
        </>
    );
};

export default SareeStep2;
