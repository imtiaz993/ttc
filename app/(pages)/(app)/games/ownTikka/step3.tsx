import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import html2canvas from "html2canvas";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";
import { nextStep } from "../../../../redux/slices/navigationSlice";
import { setUserData } from "../../../../redux/slices/userSlice";
import { Rnd } from "react-rnd";
import axios from "axios";

const OwnTikkaStep3 = () => {
  const [overlay, setOverlay] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("Background");
  const userData = useSelector((state: any) => state.user.userData);
  const updateUserData = (data) => dispatch(setUserData(data));
  const [showTextInput, setShowTextInput] = useState(false);
  const [customText, setCustomText] = useState("");
  const [elementPos, setElementPos] = useState({ x: 60, y: 60 });
  const [elementSize, setElementSize] = useState({ width: 96, height: 96 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    Background: "",
    Border: "",
    Elements: "",
    Text: "",
  });

  const dispatch = useDispatch();
  const next = () => dispatch(nextStep());
  const textInputRef = useRef(null);
  const elementRef = useRef(null);
  const ticketContainerRef = useRef(null);
  const customTextRef = useRef(null);
  const selectedTextRef = useRef(null);
  const rndRef = useRef(null);

  // Add gesture detection for pinch zooming
  useEffect(() => {
    const element = ticketContainerRef.current;
    if (!element || !selectedOptions.Elements) return;

    let startDistance = 0;
    let currentZoom = zoom;

    const handleTouchStart = (e) => {
      if (e.touches.length === 2 && !isDragging && !isResizing) {
        // Get the distance between two fingers
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        startDistance = Math.sqrt(dx * dx + dy * dy);
        e.preventDefault();
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 2 && startDistance > 0 && !isDragging && !isResizing) {
        // Calculate new distance
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const newDistance = Math.sqrt(dx * dx + dy * dy);

        // Calculate zoom factor
        const factor = newDistance / startDistance;
        const newZoom = Math.max(0.5, Math.min(3, currentZoom * factor));

        // Apply zoom
        setZoom(newZoom);

        // Adjust size with zoom factor
        setElementSize(prevSize => ({
          width: Math.round(prevSize.width * factor),
          height: Math.round(prevSize.height * factor)
        }));

        startDistance = newDistance;
        currentZoom = newZoom;
        e.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      startDistance = 0;
    };

    // Add wheel event for mouse wheel zooming
    const handleWheel = (e) => {
      if (selectedOptions.Elements && !isDragging && !isResizing) {
        e.preventDefault();

        // Calculate zoom direction and factor
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const newZoom = Math.max(0.5, Math.min(3, zoom * delta));

        // Apply zoom
        setZoom(newZoom);

        // Update element size
        setElementSize(prevSize => ({
          width: Math.round(prevSize.width * delta),
          height: Math.round(prevSize.height * delta)
        }));
      }
    };

    element.addEventListener("touchstart", handleTouchStart, { passive: false });
    element.addEventListener("touchmove", handleTouchMove, { passive: false });
    element.addEventListener("touchend", handleTouchEnd);
    element.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
      element.removeEventListener("wheel", handleWheel);
    };
  }, [selectedOptions.Elements, zoom, isDragging, isResizing]);

  const saveCreatedTika = async () => {
    if (typeof window === "undefined") return;

    // Hide input field during capture
    const originalInputDisplay = textInputRef.current ? textInputRef.current.style.display : null;
    if (textInputRef.current) {
      textInputRef.current.style.display = "none";
    }

    // Create temporary text containers with fixed positions for the canvas capture
    const element = ticketContainerRef.current;
    if (!element) return;

    // Create temporary text elements with exact positions
    const tempTopText = document.createElement('p');
    tempTopText.innerText = customText;
    tempTopText.style.cssText = `
      position: absolute;
      top: 1px;
      left: 0;
      width: 100%;
      text-align: center;
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      z-index: 40;
      margin: 0;
      padding: 0;
    `;

    const tempBottomText = document.createElement('p');
    tempBottomText.innerText = selectedOptions.Text;
    tempBottomText.style.cssText = `
      position: absolute;
      bottom: ${selectedOptions.Border?.includes("border-5") ? "8px" : "11px"};
      left: 0;
      width: 100%;
      text-align: center;
      font-size: 10px;
      font-weight: 600;
      z-index: 40;
      margin: 0;
      padding: 0;
    `;

    // Hide original text elements
    if (customTextRef.current) customTextRef.current.style.visibility = "hidden";
    if (selectedTextRef.current) selectedTextRef.current.style.visibility = "hidden";

    // Add temporary text elements
    element.appendChild(tempTopText);
    element.appendChild(tempBottomText);

    await Promise.all(
        Array.from(document.images)
            .filter(img => !img.complete)
            .map(img => new Promise(resolve => {
              img.onload = img.onerror = resolve;
            }))
    );

    if (selectedOptions.Elements) {
      const originalElementContainer = document.querySelector('.Rnd');
      if (originalElementContainer) {
        const originalDisplay = originalElementContainer.style.display;
        originalElementContainer.style.display = 'none';

        // Create temporary high-res element
        const highResElement = document.createElement('img');
        highResElement.src = selectedOptions.Elements;
        highResElement.style.position = 'absolute';
        highResElement.style.left = `${elementPos.x}px`;
        highResElement.style.top = `${elementPos.y}px`;
        highResElement.style.width = `${elementSize.width}px`;
        highResElement.style.height = `${elementSize.height}px`;
        highResElement.style.objectFit = 'contain';
        highResElement.style.zIndex = '99';

        element.appendChild(highResElement);

        const canvas = await html2canvas(element, {
          scale: 5,
          useCORS: true,
          backgroundColor: null,
          scrollX: 0,
          scrollY: -window.scrollY,
          logging: false,
          imageTimeout: 0,
          allowTaint: true,
          removeContainer: false
        });

        // Cleanup: remove temporary elements
        element.removeChild(highResElement);
        element.removeChild(tempTopText);
        element.removeChild(tempBottomText);
        originalElementContainer.style.display = originalDisplay;

        // Restore visibility of original text elements
        if (customTextRef.current) customTextRef.current.style.visibility = "visible";
        if (selectedTextRef.current) selectedTextRef.current.style.visibility = "visible";

        // Restore input display
        if (textInputRef.current) {
          textInputRef.current.style.display = originalInputDisplay;
        }

        canvas.toBlob(async (blob) => {
          if (!blob) return;

          const formData = new FormData();
          formData.append("file", blob, "ticket.png");
          formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "");
          try {
            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                formData
            );

            const { secure_url } = response.data;

            updateUserData({
              ...userData,
              createdTika: secure_url,
            });
            next();
          } catch (error) {
            console.error("Upload to Cloudinary failed:", error);
          }
        }, "image/png", 1.0);
      } else {
        const canvas = await html2canvas(element, {
          scale: 5,
          useCORS: true,
          backgroundColor: null,
          scrollX: 0,
          scrollY: -window.scrollY,
          logging: false,
          imageTimeout: 0,
          allowTaint: true
        });

        // Cleanup: remove temporary elements
        element.removeChild(tempTopText);
        element.removeChild(tempBottomText);

        // Restore visibility of original text elements
        if (customTextRef.current) customTextRef.current.style.visibility = "visible";
        if (selectedTextRef.current) selectedTextRef.current.style.visibility = "visible";

        // Restore input display
        if (textInputRef.current) {
          textInputRef.current.style.display = originalInputDisplay;
        }

        canvas.toBlob(async (blob) => {
          if (!blob) return;

          const formData = new FormData();
          formData.append("file", blob, "ticket.png");
          formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "");
          try {
            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                formData
            );

            const { secure_url } = response.data;

            updateUserData({
              ...userData,
              createdTika: secure_url,
            });
            next();
          } catch (error) {
            console.error("Upload to Cloudinary failed:", error);
          }
        }, "image/png", 1.0);
      }
    } else {
      const canvas = await html2canvas(element, {
        scale: 5,
        useCORS: true,
        backgroundColor: null,
        scrollX: 0,
        scrollY: -window.scrollY,
        logging: false,
        imageTimeout: 0,
        allowTaint: true
      });

      // Cleanup: remove temporary elements
      element.removeChild(tempTopText);
      element.removeChild(tempBottomText);

      // Restore visibility of original text elements
      if (customTextRef.current) customTextRef.current.style.visibility = "visible";
      if (selectedTextRef.current) selectedTextRef.current.style.visibility = "visible";

      // Restore input display
      if (textInputRef.current) {
        textInputRef.current.style.display = originalInputDisplay;
      }

      canvas.toBlob(async (blob) => {
        if (!blob) return;

        const formData = new FormData();
        formData.append("file", blob, "ticket.png");
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "");
        try {
          const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
          const response = await axios.post(
              `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
              formData
          );

          const { secure_url } = response.data;

          updateUserData({
            ...userData,
            createdTika: secure_url,
          });
          next();
        } catch (error) {
          console.error("Upload to Cloudinary failed:", error);
        }
      }, "image/png", 1.0);
    }
  };

  const handleComplete = async () => {
    await saveCreatedTika();
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
      textInputRef.current.focus();
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

  // Preload selected element image for better rendering
  useEffect(() => {
    if (selectedOptions.Elements) {
      const img = new Image();
      img.src = selectedOptions.Elements;
      img.onload = () => {
        if (elementRef.current) {
          // Force a redraw when image is loaded
          const element = elementRef.current;
          element.style.display = 'none';
          setTimeout(() => {
            element.style.display = 'block';
          }, 0);
        }
      };
    }
  }, [selectedOptions.Elements]);

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
            handleInfo={() => setOverlay(true)}
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
                      onClick={() => setOverlay(false)}
                  />
                </div>
                <p className="mt-2 text-xs">
                  Use backgrounds, borders, characters and more to design your unique tika.
                  {selectedOptions.Elements && " Pinch to zoom or use mouse wheel to resize elements."}
                </p>
              </div>
            </div>
        )}
        <div className={`h-full pt-16 px-4 flex flex-col justify-between items-center bg-[#FFF8E7] font-manrope`}>
          <div
              id="ticket-container"
              ref={ticketContainerRef}
              className="w-60 h-80 mb-16 relative touch-manipulation"
              style={{
                backgroundImage: selectedOptions.Background
                    ? `url(${selectedOptions.Background})`
                    : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                border:
                    selectedOptions.Background ||
                    selectedOptions.Border ||
                    selectedOptions.Elements
                        ? ""
                        : "1px solid black",
              }}
          >
            {selectedOptions.Elements && (
                <Rnd
                    ref={rndRef}
                    bounds="parent"
                    size={elementSize}
                    position={elementPos}
                    onDragStart={() => setIsDragging(true)}
                    onDragStop={(e, d) => {
                      setElementPos({x: d.x, y: d.y});
                      setIsDragging(false);
                    }}
                    onResizeStart={() => setIsResizing(true)}
                    onResizeStop={(e, direction, ref, delta, position) => {
                      setElementSize({
                        width: parseInt(ref.style.width),
                        height: parseInt(ref.style.height),
                      });
                      setElementPos(position);
                      setIsResizing(false);
                    }}
                    className="absolute"
                    style={{
                      zIndex: 99,
                      width: `${elementSize.width}px`,
                      height: `${elementSize.height}px`,
                    }}
                    enableUserSelectHack={false}
                    disableDragging={false}
                >
                  <div
                      ref={elementRef}
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        pointerEvents: "none"
                      }}
                  >
                    <img
                        src={selectedOptions.Elements}
                        alt="Selected Element"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          width: "auto",
                          height: "auto",
                          objectFit: "contain",
                          display: "block",
                          imageRendering: "-webkit-optimize-contrast",
                          pointerEvents: "none"
                        }}
                        crossOrigin="anonymous"
                    />
                  </div>
                </Rnd>
            )}

            {selectedOptions.Border && (
                <img
                    src={selectedOptions.Border}
                    alt="Selected Border"
                    className="w-full h-full object-cover absolute top-0 left-0 z-20"
                    crossOrigin="anonymous"
                />
            )}

            {showTextInput && (
                <input
                    ref={textInputRef}
                    type="text"
                    value={customText}
                    maxLength={16}
                    style={{ fontSize: '10px' }}
                    onChange={(e) => setCustomText(e.target.value)}
                    className="font-semibold outline-none text-center uppercase absolute top-1 z-40 w-full bg-transparent placeholder:text-black m-0 p-0"
                    autoFocus
                />
            )}

            <p
                ref={selectedTextRef}
                className="text-[10px] font-semibold absolute z-40 flex justify-center w-full m-0 p-0"
                style={{bottom: selectedOptions.Border?.includes("border-5") ? "4px" : "7px"}}
            >
              {selectedOptions.Text}
            </p>
          </div>

          <div className="px-4 w-full absolute bottom-14">
            <div className="w-full flex gap-3 flex-row justify-between items-center overflow-x-auto">
              {menu
                  .find((menuItem) => menuItem.menu === selectedMenu)
                  .options.map((option, index) =>
                      selectedMenu === "Text" ? (
                          <p
                              key={index}
                              onClick={() =>
                                  setSelectedOptions({ ...selectedOptions, [selectedMenu]: option })
                              }
                              className={`flex-shrink-0 ${
                                  selectedOptions[selectedMenu] === option ? "font-semibold" : ""
                              }`}
                          >
                            {option}
                          </p>
                      ) : (
                          <div key={index} className="relative flex-shrink-0 w-20">
                            {selectedOptions[selectedMenu] === option && (
                                <img
                                    src="/icons/selected.svg"
                                    alt=""
                                    className="w-10 h-10 absolute translate-x-1/2 translate-y-1/2"
                                />
                            )}
                            <img
                                src={option}
                                alt=""
                                className="w-20 h-[100px] object-contain"
                                onClick={() =>
                                    setSelectedOptions({ ...selectedOptions, [selectedMenu]: option })
                                }
                            />
                          </div>
                      )
                  )}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              {menu.map((item, index) => (
                  <div
                      key={index}
                      onClick={() => setSelectedMenu(item.menu)}
                      className={`border border-black rounded flex justify-center gap-2 py-[11px] w-full font-semibold ${
                          item.menu === selectedMenu
                              ? "bg-black text-white"
                              : "bg-transparent text-black"
                      }`}
                  >
                    <img
                        src={item.menu === selectedMenu ? item.iconWhite : item.iconBlack}
                        alt=""
                        className="w-6"
                    />
                    {item.menu}
                  </div>
              ))}
            </div>
          </div>
        </div>
      </>
  );
};

export default OwnTikkaStep3;