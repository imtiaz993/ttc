import React, {useRef, useEffect, useState, useCallback} from "react";
import confetti from "canvas-confetti";
import scratchAnimation from "../../animation/Scratch Card.json";
import dynamic from "next/dynamic";

const Animation = dynamic(() => import("./animation"), {ssr: false});

const ScratchCard = ({isRevealed, setIsRevealed, animation}) => {
  const canvasRef = useRef(null);
  const [showAnimation, setShowAnimation] = useState(animation);
  const [selectedImage, setSelectedImage] = useState("/images/scratch-card-2.png");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const isDrawing = useRef(false);

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

    // Dusty silver base
    patternCtx.fillStyle = "#999";
    patternCtx.fillRect(0, 0, 50, 50);

    // Add dust specks
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * 50;
      const y = Math.random() * 50;
      const radius = Math.random() * 1.5;
      patternCtx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.15})`;
      patternCtx.beginPath();
      patternCtx.arc(x, y, radius, 0, Math.PI * 2);
      patternCtx.fill();
    }

    return ctx.createPattern(patternCanvas, "repeat");
  }, []);

  const initializeCanvas = useCallback(() => {
    if (!canvasRef.current || isRevealed) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas size immediately
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Fill with scratch pattern
    const pattern = createDustyPattern();
    if (pattern) {
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    setCanvasReady(true);
  }, [isRevealed, createDustyPattern]);

  // Initialize canvas as soon as possible
  useEffect(() => {
    if (!canvasRef.current) return;

    // Small delay to ensure canvas is properly mounted
    const timer = setTimeout(() => {
      initializeCanvas();
    }, 10);

    return () => clearTimeout(timer);
  }, [initializeCanvas]);

  const handleScratch = useCallback((e) => {
    if (!isDrawing.current || isRevealed || !canvasReady) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

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
          origin: {...origin, x: origin.x - 0.2},
        });
        confetti({
          particleCount: 50,
          spread: 60,
          origin: {...origin, x: origin.x + 0.2},
        });
      }, 200);
    }
  }, [isRevealed, canvasReady, setIsRevealed]);

  // Set up event listeners when canvas is ready
  useEffect(() => {
    if (!canvasRef.current || !canvasReady || isRevealed) return;

    const canvas = canvasRef.current;

    const handleMouseDown = () => (isDrawing.current = true);
    const handleMouseUp = () => (isDrawing.current = false);
    const handleMouseLeave = () => (isDrawing.current = false);
    const handleTouchStart = (e) => {
      e.preventDefault();
      isDrawing.current = true;
    };
    const handleTouchEnd = () => (isDrawing.current = false);

    // Mouse events
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleScratch);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Touch events
    canvas.addEventListener("touchstart", handleTouchStart, {passive: false});
    canvas.addEventListener("touchmove", handleScratch, {passive: false});
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
  }, [canvasReady, isRevealed, handleScratch]);

  useEffect(() => {
    setShowAnimation(animation);
  }, [animation]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
      <div
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
            <img src="/images/kamla.png" alt="" className="w-11 rounded-lg"/>
            <p className="mt-1 text-sm font-medium text-center font-manrope">
              Kamla
            </p>
          </div>
        </div>
        <p className="text-sm mb-6 font-playwriteDEGrund font-light">
          Dearest diary,
          <br/>
          Last evening we had one of Papa's merchant friends over. He brought us
          the loveliest fabric from Calcutta! But what caught my eye was not the
          fabric, but this unusual label stuck on it.
          <br/>
          Can't wait to show it to my closest friend Selma.Her family's in the
          textile business after all!
        </p>
        <div className="flex justify-center items-center mb-32">
          <div className="relative w-60 aspect-square">
            <img
                src={selectedImage}
                alt=""
                className="w-60 object-cover"
                onLoad={() => setImageLoaded(true)}
            />
            {!isRevealed && (
                <canvas
                    ref={canvasRef}
                    className="absolute top-0 left-0 w-60 h-full touch-none cursor-crosshair"
                    style={{
                      pointerEvents: canvasReady ? 'auto' : 'none',
                      opacity: canvasReady ? 1 : 0.8
                    }}
                />
            )}
            {showAnimation && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Animation
                      animation={scratchAnimation}
                      loop={false}
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