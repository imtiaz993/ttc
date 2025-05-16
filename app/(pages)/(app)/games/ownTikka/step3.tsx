import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";
import { nextStep } from "../../../../redux/slices/navigationSlice";

const OwnTikkaStep3 = () => {
  const [overlay, setOverlay] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("Background");
  const [selectedOptions, setSelectedOptions] = useState({
    Background: "",
    Border: "",
    Elements: "",
    Text: "",
  });

  const dispatch = useDispatch();
  const next = () => dispatch(nextStep());
  const handleComplete = () => {
    next();
  };

  useEffect(() => {
    if (
      selectedOptions.Background &&
      selectedOptions.Border &&
      selectedOptions.Elements &&
      selectedOptions.Text
    ) {
      setTimeout(() => {
        handleComplete();
      }, 2000);
    }
  }, [selectedOptions]);

  const menu = [
    {
      menu: "Background",
      iconWhite: "/icons/backgroud-white.svg",
      iconBlack: "/icons/background-black.svg",
      options: ["/images/bg-1.png", "/images/bg-2.png", "/images/bg-3.png"],
    },
    {
      menu: "Border",
      iconWhite: "/icons/border-white.svg",
      iconBlack: "/icons/border-black.svg",
      options: [
        "/images/border-1.png",
        "/images/border-2.png",
        "/images/border-3.png",
        "/images/border-4.png",
        "/images/border-5.png",
        "/images/border-6.png",
      ],
    },
    {
      menu: "Elements",
      iconWhite: "/icons/bulb-white.svg",
      iconBlack: "/icons/bulb-black.svg",
      options: [
        "/images/element-1.png",
        "/images/element-2.png",
        "/images/element-3.png",
        "/images/element-4.png",
        "/images/element-5.png",
        "/images/element-6.png",
        "/images/element-7.png",
        "/images/element-8.png",
        "/images/element-9.png",
        "/images/element-10.png",
        "/images/element-11.png",
        "/images/element-12.png",
      ],
    },
    {
      menu: "Text",
      iconWhite: "/icons/text-white.svg",
      iconBlack: "/icons/text-black.svg",
      options: ["MAP, BENGALURU.", "ಎಂ ಎ ಪಿ ಬೆಂಗಳೂರು"],
    },
  ];
  return (
    <>
      <Menu
        showInfo={true}
        handleInfo={() => {
          setOverlay(true);
        }}
      />
      <GameStepper showPrev={false} showNext={false} />
      {overlay && (
        <div>
          <div className="fixed inset-0 bg-[#00000040] z-30"></div>
          <div className="fixed z-40 h-fit w-11/12 inset-0 rounded py-3 px-4 bg-[#FDD931] mx-auto left-1/2 top-1/2 transform -translate-x-1/2">
            <div className="w-full flex justify-between items-start mb-2">
              <img src="/icons/mouse.svg" alt="" className="w-6" />
              <p className="ml-2 text-xs font-semibold w-[calc(100%-24px)]">
                Create your own Ticket
              </p>
              <img
                src="/icons/close-black.svg"
                alt=""
                className="w-6"
                onClick={() => {
                  setOverlay(false);
                }}
              />
            </div>
            <p className="mt-2 text-xs">
              Use backgrounds,borders, characters and more from ticket all
              around you to design your unique tika and leave a Chaap on the
              world!
            </p>
          </div>
        </div>
      )}
      <div
        className={`h-full pt-16 px-4 flex flex-col justify-start items-center bg-[#FFF8E7]`}
      >
        <div
          className="w-60 h-80 mb-16 relative"
          style={{
            backgroundImage: selectedOptions.Background
              ? `url(${selectedOptions.Background})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "1px solid black",
          }}
        >
          {selectedOptions.Background ||
          selectedOptions.Border ||
          selectedOptions.Elements ? (
            <>
              {selectedOptions.Elements && (
                <img
                  src={selectedOptions.Elements}
                  alt="Selected Element"
                  className="w-24 h-24 object-contain absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                />
              )}
              {selectedOptions.Border && (
                <img
                  src={selectedOptions.Border}
                  alt="Selected Element"
                  className="w-full h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                />
              )}
              <p className="text-[10px] font-semibold absolute bottom-1 z-40 flex justify-center w-full">
                {selectedOptions.Text}
              </p>
            </>
          ) : (
            <p className="text-xs font-semibold text-center flex justify-center items-center h-full max-w-[140px] mx-auto">
              Let’s begin by selecting a background
            </p>
          )}
        </div>
        <div className="px-4 w-full absolute bottom-24 ">
          <div className="w-full flex gap-3 flex-row justify-between items-center flex-nowrap overflow-x-auto scrollbar-thin scrollbar-thumb-[#FDD931] scrollbar-track-gray-200">
            {menu
              .find((menu) => menu.menu == selectedMenu)
              .options.map((option, index) =>
                selectedMenu === "Text" ? (
                  <p
                    onClick={() => {
                      setSelectedOptions({
                        ...selectedOptions,
                        [selectedMenu]: option,
                      });
                    }}
                    className={`flex-shrink-0 ${
                      selectedOptions[selectedMenu] == option
                        ? "font-semibold"
                        : ""
                    }`}
                  >
                    {option}
                  </p>
                ) : (
                  <div key={index} className="relative flex-shrink-0 w-20">
                    {selectedOptions[selectedMenu] == option && (
                      <img
                        src="/icons/selected.svg"
                        alt=""
                        className=" w-10 h-10 absolute translate-x-1/2 translate-y-1/2"
                      />
                    )}
                    <img
                      src={option}
                      alt=""
                      className="w-20 h-[100px] object-contain"
                      onClick={() => {
                        setSelectedOptions({
                          ...selectedOptions,
                          [selectedMenu]: option,
                        });
                      }}
                    />
                  </div>
                )
              )}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-5">
            {menu.map((menu, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedMenu(menu.menu);
                }}
                className={`border  border-black rounded flex justify-center gap-2 py-[11px] w-full font-semibold ${
                  menu.menu === selectedMenu
                    ? "bg-black text-white"
                    : "bg-transparent text-black"
                }`}
              >
                <img
                  src={
                    menu.menu === selectedMenu ? menu.iconWhite : menu.iconBlack
                  }
                  alt=""
                  className="w-6"
                />
                {menu.menu}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OwnTikkaStep3;
