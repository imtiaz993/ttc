import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import html2canvas from "html2canvas";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";
import { nextStep } from "../../../../redux/slices/navigationSlice";
import { setUserData } from "../../../../redux/slices/userSlice";
import { Rnd } from "react-rnd";
import axios from "axios";
import {
  resetStepperProps,
  setStepperProps,
} from "../../../../redux/slices/progressSlice";

const OwnTikkaStep3 = () => {
  const [overlay, setOverlay] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("Background");
  const userData = useSelector((state: any) => state.user.userData);
  const dispatch = useDispatch();
  const updateUserData = (data: any) => dispatch(setUserData(data));
  const [showTextInput, setShowTextInput] = useState(false);
  const [customText, setCustomText] = useState("");
  const [isFinishing, setIsFinishing] = useState(false);

  // Updated state structure for multiple elements
  const [selectedElements, setSelectedElements] = useState([]);
  const [elementInstances, setElementInstances] = useState([]);
  const [activeElementId, setActiveElementId] = useState(null);

  const [selectedOptions, setSelectedOptions] = useState({
    Background: "",
    Border: "",
    Elements: "",
    Text: "",
  });

  const touchStartRef = useRef(null);
  const initialSizeRef = useRef(null);
  const zoomingRef = useRef(false);
  const aspectRatioRef = useRef(1);
  const activeTouchesRef = useRef(0);
  const activeElementRef = useRef(null);

  const next = () => dispatch(nextStep());
  const textInputRef = useRef(null);
  const ticketContainerRef = useRef(null);
  const customTextRef = useRef(null);
  const selectedTextRef = useRef(null);

  // Generate unique ID for elements
  const generateId = () =>
    `element_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Function to enable text editing
  const enableTextEditing = () => {
    setShowTextInput(true);
  };

  // Function to finish text editing
  const finishTextEditing = () => {
    setShowTextInput(false);
  };

  // Handle input blur and Enter key
  const handleTextInputBlur = () => {
    finishTextEditing();
  };

  const handleTextInputKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Enter") {
      finishTextEditing();
    }
  };

  // Updated handleElementSelect function - now handles both select and deselect
  const handleElementSelect = (elementSrc: string): void => {
    // Check if element is already selected - if yes, deselect it
    if (selectedElements.includes(elementSrc)) {
      // Find the element instance to remove
      const elementToRemove = elementInstances.find(
        (el) => el.src === elementSrc
      );

      // Remove from selectedElements array
      setSelectedElements(selectedElements.filter((el) => el !== elementSrc));

      // Remove from elementInstances array
      setElementInstances(
        elementInstances.filter((el) => el.src !== elementSrc)
      );

      // Clear active element if it was the one being removed
      if (elementToRemove && activeElementId === elementToRemove.id) {
        setActiveElementId(null);
      }

      // Update selectedOptions.Elements to the last remaining element or empty
      const remainingElements = selectedElements.filter(
        (el) => el !== elementSrc
      );
      setSelectedOptions({
        ...selectedOptions,
        Elements:
          remainingElements.length > 0
            ? remainingElements[remainingElements.length - 1]
            : "",
      });
    }
    // If element is not selected and we haven't reached the limit, add it
    else if (selectedElements.length < 3) {
      const newElement = {
        id: generateId(),
        src: elementSrc,
        position: {
          x: 60 + selectedElements.length * 20,
          y: 60 + selectedElements.length * 20,
        },
        size: { width: 96, height: 96 },
        isDragging: false,
        isResizing: false,
      };

      setSelectedElements([...selectedElements, elementSrc]);
      setElementInstances([...elementInstances, newElement]);
      setSelectedOptions({ ...selectedOptions, Elements: elementSrc });
    }
  };

  // Alternative remove function for explicit removal
  const removeElementBySrc = (elementSrc: string): void => {
    const elementToRemove = elementInstances.find(
      (el) => el.src === elementSrc
    );

    setSelectedElements(selectedElements.filter((el) => el !== elementSrc));
    setElementInstances(elementInstances.filter((el) => el.src !== elementSrc));

    if (elementToRemove && activeElementId === elementToRemove.id) {
      setActiveElementId(null);
    }

    const remainingElements = selectedElements.filter(
      (el) => el !== elementSrc
    );
    setSelectedOptions({
      ...selectedOptions,
      Elements:
        remainingElements.length > 0
          ? remainingElements[remainingElements.length - 1]
          : "",
    });
  };

  // Remove element by ID (for elements on canvas)
  const removeElement = (elementId: string): void => {
    const elementToRemove = elementInstances.find((el) => el.id === elementId);
    setElementInstances(elementInstances.filter((el) => el.id !== elementId));
    setSelectedElements(
      selectedElements.filter((el) => el !== elementToRemove.src)
    );

    if (activeElementId === elementId) {
      setActiveElementId(null);
    }
  };

  // Update element properties
  const updateElementInstance = (elementId: string, updates: any): void => {
    setElementInstances((prev) =>
      prev.map((el) => (el.id === elementId ? { ...el, ...updates } : el))
    );
  };

  // Touch and zoom handling for active element
  useEffect(() => {
    const element = ticketContainerRef.current;
    if (!element || elementInstances.length === 0) return;

    const originalTouchAction = element.style.touchAction;

    const disableDefaultBehavior = (e: TouchEvent): void => {
      if (e.touches && e.touches.length >= 2) {
        e.preventDefault();
      }
    };

    const handleTouchStart = (e: TouchEvent): void => {
      if (e.touches.length === 2 && activeElementId) {
        e.stopPropagation();
        e.preventDefault();

        const activeElement = elementInstances.find(
          (el) => el.id === activeElementId
        );
        if (!activeElement) return;

        zoomingRef.current = true;
        activeTouchesRef.current = 2;
        activeElementRef.current = activeElement;

        initialSizeRef.current = {
          width: activeElement.size.width,
          height: activeElement.size.height,
        };

        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        touchStartRef.current = Math.sqrt(dx * dx + dy * dy);

        aspectRatioRef.current =
          initialSizeRef.current.width / initialSizeRef.current.height;
        element.style.touchAction = "none";
      }
    };

    const handleTouchMove = (e: TouchEvent): void => {
      if (
        e.touches.length === 2 &&
        zoomingRef.current &&
        touchStartRef.current &&
        initialSizeRef.current &&
        activeElementRef.current
      ) {
        e.stopPropagation();
        e.preventDefault();

        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        const currentDistance = Math.sqrt(dx * dx + dy * dy);

        const scale = currentDistance / touchStartRef.current;
        const targetWidth = Math.max(
          40,
          Math.min(240, initialSizeRef.current.width * scale)
        );
        const targetHeight = targetWidth / aspectRatioRef.current;

        updateElementInstance(activeElementRef.current.id, {
          size: { width: targetWidth, height: targetHeight },
        });
      }
    };

    const handleTouchEnd = (e: TouchEvent): void => {
      if (zoomingRef.current) {
        activeTouchesRef.current = Math.max(0, activeTouchesRef.current - 1);

        if (activeTouchesRef.current < 2) {
          zoomingRef.current = false;
          touchStartRef.current = null;
          initialSizeRef.current = null;
          activeElementRef.current = null;
          element.style.touchAction = originalTouchAction;
        }
      }
    };

    const handleWheel = (e: WheelEvent): void => {
      if (activeElementId && !zoomingRef.current) {
        const activeElement = elementInstances.find(
          (el) => el.id === activeElementId
        );
        if (!activeElement) return;

        e.preventDefault();
        e.stopPropagation();

        const currentWidth = activeElement.size.width;
        const currentHeight = activeElement.size.height;
        const aspectRatio = currentWidth / currentHeight;

        const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
        const newWidth = Math.max(40, Math.min(240, currentWidth * zoomFactor));
        const newHeight = newWidth / aspectRatio;

        updateElementInstance(activeElementId, {
          size: { width: Math.round(newWidth), height: Math.round(newHeight) },
        });
      }
    };

    element.addEventListener("touchstart", handleTouchStart, {
      passive: false,
      capture: true,
    });
    element.addEventListener("touchmove", handleTouchMove, {
      passive: false,
      capture: true,
    });
    element.addEventListener("touchend", handleTouchEnd, { capture: true });
    element.addEventListener("touchcancel", handleTouchEnd, { capture: true });
    element.addEventListener("wheel", handleWheel, { passive: false });

    document.addEventListener("touchmove", disableDefaultBehavior, {
      passive: false,
    });

    return () => {
      element.removeEventListener("touchstart", handleTouchStart, {
        capture: true,
      });
      element.removeEventListener("touchmove", handleTouchMove, {
        capture: true,
      });
      element.removeEventListener("touchend", handleTouchEnd, {
        capture: true,
      });
      element.removeEventListener("touchcancel", handleTouchEnd, {
        capture: true,
      });
      element.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchmove", disableDefaultBehavior);
    };
  }, [elementInstances, activeElementId]);

  const saveCreatedTika = async () => {
    setIsFinishing(true);
    if (typeof window === "undefined") return;

    const originalInputDisplay = textInputRef.current
      ? textInputRef.current.style.display
      : null;
    if (textInputRef.current) {
      textInputRef.current.style.display = "none";
    }

    const element = ticketContainerRef.current;
    if (!element) return;

    // Create temporary text elements
    const tempTopText = document.createElement("p");
    tempTopText.innerText = customText;
    tempTopText.style.cssText = `
      position: absolute;
      top: ${
        selectedOptions.Border.includes("border-4")
          ? "-4px"
          : selectedOptions.Border.includes("border-5")
          ? "-3px"
          : selectedOptions.Border.includes("border-6")
          ? "3px"
          : "-1px"
      };
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

    const tempBottomText = document.createElement("p");
    tempBottomText.innerText = selectedOptions.Text;
    tempBottomText.style.cssText = `
      position: absolute;
      bottom: ${
        selectedOptions.Border.includes("border-4") ||
        selectedOptions.Border.includes("border-5")
          ? "7px"
          : selectedOptions.Border.includes("border-6")
          ? "15px"
          : "10px"
      };
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
    if (customTextRef.current)
      customTextRef.current.style.visibility = "hidden";
    if (selectedTextRef.current)
      selectedTextRef.current.style.visibility = "hidden";

    element.appendChild(tempTopText);
    element.appendChild(tempBottomText);

    // Wait for images to load
    await Promise.all(
      Array.from(document.images)
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise((resolve) => {
              img.onload = img.onerror = resolve;
            })
        )
    );

    // Handle multiple elements for high-res capture
    if (elementInstances.length > 0) {
      const originalRndContainers = document.querySelectorAll(".Rnd");
      const tempHighResElements = [];

      // Hide original Rnd containers and create high-res replacements
      originalRndContainers.forEach((container: any, index) => {
        const originalDisplay = container.style.display;
        container.style.display = "none";
        container.setAttribute("data-original-display", originalDisplay);

        if (elementInstances[index]) {
          const elementInstance = elementInstances[index];
          const highResElement = document.createElement("img");
          highResElement.src = elementInstance.src;
          highResElement.style.position = "absolute";
          highResElement.style.left = `${elementInstance.position.x}px`;
          highResElement.style.top = `${elementInstance.position.y}px`;
          highResElement.style.width = `${elementInstance.size.width}px`;
          highResElement.style.height = `${elementInstance.size.height}px`;
          highResElement.style.objectFit = "contain";
          highResElement.style.zIndex = "99";

          element.appendChild(highResElement);
          tempHighResElements.push(highResElement);
        }
      });

      const canvas = await html2canvas(element, {
        scale: 5,
        useCORS: true,
        backgroundColor: null,
        scrollX: 0,
        scrollY: -window.scrollY,
        logging: false,
        imageTimeout: 0,
        allowTaint: true,
        removeContainer: false,
      });

      // Cleanup: remove temp elements and restore original containers
      tempHighResElements.forEach((el) => element.removeChild(el));
      element.removeChild(tempTopText);
      element.removeChild(tempBottomText);

      originalRndContainers.forEach((container: any) => {
        const originalDisplay =
          container.getAttribute("data-original-display") || "";
        container.style.display = originalDisplay;
        container.removeAttribute("data-original-display");
      });

      // Restore visibility
      if (customTextRef.current)
        customTextRef.current.style.visibility = "visible";
      if (selectedTextRef.current)
        selectedTextRef.current.style.visibility = "visible";
      if (textInputRef.current)
        textInputRef.current.style.display = originalInputDisplay;

      canvas.toBlob(
        async (blob) => {
          if (!blob) return;

          const formData = new FormData();
          formData.append("file", blob, "ticket.png");
          formData.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
          );

          try {
            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
            const response = await axios.post(
              `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
              formData
            );

            const { secure_url } = response.data;
            if (response.data) {
              setIsFinishing(false);
            }

            updateUserData({
              ...userData,
              createdTika: secure_url,
            });
            next();
          } catch (error) {
            setIsFinishing(false);
            console.error("Upload to Cloudinary failed:", error);
          }
        },
        "image/png",
        1.0
      );
    } else {
      // Handle case with no elements (same as original)
      const canvas = await html2canvas(element, {
        scale: 5,
        useCORS: true,
        backgroundColor: null,
        scrollX: 0,
        scrollY: -window.scrollY,
        logging: false,
        imageTimeout: 0,
        allowTaint: true,
      });

      element.removeChild(tempTopText);
      element.removeChild(tempBottomText);

      if (customTextRef.current)
        customTextRef.current.style.visibility = "visible";
      if (selectedTextRef.current)
        selectedTextRef.current.style.visibility = "visible";
      if (textInputRef.current)
        textInputRef.current.style.display = originalInputDisplay;

      canvas.toBlob(
        async (blob) => {
          if (!blob) return;

          const formData = new FormData();
          formData.append("file", blob, "ticket.png");
          formData.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
          );

          try {
            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
            const response = await axios.post(
              `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
              formData
            );

            const { secure_url } = response.data;
            if (response.data) {
              setIsFinishing(false);
            }

            updateUserData({
              ...userData,
              createdTika: secure_url,
            });
            next();
          } catch (error) {
            setIsFinishing(false);
            console.error("Upload to Cloudinary failed:", error);
          }
        },
        "image/png",
        1.0
      );
    }
  };

  const handleComplete = async () => {
    await saveCreatedTika();
  };

  useEffect(() => {
    dispatch(
      setStepperProps({
        showPrev: false,
        showNext: false,
      })
    );
    return () => {
      dispatch(resetStepperProps());
    };
  }, []);

  // Updated effect to show text input initially when all conditions are met
  useEffect(() => {
    if (
      selectedOptions.Background &&
      selectedOptions.Border &&
      selectedElements.length > 0 &&
      selectedOptions.Text &&
      customText === "" // Only show initially if no custom text yet
    ) {
      setShowTextInput(true);
    }
  }, [selectedOptions, selectedElements, customText]);

  // Focus input when it becomes visible
  useEffect(() => {
    if (showTextInput && textInputRef.current) {
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

  return (
    <>
      <Menu
        showInfo={true}
        showFinish={Boolean(
          selectedOptions.Background &&
            selectedOptions.Border &&
            selectedElements.length > 0 &&
            selectedOptions.Text
        )}
        handleFinish={handleComplete}
        handleInfo={() => setOverlay(true)}
        isFinishing={isFinishing}
      />
      {overlay && (
        <div>
          <div className="fixed inset-0 bg-[#00000040] z-50"></div>
          <div className="flex flex-col gap-2 fixed z-[99] h-fit w-11/12 inset-0 rounded py-3 px-4 bg-[#FDD931] mx-auto left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-manrope">
            <div className="w-full flex justify-between items-start">
              <img src="/icons/mouse.svg" alt="" className="w-6" />
              <p className="ml-2 text-sm font-semibold w-[calc(100%-24px)]">
                Create your own Ticket. . .
              </p>
              <img
                src="/icons/close-black.svg"
                alt=""
                className="w-6"
                onClick={() => setOverlay(false)}
              />
            </div>

            <p className="text-sm">and leave a Chaap on the world!</p>
            <p className="text-sm font-semibold flex items-center gap-2">
              <img src="/icons/background-black.svg" alt="" />
              Select a background
            </p>
            <p className="text-sm font-semibold flex items-center gap-2">
              <img src="/icons/border-black.svg" alt="" />
              Pick a border of your choice
            </p>
            <p className="text-sm font-semibold flex items-center gap-2">
              <img src="/icons/bulb-black.svg" alt="" />
              Choose upto three elements. Pinch to re-size , drag to position
              elementse
            </p>
            <p className="text-sm font-semibold flex items-center gap-2">
              <img src="/icons/text-black.svg" alt="" />
              Select where you made this ticket and invent your company name !
            </p>
          </div>
        </div>
      )}
      <div
        id="screen-28" 
        className={`h-full pt-10 xs:pt-16 px-4 flex flex-col justify-between items-center bg-[#FFF8E7] font-manrope `}
      >
        <div
          id="ticket-container"
          ref={ticketContainerRef}
          className="w-60 h-80 mb-16 relative overflow-hidden touch-manipulation scale-[0.85] xs:scale-90"
          style={{
            backgroundImage: selectedOptions.Background
              ? `url(${selectedOptions.Background})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            border:
              selectedOptions.Background ||
              selectedOptions.Border ||
              selectedElements.length > 0
                ? "2px solid black"
                : "1px solid black",
          }}
        >
          {/* Render all element instances */}
          {elementInstances.map((elementInstance) => (
            <Rnd
              key={elementInstance.id}
              bounds="parent"
              size={elementInstance.size}
              position={elementInstance.position}
              onDragStart={() => {
                updateElementInstance(elementInstance.id, { isDragging: true });
                setActiveElementId(elementInstance.id);
              }}
              onDragStop={(e, d) => {
                updateElementInstance(elementInstance.id, {
                  position: { x: d.x, y: d.y },
                  isDragging: false,
                });
              }}
              onResizeStart={() => {
                updateElementInstance(elementInstance.id, { isResizing: true });
                setActiveElementId(elementInstance.id);
              }}
              onResizeStop={(e, direction, ref, delta, position) => {
                updateElementInstance(elementInstance.id, {
                  size: {
                    width: parseInt(ref.style.width),
                    height: parseInt(ref.style.height),
                  },
                  position: position,
                  isResizing: false,
                });
              }}
              className="absolute"
              style={{
                zIndex: activeElementId === elementInstance.id ? 100 : 99,
                touchAction: "none",
              }}
              enableUserSelectHack={false}
              disableDragging={zoomingRef.current}
              onClick={() => setActiveElementId(elementInstance.id)}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",
                  position: "relative",
                }}
              >
                <img
                  src={elementInstance.src}
                  alt="Selected Element"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    display: "block",
                    imageRendering: "-webkit-optimize-contrast",
                    pointerEvents: "none",
                  }}
                  crossOrigin="anonymous"
                />
              </div>
            </Rnd>
          ))}

          {selectedOptions.Border && (
            <img
              src={selectedOptions.Border}
              alt="Selected Border"
              className="w-full h-full absolute top-0 left-0 z-20"
              crossOrigin="anonymous"
            />
          )}

          {/* Input field for editing custom text */}
          {showTextInput && (
            <input
              ref={textInputRef}
              type="text"
              value={customText}
              maxLength={16}
              style={{
                fontSize: "10px",
                top: selectedOptions.Border.includes("border-4")
                  ? "2px"
                  : selectedOptions.Border.includes("border-5")
                  ? "3px"
                  : selectedOptions.Border.includes("border-6")
                  ? "9px"
                  : "4px",
              }}
              onChange={(e) => setCustomText(e.target.value)}
              onBlur={handleTextInputBlur}
              onKeyPress={handleTextInputKeyPress}
              className="font-semibold outline-none text-center uppercase absolute z-40 w-full bg-transparent placeholder:text-black m-0 p-0"
              placeholder="Enter your text"
              autoFocus
            />
          )}

          {/* Display text that can be clicked to edit */}
          {!showTextInput && selectedOptions.Border && (
            <p
              ref={customTextRef}
              onClick={enableTextEditing}
              className="text-[10px] font-semibold text-center uppercase absolute z-40 w-full m-0 p-0 cursor-pointer hover:opacity-80"
              style={{
                top: selectedOptions.Border.includes("border-4")
                  ? "2px"
                  : selectedOptions.Border.includes("border-5")
                  ? "3px"
                  : selectedOptions.Border.includes("border-6")
                  ? "9px"
                  : "4px",
              }}
              title="Click to edit text"
            >
              {customText || "Click to add text"}
            </p>
          )}

          <p
            ref={selectedTextRef}
            className="text-[10px] font-semibold absolute z-40 flex justify-center w-full m-0 p-0"
            style={{
              bottom:
                selectedOptions.Border.includes("border-4") ||
                selectedOptions.Border.includes("border-5")
                  ? "2px"
                  : selectedOptions.Border.includes("border-6")
                  ? "9px"
                  : "4px",
            }}
          >
            {selectedOptions.Text}
          </p>
        </div>

        <div className="px-4 w-full absolute bottom-12 xs:bottom-14">
          <div className="w-full flex gap-3 flex-row justify-between items-center overflow-x-auto">
            {menu
              .find((menuItem) => menuItem.menu === selectedMenu)
              .options.map((option, index) =>
                selectedMenu === "Text" ? (
                  <p
                    key={index}
                    onClick={() =>
                      setSelectedOptions({
                        ...selectedOptions,
                        [selectedMenu]: option,
                      })
                    }
                    className={`flex-shrink-0 cursor-pointer ${
                      selectedOptions[selectedMenu] === option
                        ? "font-semibold"
                        : ""
                    }`}
                  >
                    {option}
                  </p>
                ) : selectedMenu === "Elements" ? (
                  <div key={index} className="relative flex-shrink-0 w-20">
                    {selectedElements.includes(option) && (
                      <>
                        {/* Selected indicator */}
                        <img
                          src="/icons/selected.svg"
                          alt=""
                          className="w-10 h-10 absolute translate-x-1/2 translate-y-1/2 z-10"
                        />
                        {/* Remove button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeElementBySrc(option);
                          }}
                          className="text-xl absolute top-3 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center font-bold z-20 transform translate-x-1/2 -translate-y-1/2 hover:bg-red-600"
                          title="Remove element"
                        >
                          ×
                        </button>
                      </>
                    )}

                    <img
                      src={option}
                      alt=""
                      className={`w-20 h-[100px] object-contain cursor-pointer ${
                        selectedElements.length >= 3 &&
                        !selectedElements.includes(option)
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={() => {
                        // Allow clicking if: we're under limit OR element is already selected (to deselect)
                        if (
                          selectedElements.length < 3 ||
                          selectedElements.includes(option)
                        ) {
                          handleElementSelect(option);
                        }
                      }}
                    />

                    {/* Max limit indicator */}
                    {selectedElements.length >= 3 &&
                      !selectedElements.includes(option) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xs font-bold rounded">
                          MAX
                        </div>
                      )}
                  </div>
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
                      className="w-20 h-[100px] object-contain cursor-pointer"
                      onClick={() =>
                        setSelectedOptions({
                          ...selectedOptions,
                          [selectedMenu]: option,
                        })
                      }
                    />
                  </div>
                )
              )}
          </div>

          <div className="mt-4 xs:mt-5 grid grid-cols-2 gap-3 xs:gap-4">
            {menu.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedMenu(item.menu)}
                className={`border border-black rounded flex justify-center gap-2 py-[11px] w-full font-semibold cursor-pointer ${
                  item.menu === selectedMenu
                    ? "bg-black text-white"
                    : "bg-transparent text-black"
                }`}
              >
                <img
                  src={
                    item.menu === selectedMenu ? item.iconWhite : item.iconBlack
                  }
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
