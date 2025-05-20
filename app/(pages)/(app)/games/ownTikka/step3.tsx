import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import html2canvas from "html2canvas";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";
import { nextStep } from "../../../../redux/slices/navigationSlice";
import { setUserData } from "../../../../redux/slices/userSlice";

const OwnTikkaStep3 = () => {
  const [overlay, setOverlay] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("Background");
  const userData = useSelector((state: any) => state.user.userData);
  const updateUserData = (data) => dispatch(setUserData(data));
  const [showTextInput, setShowTextInput] = useState(false);
  const [customText, setCustomText] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({
    Background: "",
    Border: "",
    Elements: "",
    Text: "",
  });

  const dispatch = useDispatch();
  const next = () => dispatch(nextStep());
  const textInputRef = useRef(null);

  const saveCreatedTika = async () => {
    if (typeof window != "undefined") {
      const element = document.getElementById("ticket-container");
      if (!element) return;

      const canvas = await html2canvas(element);
      const blobUrl = canvas.toDataURL("image/png");
      updateUserData({
        ...userData,
        createdTika: blobUrl,
      });
    }
  };

  const handleComplete = async () => {
    await saveCreatedTika();
    next();
  };

  useEffect(() => {
    if (
        selectedOptions.Background &&
        selectedOptions.Border &&
        selectedOptions.Elements &&
        selectedOptions.Text
    ) {
      setShowTextInput(true);
    }
  }, [selectedOptions]);

  useEffect(() => {
    if (textInputRef.current) {
      textInputRef.current.focus(); // Auto-focus to open keyboard
    }
  }, [showTextInput]);

  const menu = [
    {
      menu: "Background",
      iconWhite: "/icons/backgroud-white.svg",
      iconBlack: "/icons/background-black.svg",
      options: ["/images/bg-1.jpg", "/images/bg-2.jpg", "/images/bg-3.jpg"],
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
        showFinish={Boolean(
          selectedOptions.Background &&
            selectedOptions.Border &&
            selectedOptions.Elements &&
            selectedOptions.Text
        )}
        handleFinish={handleComplete}
        handleInfo={() => {
          setOverlay(true);
        }}
      />
      <GameStepper showPrev={false} showNext={false} />
      {overlay && (
        <div>
          <div className="fixed inset-0 bg-[#00000040] z-50"></div>
          <div className="fixed z-[99] h-fit w-11/12 inset-0 rounded py-3 px-4 bg-[#FDD931] mx-auto left-1/2 top-1/2 transform -translate-x-1/2 font-manrope">
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
        className={`h-full pt-16 px-4 flex flex-col justify-between items-center bg-[#FFF8E7] font-manrope`}
      >
        <div
          id="ticket-container"
          className="w-60 h-80 mb-16 relative"
          style={{
            backgroundImage: selectedOptions.Background
              ? `url(${selectedOptions.Background})`
              : "none",
            backgroundSize: "contain",
            backgroundPosition: "center",
            border:
              selectedOptions.Background ||
              selectedOptions.Border ||
              selectedOptions.Elements
                ? ""
                : "1px solid black",
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
                    alt="Selected Border"
                    className="w-full h-full object-cover absolute top-0 left-0 z-20"
                />
            )}

            <p className="text-[10px] font-semibold text-center uppercase absolute top-1 z-40 flex justify-center w-full">
              {customText}
            </p>

            {showTextInput && (
                <input
                    ref={textInputRef}
                    type="text"
                    value={customText}
                    maxLength={16}
                    onChange={(e) => setCustomText(e.target.value)}
                    className="text-[10px] font-semibold outline-none text-center uppercase absolute top-1 z-40 w-full bg-transparent placeholder:text-black"
                    autoFocus
                />
              )}
              <p className="text-[10px] font-semibold text-center uppercase absolute top-1 z-40 flex justify-center w-full">
                {customText}
              </p>
              {showTextInput && (
                <input
                  ref={textInputRef}
                  type="text"
                  value={customText}
                  maxLength={16}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder=""
                  className="text-[10px] font-semibold outline-none text-center uppercase absolute top-1 z-40 flex justify-center w-full bg-transparent placeholder:text-black"
                  autoFocus
                />
              )}
              <p className="text-[10px] font-semibold absolute bottom-1.5 z-40 flex justify-center w-full">
                {selectedOptions.Text}
              </p>
            </>
          ) : (
            <p className="text-xs font-semibold text-center flex justify-center items-center h-full max-w-[140px] mx-auto">
              Let’s begin by selecting a background
            </p>
          )}
        </div>
        <div className="px-4 w-full absolute bottom-12">
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
          <div className="mt-5 grid grid-cols-2 gap-4">
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
