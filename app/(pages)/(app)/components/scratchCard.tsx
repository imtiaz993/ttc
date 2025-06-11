import React, { useRef, useEffect, useState, useCallback } from "react";
import confetti from "canvas-confetti";
import scratchAnimation from "../../animation/Scratch Card.json";
import dynamic from "next/dynamic";
import dustImage from "/public/images/Frame.png";
import { useInactivity } from "../../../hooks/useInactivity";

const Animation = dynamic(() => import("./animation"), { ssr: false });

const ScratchCard = ({ isRevealed, setIsRevealed, animation }) => {
  const canvasRef = useRef(null);
  const [showAnimation, setShowAnimation] = useState(animation);
  const [selectedImage, setSelectedImage] = useState(
    "/images/scratch-card-2.png"
  );
  const [imageLoaded, setImageLoaded] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const isDrawing = useRef(false);

  useInactivity({
    time: 3000,
    onInactivity: () => {
      setShowAnimation(true);
    },
    condition: () => {
      return !isRevealed && !isDrawing.current;
    },
  });

  // Preload image and set up canvas immediately when component mounts
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.onerror = () => {
      // If image fails to load, still allow scratching
      setImageLoaded(true);
    };
    img.src = selectedImage;
  }, [selectedImage]);

  const createDustyPattern = useCallback(() => {
    if (!canvasRef.current) return null;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const patternCanvas = document.createElement("canvas");
    const patternCtx = patternCanvas.getContext("2d");
    patternCanvas.width = 50;
    patternCanvas.height = 50;

    // Load dust image
    const img = new Image();
    img.src = "/images/Frame.png";

    return new Promise((resolve) => {
      img.onload = () => {
        patternCtx.drawImage(img, 0, 0, 50, 50);
        const pattern = ctx.createPattern(patternCanvas, "repeat");
        resolve(pattern);
      };
      img.onerror = () => {
        // fallback to grey fill if image fails
        patternCtx.fillStyle = "#999";
        patternCtx.fillRect(0, 0, 50, 50);
        const fallbackPattern = ctx.createPattern(patternCanvas, "repeat");
        resolve(fallbackPattern);
      };
    });
  }, []);

  const initializeCanvas = useCallback(() => {
    if (!canvasRef.current || isRevealed) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas size immediately
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Draw the dust image once, scaled to cover the canvas
    const img = new Image();
    img.src = dustImage.src; // .src is necessary when using imported images

    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      setCanvasReady(true);
    };

    img.onerror = () => {
      // Fallback fill if image fails
      ctx.fillStyle = "#999";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      setCanvasReady(true);
    };
  }, [isRevealed]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const timer = setTimeout(() => {
      initializeCanvas();
    }, 10);

    return () => clearTimeout(timer);
  }, [initializeCanvas]);

  const handleScratch = useCallback(
    (e) => {
      if (!isDrawing.current || isRevealed || !canvasReady) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect();
      const x =
        "touches" in e
          ? e.touches[0].clientX - rect.left
          : e.clientX - rect.left;
      const y =
        "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 40, 0, Math.PI * 2);
      ctx.fill();

      // Check scratch percentage
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparent = 0;
      for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] === 0) transparent++;
      }
      const newPercentage = (transparent / (pixels.length / 4)) * 100;

      if (newPercentage > 40 && !isRevealed) {
        setIsRevealed(true);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const origin = {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        };

        confetti({
          particleCount: 100,
          spread: 70,
          origin,
          colors: ["#FFD700", "#FFA500", "#FF4500", "#FF1493", "#9400D3"],
        });

        setTimeout(() => {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { ...origin, x: origin.x - 0.2 },
          });
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { ...origin, x: origin.x + 0.2 },
          });
        }, 200);
      }
    },
    [isRevealed, canvasReady, setIsRevealed]
  );

  // Set up event listeners when canvas is ready
  useEffect(() => {
    if (!canvasRef.current || !canvasReady || isRevealed) return;

    const canvas = canvasRef.current;

    const handleMouseDown = () => {
      isDrawing.current = true;
      // Hide animation immediately when user starts interacting
      if (showAnimation) {
        setShowAnimation(false);
      }
    };

    const handleMouseUp = () => (isDrawing.current = false);
    const handleMouseLeave = () => (isDrawing.current = false);
    const handleTouchStart = (e) => {
      e.preventDefault();
      isDrawing.current = true;
      // Hide animation immediately when user starts interacting
      if (showAnimation) {
        setShowAnimation(false);
      }
    };
    const handleTouchEnd = () => (isDrawing.current = false);

    // Mouse events
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleScratch);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Touch events
    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    canvas.addEventListener("touchmove", handleScratch, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleScratch);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleScratch);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, [canvasReady, isRevealed, handleScratch, showAnimation]);

  useEffect(() => {
    setShowAnimation(animation);
  }, [animation]);

  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showAnimation]);

  return (
    <div
      id="screen-2"
      className="h-full pt-16 px-4 flex flex-col justify-start items-center"
      style={{
        backgroundImage: "url('/images/yellow-bg.png')",
        backgroundSize: "cover",
        backgroundRepeat: "round",
      }}
    >
      <div className="w-full flex justify-between items-start mb-4">
        <p className="font-playwriteDEGrund">30th March, 1886</p>
        <div>
          <img src="/images/kamla.png" alt="" className="w-11 rounded-lg" />
          <p className="mt-1 text-sm font-medium text-center font-manrope">
            Kamla
          </p>
        </div>
      </div>
      <p className="text-sm font-playwriteDEGrund font-light xs:mb-6">
        Dearest diary, 
        <br />
        Last evening we had one of Papa’s merchant friends over. He brought us
        the loveliest fabric from Calcutta! But what caught my eye was not the
        fabric, but this unusual picture stuck on it. 
        <br />
        <br />
        Can’t wait to show it to my closest friend Selma.Her family’s in the
        textile business after all!
      </p>
      <div className="scale-[0.85] xs:scale-100 flex justify-center items-center mb-32">
        <div className="relative w-52 aspect-square">
          <img
            src={selectedImage}
            alt=""
            className="w-52 object-cover"
            onLoad={() => setImageLoaded(true)}
          />
          {!isRevealed && (
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-52 h-full touch-none cursor-crosshair"
              style={{
                pointerEvents: canvasReady ? "auto" : "none",
                opacity: canvasReady ? 1 : 0.8,
              }}
            />
          )}
          {showAnimation && (
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ pointerEvents: "none" }}
            >
              <Animation
                animation={scratchAnimation}
                loop={true}
                height={137}
                width={137}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScratchCard;
