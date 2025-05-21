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
  const dispatch = useDispatch();
  const updateUserData = (data) => dispatch(setUserData(data));
  const [showTextInput, setShowTextInput] = useState(false);
  const [customText, setCustomText] = useState("");
  const [elementPos, setElementPos] = useState({ x: 60, y: 60 });
  const [elementSize, setElementSize] = useState({ width: 96, height: 96 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    Background: "",
    Border: "",
    Elements: "",
    Text: "",
  });

  // References for touch zooming
  const touchStartRef = useRef(null);
  const initialSizeRef = useRef(null);
  const zoomingRef = useRef(false);
  const aspectRatioRef = useRef(1);
  const activeTouchesRef = useRef(0);
  const lastElementSize = useRef({ width: 96, height: 96 });

  const next = () => dispatch(nextStep());
  const textInputRef = useRef(null);
  const elementRef = useRef(null);
  const ticketContainerRef = useRef(null);
  const customTextRef = useRef(null);
  const selectedTextRef = useRef(null);
  const rndRef = useRef(null);

  // Independent zoom handler - completely separated from React state for performance
  useEffect(() => {
    const element = ticketContainerRef.current;
    if (!element || !selectedOptions.Elements) return;

    // Store original element touch action
    const originalTouchAction = element.style.touchAction;

    // Disable browser interactions during touch
    const disableDefaultBehavior = (e) => {
      if (e.touches && e.touches.length >= 2) {
        e.preventDefault();
      }
    };

    // Handle touch start
    const handleTouchStart = (e) => {
      if (e.touches.length === 2) {
        // Stop events from propagating to Rnd component
        e.stopPropagation();
        e.preventDefault();

        // Mark that we're zooming
        zoomingRef.current = true;
        activeTouchesRef.current = 2;

        // Store current element size
        initialSizeRef.current = {
          width: lastElementSize.current.width,
          height: lastElementSize.current.height
        };

        // Calculate initial distance between fingers
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        touchStartRef.current = Math.sqrt(dx * dx + dy * dy);

        // Calculate and store aspect ratio
        aspectRatioRef.current = initialSizeRef.current.width / initialSizeRef.current.height;

        // Apply touch-none style to prevent other gestures
        if (rndRef.current && rndRef.current.resizableElement && rndRef.current.resizableElement.current) {
          rndRef.current.resizableElement.current.style.touchAction = 'none';
        }
        element.style.touchAction = 'none';
      }
    };

    // Handle touch movement - the core of zoom functionality
    const handleTouchMove = (e) => {
      if (e.touches.length === 2 && zoomingRef.current && touchStartRef.current && initialSizeRef.current) {
        // Stop propagation and prevent default
        e.stopPropagation();
        e.preventDefault();

        // Calculate current distance between fingers
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        const currentDistance = Math.sqrt(dx * dx + dy * dy);

        // Calculate zoom ratio
        const scale = currentDistance / touchStartRef.current;

        // Apply size with constraints while preserving aspect ratio
        const targetWidth = Math.max(40, Math.min(240, initialSizeRef.current.width * scale));
        const targetHeight = targetWidth / aspectRatioRef.current;

        // Update element size directly on the DOM for immediate feedback
        if (rndRef.current && rndRef.current.resizableElement && rndRef.current.resizableElement.current) {
          const element = rndRef.current.resizableElement.current;

          element.style.width = `${targetWidth}px`;
          element.style.height = `${targetHeight}px`;

          // Store the current size for next zoom operation
          lastElementSize.current = {
            width: targetWidth,
            height: targetHeight
          };
        }
      }
    };

    // Handle touch end
    const handleTouchEnd = (e) => {
      if (zoomingRef.current) {
        // Decrement active touches count
        activeTouchesRef.current = Math.max(0, activeTouchesRef.current - 1);

        // If no more touches or only one touch left, finalize zoom
        if (activeTouchesRef.current < 2) {
          // Only update React state once at the end of the zoom operation
          setElementSize({
            width: Math.round(lastElementSize.current.width),
            height: Math.round(lastElementSize.current.height)
          });

          // Reset zoom state
          zoomingRef.current = false;
          touchStartRef.current = null;
          initialSizeRef.current = null;

          // Restore original touch behavior
          if (rndRef.current && rndRef.current.resizableElement && rndRef.current.resizableElement.current) {
            rndRef.current.resizableElement.current.style.touchAction = '';
          }
          element.style.touchAction = originalTouchAction;
        }
      }
    };

    // Handle touch cancel (same as touch end)
    const handleTouchCancel = handleTouchEnd;

    // Mouse wheel handler for desktop zoom
    const handleWheel = (e) => {
      if (selectedOptions.Elements && !isDragging && !isResizing && !zoomingRef.current) {
        e.preventDefault();
        e.stopPropagation();

        // Get current size and calculate aspect ratio
        const currentWidth = elementSize.width;
        const currentHeight = elementSize.height;
        const aspectRatio = currentWidth / currentHeight;

        // Calculate zoom factor
        const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;

        // Apply zoom with constraints
        const newWidth = Math.max(40, Math.min(240, currentWidth * zoomFactor));
        const newHeight = newWidth / aspectRatio;

        // Update element size
        setElementSize({
          width: Math.round(newWidth),
          height: Math.round(newHeight)
        });

        // Update last known size
        lastElementSize.current = {
          width: newWidth,
          height: newHeight
        };
      }
    };

    // Add event listeners with capture to ensure they fire first
    element.addEventListener("touchstart", handleTouchStart, { passive: false, capture: true });
    element.addEventListener("touchmove", handleTouchMove, { passive: false, capture: true });
    element.addEventListener("touchend", handleTouchEnd, { capture: true });
    element.addEventListener("touchcancel", handleTouchCancel, { capture: true });
    element.addEventListener("wheel", handleWheel, { passive: false });

    // Prevent default touch behavior on the document during our operations
    document.addEventListener("touchmove", disableDefaultBehavior, { passive: false });

    return () => {
      element.removeEventListener("touchstart", handleTouchStart, { capture: true });
      element.removeEventListener("touchmove", handleTouchMove, { capture: true });
      element.removeEventListener("touchend", handleTouchEnd, { capture: true });
      element.removeEventListener("touchcancel", handleTouchCancel, { capture: true });
      element.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchmove", disableDefaultBehavior);
    };
  }, [selectedOptions.Elements, elementSize, isDragging, isResizing]);

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

                      // Update last known size for zooming reference
                      lastElementSize.current = {
                        width: parseInt(ref.style.width),
                        height: parseInt(ref.style.height),
                      };
                    }}
                    className="absolute"
                    style={{
                      zIndex: 99,
                      touchAction: "none", // Always disable browser touch actions on the element
                    }}
                    enableUserSelectHack={false}
                    disableDragging={zoomingRef.current} // Disable dragging during zoom operations
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
                ref={customTextRef}
                className="text-[10px] font-semibold text-center uppercase absolute top-1 z-40 w-full m-0 p-0"
            >
              {customText}
            </p>

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