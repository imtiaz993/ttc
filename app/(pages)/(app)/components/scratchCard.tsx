import React, { useRef, useEffect, useState } from "react";
import confetti from "canvas-confetti";

const ScratchCard = () => {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    "/images/scratched-image.png"
  );
  const isDrawing = useRef(false);

  useEffect(() => {
    if (!canvasRef.current || !selectedImage || isRevealed) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const createDustyPattern = () => {
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
    };

    const init = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      if (!isRevealed) {
        ctx.fillStyle = createDustyPattern();
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    init();

    const handleScratch = (e) => {
      if (!isDrawing.current || isRevealed) return;

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

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparent = 0;
      for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] === 0) transparent++;
      }
      const newPercentage = (transparent / (pixels.length / 4)) * 100;

      if (newPercentage > 70 && !isRevealed) {
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
    };

    if (!isRevealed) {
      canvas.addEventListener("mousedown", () => (isDrawing.current = true));
      canvas.addEventListener("mousemove", handleScratch);
      canvas.addEventListener("mouseup", () => (isDrawing.current = false));
      canvas.addEventListener("mouseleave", () => (isDrawing.current = false));

      canvas.addEventListener("touchstart", () => (isDrawing.current = true));
      canvas.addEventListener("touchmove", handleScratch);
      canvas.addEventListener("touchend", () => (isDrawing.current = false));
    }

    return () => {
      canvas.removeEventListener("mousedown", () => (isDrawing.current = true));
      canvas.removeEventListener("mousemove", handleScratch);
      canvas.removeEventListener("mouseup", () => (isDrawing.current = false));
      canvas.removeEventListener(
        "mouseleave",
        () => (isDrawing.current = false)
      );

      canvas.removeEventListener(
        "touchstart",
        () => (isDrawing.current = true)
      );
      canvas.removeEventListener("touchmove", handleScratch);
      canvas.removeEventListener("touchend", () => (isDrawing.current = false));
    };
  }, [selectedImage, isRevealed]);

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
        <p>7th April, 1886</p>
        <div>
          <img src="/images/ajji.png" alt="" className="w-11 rounded-lg" />
          <p className="mt-1 text-xs font-medium text-center">Kamla</p>
        </div>
      </div>
      <p className="text-sm mb-6">
        Selma says this unusual picture is called a “Ticket”. She did however
        mention how she had heard her dad refer to them as “chaaps” or “tikas”
        too on some occasions.
        <br />
        They are meant to be advertisements just like the ones in newspapers.
        Except, these don’t sell us Coca-Cola or Pears soap! 
        <br />
        But I wonder.. how are they so colourful?
      </p>
      <div className="flex justify-center items-center mb-32">
        <div className="relative w-60 aspect-square">
          <img src={selectedImage} alt="" className="w-60 object-cover" />
          {!isRevealed && (
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-60 h-full touch-none"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ScratchCard;
