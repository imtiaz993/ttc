import React, { useEffect, useRef, useState } from "react";
import Menu from "../../components/menu";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { nextStep } from "../../../../redux/slices/navigationSlice";
import successAnimation from "../../../animation/Correct Case.json";
import failureAnimation from "../../../animation/IR Try again.json";
import verifyingAnimation from "../../../animation/Image Recognition Checker.json";
import scanningAnimation from "../../../animation/Image Scan.json";
import dynamic from "next/dynamic";
import {
  resetStepperProps,
  setStepperProps,
} from "../../../../redux/slices/progressSlice";
import SwipeOverlay from "../../components/swipeOverlay";
import { openOverlay } from "../../../../redux/slices/userSlice";
import { useInactivity } from "../../../../hooks/useInactivity";

const Animation = dynamic(() => import("../../components/animation"), {
  ssr: false,
});

const SpotTikkaStep2 = ({
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}) => {
  const userData = useSelector((state: any) => state.user.userData);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const next = () => dispatch(nextStep());
  const [verificationStatus, setVerificationStatus] = useState("initial");
  const [attempts, setAttempts] = useState(0);

  const handleCameraClick = (e) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  async function convertImageUrlToFile(imageUrl, filename) {
    const response = await fetch(imageUrl);

    const contentType = response.headers.get("Content-Type");
    console.log("Fetched content-type:", contentType); // Debug

    if (!response.ok || !contentType?.startsWith("image/")) {
      console.error("Image fetch failed or not an image");
      return null;
    }

    const blob = await response.blob();
    console.log(blob, "blob data");
    const mimeType = blob.type || "image/png";
    return new File([blob], filename, { type: mimeType });
  }
  async function fetchLocalImage() {
    const response = await fetch("/images/spot-tikka.png");
    return await response.blob();
  }

  const handleSkip = () => {
    next();
  };

  useEffect(() => {
    dispatch(
      setStepperProps({
        showNext:
          verificationStatus === "initial" || verificationStatus === "success",
        showContinue: verificationStatus === "success",
        showPrev: verificationStatus === "initial",
        showCamera: verificationStatus === "initial",
        onCameraClick: handleCameraClick,
        reduceProgress: verificationStatus == "initial" ? 8 : 0,
      })
    );
    return () => {
      dispatch(resetStepperProps()); // This resets to initialState
    };
  }, [verificationStatus]);

  const [overlay, setOverlay] = useState(false);
  const displayOverlay = () => dispatch(openOverlay());
  useInactivity({
    time: 8000,
    onInactivity: () => {
      setOverlay(true);
      displayOverlay();
    },
    condition: () => {
      return !overlay && verificationStatus === "success";
    },
  });

  const renderVerificationStatus = () => {
    switch (verificationStatus) {
      case "verifying":
        return (
          <div className="h-full pt-16 px-4 flex flex-col justify-center pb-24 items-center bg-[#FFF8E7] font-manrope">
            <div className="w-full">
              <div className="mt-10 mb-6 flex flex-col items-center">
                <Animation
                  animation={verifyingAnimation}
                  height={154}
                  width={154}
                />
                <p className="font-medium text-sm mt-7">
                  Verifying your picture...
                </p>
              </div>
            </div>
          </div>
        );
      case "success":
        return (
          <div className="h-full pt-16 px-4 flex flex-col justify-center pb-24 items-center bg-[#FFF8E7] font-manrope">
            <div className="w-full">
              <div className="flex flex-col items-center">
                <Animation
                  animation={successAnimation}
                  height={154}
                  width={154}
                />
                <p className="font-medium text-sm mt-7">Great job!</p>
                <p className="text-center text-sm mt-2">
                  You got it right in the first go
                </p>
              </div>
            </div>
          </div>
        );
      case "failure":
        return (
          <div className="h-full pt-16 px-4 flex flex-col justify-center pb-16 items-center bg-[#FFF8E7] font-manrope">
            <div className="flex flex-col items-center">
              <Animation animation={failureAnimation} height={81} width={81} />
              <p className="font-medium text-sm mt-7">Oops! Not quite.</p>
              <p className="text-center text-sm mt-2">
                How about we have another go?
              </p>
            </div>
            <div className="px-4 absolute bottom-14 w-full grid grid-cols-2 gap-4">
              <button
                onClick={handleSkip}
                className="border border-black bg-transparent rounded font-semibold flex justify-center py-3 w-full"
              >
                <img src="/icons/skip.svg" alt="" className="w-6 mr-2" />
                Skip
              </button>
              <button
                onClick={handleCameraClick}
                className="text-[#FFF8E7] font-semibold rounded flex justify-center bg-black border border-black py-3 w-full"
              >
                <img src="/icons/refresh.svg" alt="" className="w-6 mr-2" />
                Try Again
              </button>
            </div>
          </div>
        );
      default:
        return (
          <div
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={(e) => {
              if (verificationStatus === "initial")
                onMouseUp({ forward: true }, () => {
                  handleCameraClick(e);
                });
            }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={(e) => {
              if (verificationStatus === "initial")
                onTouchEnd({ forward: true }, () => {
                  handleCameraClick(e);
                });
            }}
            className="h-full pt-16 px-4 flex flex-col justify-start pb-24 items-center bg-[#FFF8E7] font-manrope"
          >
            <div className="w-full flex items-start">
              <div>
                <img
                  src={`/images/${userData.char}.png`}
                  alt=""
                  className="w-11 rounded-lg"
                />
                <p className="mt-1 text-sm font-medium text-center">You</p>
              </div>
              <p className="ml-4 font-medium text-left w-[calc(100%-44px)]">
                Wow! All of this in a time without AI?
              </p>
            </div>
            <div className="relative mt-10 mb-6" onClick={handleCameraClick}>
              <div className="relative z-20">
                <Animation
                  animation={scanningAnimation}
                  height={256}
                  width={256}
                />
              </div>
              <img
                src="/images/spot-tikka.png"
                alt=""
                className="w-[164px] absolute top-[35px] left-[46px] z-10"
              />
            </div>
            <div className="bg-[#FDD931] w-full rounded py-3 px-4">
              <div className="w-full flex items-center mb-2">
                <img src="/icons/zoom-in.svg" alt="" className="w-6" />
                <p className="ml-2 text-sm font-semibold w-[calc(100%-24px)]">
                  Spot this ticket in the exhibition
                </p>
              </div>
              <p className="mt-2 text-sm">
                Now take a picture of it to see what you discover next!
              </p>
            </div>
          </div>
        );
    }
  };

  const handleImageCapture = async (event) => {
    console.log(event.target.files[0], "event.target.files[0]");
    if (event.target.files && event.target.files[0]) {
      const file1 = event.target.files[0];

      try {
        // Set status to verifying
        setVerificationStatus("verifying");

        const formData = new FormData();
        formData.append("image1", file1);

        const localImageFile = await convertImageUrlToFile(
          "/images/graham-bombay.png",
          "graham-bombay.png"
        );
        formData.append("image2", localImageFile, "local-image.png");

        const response = await axios.post(
          "https://human-vg-speaks-uh.trycloudflare.com/api/compare-images",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("API response:", response.data);

        // Update status based on API response
        if (response.data.isMatched) {
          setVerificationStatus("success");
          // You might want to add a timeout to move to the next step on success
        } else {
          setVerificationStatus("failure");
          setAttempts(attempts + 1);
        }
      } catch (error) {
        console.error("Error processing images:", error);
        console.error(
          "Error details:",
          error.response ? error.response.data : error.message
        );
        setVerificationStatus("failure");
        setAttempts(attempts + 1);
      }
    }
  };

  return (
    <>
      {overlay && <SwipeOverlay setOverlay={setOverlay} />}
      <Menu />
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={fileInputRef}
        onChange={handleImageCapture}
        className="hidden"
      />
      {renderVerificationStatus()}
    </>
  );
};

export default SpotTikkaStep2;
