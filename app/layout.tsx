"use client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import PreloadImages from "./preloadImages";
import "./globals.css";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true); // Preloader state

  useEffect(() => {
    const loadContent = async () => {
      try {
        await Promise.all([
          ...[
            "/videos/welcome-video.mp4",
            "/icons/logo.svg",
            "/images/welcome-divider.png",
            "/images/map-logo.png",
            "/icons/swipe-arrow.svg",
            "/icons/swipe-arrow-forward.svg",
            "/images/overlay-yellow.png",
            "/icons/arrow-forward.svg",
            "/images/loading.gif",
          ].map(
            (src) =>
              new Promise((resolve) => {
                if (src.endsWith(".mp4")) {
                  const video = document.createElement("video");
                  video.src = src;
                  video.onloadeddata = resolve;
                  video.onerror = resolve;
                } else {
                  const img = new Image();
                  img.src = src;
                  img.onload = resolve;
                  img.onerror = resolve;
                }
              })
          ),
          new Promise((resolve) => {
            if (document.readyState === "complete") {
              resolve(true);
            } else {
              window.onload = resolve;
            }
          }),
        ]);
        setIsLoading(false); // Hide preloader
      } catch (error) {
        console.error("Error loading assets:", error);
        setIsLoading(false); // Hide preloader on error
      }
    };

    loadContent();
  }, []);

  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0"
        />
      </head>
      <body className="min-h-dvh max-h-dvh overflow-hidden">
        <div className="sm:hidden h-dvh overflow-hidden">
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
                className="w-32 h-32" // Adjust size as needed
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
        <div className="hidden sm:flex flex-col justify-center items-center h-dvh bg-gray-100 font-manrope">
          <div className="flex flex-col items-center text-center p-6 rounded-lg shadow bg-white max-w-md">
            <svg
              className="w-16 h-16 text-blue-500 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              Mobile-Only Access
            </h1>
            <p className="text-gray-600 mb-4">
              This application is designed for mobile devices. Please open it on
              your smartphone for the best experience.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
