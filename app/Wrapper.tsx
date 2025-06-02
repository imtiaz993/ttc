"use client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import PreloadImages from "./preloadImages";
import { useEffect, useState } from "react";

const Wrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true); // Preloader state

  useEffect(() => {
    const loadContent = async () => {
      try {
        // Load critical assets
        const assets = [
          "/videos/welcome-video.mp4",
          "/icons/logo.svg",
          "/images/welcome-divider.png",
          "/images/map-logo.png",
          "/icons/swipe-arrow.svg",
          "/icons/swipe-arrow-forward.svg",
          "/images/overlay-yellow.png",
          "/icons/arrow-forward.svg",
          "/images/loading.gif",
        ];

        await Promise.all(
          assets.map(
            (src) =>
              new Promise((resolve) => {
                if (src.endsWith(".mp4")) {
                  const video = document.createElement("video");
                  video.src = src;
                  // Ensure video is preloaded
                  video.preload = "auto";
                  // iOS may require muted for autoplay
                  video.muted = true;
                  video.onloadeddata = () => {
                    console.log(`Loaded video: ${src}`);
                    resolve(true);
                  };
                  video.onerror = (err) => {
                    console.error(`Error loading video ${src}:`, err);
                    resolve(true); // Resolve even on error
                  };
                  // Start loading
                  video.load();
                } else {
                  const img = new Image();
                  img.src = src;
                  img.onload = () => {
                    console.log(`Loaded image: ${src}`);
                    resolve(true);
                  };
                  img.onerror = (err) => {
                    console.error(`Error loading image ${src}:`, err);
                    resolve(true); // Resolve even on error
                  };
                }
              })
          )
        );

        // Check document.readyState
        if (document.readyState === "complete") {
          console.log("Document already complete");
          setIsLoading(false);
        } else {
          window.onload = () => {
            console.log("window.onload triggered");
            setIsLoading(false);
          };
        }
      } catch (error) {
        console.error("Error loading assets:", error);
        setIsLoading(false); // Hide preloader on error
      }
    };

    loadContent();

    // Fallback timeout to hide preloader after 10 seconds
    const timeout = setTimeout(() => {
      console.log("Fallback timeout triggered");
      setIsLoading(false);
    }, 10000);

    // Cleanup timeout on unmount
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="h-dvh overflow-hidden max-w-md max-h-[1000px] mx-auto">
      {/* Preloader with GIF */}
      {isLoading && (
        <div
          className="fixed inset-0 bg-white flex items-center justify-center z-50"
          style={{
            opacity: isLoading ? 1 : 0,
            transition: "opacity 0.5s ease-out",
            pointerEvents: isLoading ? "auto" : "none",
          }}
        >
          <img
            src="/images/preloader.gif"
            alt="Loading"
            className="w-32 h-32"
          />
        </div>
      )}
      <div
        className="h-dvh"
        style={{ pointerEvents: isLoading ? "none" : "auto" }}
      >
        <Provider store={store}>{children}</Provider>
      </div>
      <PreloadImages />
    </div>
  );
};

export default Wrapper;
