import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Menu from "../../components/menu";
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
import { openOverlay } from "../../../../redux/slices/userSlice";
import { useInactivity } from "../../../../hooks/useInactivity";
import SwipeOverlay from "../../components/swipeOverlay";

const Animation = dynamic(() => import("../../components/animation"), {
  ssr: false,
});

const ScratchStep3 = () => {
  const userData = useSelector((state: any) => state.user.userData);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const next = () => dispatch(nextStep());
  const [verificationStatus, setVerificationStatus] = useState("initial"); // "initial", "verifying", "success", "failure"
  const [attempts, setAttempts] = useState(0);

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  async function convertImageUrlToFile(imageUrl, filename) {
    const response = await fetch(imageUrl);
    const contentType = response.headers.get("Content-Type");
    if (!response.ok || !contentType?.startsWith("image/")) {
      console.error("Image fetch failed or not an image");
      return null;
    }
    const blob = await response.blob();
    console.log(blob, "blob data");
    const mimeType = blob.type || "image/png";
    return new File([blob], filename, { type: mimeType });
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
    time: 20000,
    onInactivity: () => {
      setOverlay(true);
      displayOverlay();
    },
    condition: () => {
      return !overlay && verificationStatus === "success";
    },
  });

  const handleImageCapture = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const file1 = event.target.files[0];

      try {
        // Set status to verifying
        setVerificationStatus("verifying");

        const formData = new FormData();
        formData.append("image1", file1);

        const localImageFile = await convertImageUrlToFile(
          "/images/camera-scanning-art.png",
          "camera-scanning-art.png"
        );
        formData.append("image2", localImageFile, "local-image.jpg");

        const response = await axios.post(
          "https://tikka-backend.nvmsoft.fi/api/compare-images",
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

  const renderVerificationStatus = () => {
    switch (verificationStatus) {
      case "verifying":
        return (
          <div
            id="screen-5"
            className="h-full pt-16 pb-28 px-4 flex flex-col justify-center items-center bg-[#FFF8E7] font-manrope"
          >
            <div className="mt-10 mb-6 flex flex-col justify-center items-center">
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
        );
      case "success":
        return (
          <div
            id="screen-6"
            className="h-full pt-16 pb-28 px-4 flex flex-col justify-center items-center bg-[#FFF8E7] font-manrope"
          >
            <div className="mt-10 mb-6 flex flex-col items-center">
              <Animation
                animation={successAnimation}
                height={137}
                width={137}
              />
              <p className="font-medium text-sm mt-7">Great job!</p>
              <p className="text-center text-sm mt-2">
                You got it right in the first go
              </p>
            </div>
          </div>
        );
      case "failure":
        return (
          <div
            id="screen-7"
            className="h-full pt-16 pb-24 px-4 flex flex-col justify-center items-center bg-[#FFF8E7] font-manrope"
          >
            <div className="mt-10 mb-6 flex flex-col items-center w-[250px]">
              <Animation animation={failureAnimation} height={81} width={81} />
              <p className="font-medium mt-7">Oops! Not quite.</p>
              <p className="text-center text-sm mt-2">
                Have another go before these big cats disappear into the wild!
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
            id="screen-4"
            className="h-full pt-16 px-4 flex flex-col justify-start items-center bg-[#FFF8E7] font-manrope"
          >
            <div className="w-full flex items-start mb-4">
              <div>
                <img
                  src={`/images/${userData.char}.png`}
                  height={0}
                  width={0}
                  alt=""
                  className="w-11 rounded-lg"
                />
                <p className="mt-1 text-sm font-medium text-center">You</p>
              </div>
              <p className="ml-4 font-medium w-[calc(100%-44px)]">
                Here in the 21st century, a smartphone can help solve the
                mystery! You
              </p>
            </div>
            <div
              className="mt-4 xs:mt-10 mb-4 xs:mb-6 relative scale-90 xs:scale-100"
              onClick={handleCameraClick}
            >
              <div className="relative z-20">
                <Animation
                  animation={scanningAnimation}
                  height={256}
                  width={256}
                />
              </div>
              <img
                src="/images/camera-scanning-art.png"
                sizes="100vw"
                height={0}
                width={0}
                alt=""
                className="w-28 absolute top-[52px] left-[70px] z-10"
              />
            </div>
            <div className="bg-[#FDD931] rounded py-3 px-4">
              <div className="w-full flex items-start mb-2">
                <img
                  src="/icons/zoom-in.svg"
                  height={0}
                  width={0}
                  alt=""
                  className="w-6"
                />
                <p className="ml-2 text-sm font-semibold w-[calc(100%-24px)]">
                  Find a colourful ticket of a lion and lioness inside a glass
                  case.
                </p>
              </div>
              <p className="mt-2 text-sm">
                Take a picture of it to see what you discover next!
              </p>
            </div>
          </div>
        );
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

export default ScratchStep3;
