import React, { useEffect, useRef, useState } from "react";
import Menu from "../../components/menu";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { nextStep } from "../../../../redux/slices/navigationSlice";
import successAnimation from "../../../animation/Correct Case.json";
import failureAnimation from "../../../animation/IR Try again.json";
import verifyingAnimation from "../../../animation/Image Recognition Checker.json";
import dynamic from "next/dynamic";
import { resetStepperProps, setStepperProps } from "../../../../redux/slices/progressSlice";

const Animation = dynamic(() => import("../../components/animation"), {
  ssr: false,
});

const SpotTikkaStep2 = () => {
  const userData = useSelector((state: any) => state.user.userData);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const next = () => dispatch(nextStep());
  const [verificationStatus, setVerificationStatus] = useState("initial");
  const [attempts, setAttempts] = useState(0);

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

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
        showNext: verificationStatus === "initial",
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
                <p className="font-medium mt-7">Verifying your picture...</p>
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
                <p className="font-medium mt-7">Great job!</p>
                <p className="text-center mt-2">
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
              <p className="font-medium mt-7">Oops! Not quite.</p>
              <p className="text-center mt-2">How about we have another go?</p>
            </div>
            <div className="w-full grid grid-cols-2 gap-4 mt-auto">
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
          <div className="h-full pt-16 px-4 flex flex-col justify-between pb-24 items-center bg-[#FFF8E7] font-manrope">
            <div className="w-full">
              <div className="w-full flex items-start mb-6">
                <div>
                  <img
                    src={`/images/${userData.char}.png`}
                    alt=""
                    className="w-11 rounded-lg"
                  />
                  <p className="mt-1 text-xs font-medium text-center">You</p>
                </div>
                <p className="ml-4 font-medium text-left w-[calc(100%-44px)]">
                  &lt;text copy&gt;
                </p>
              </div>

              <div className="bg-[#FDD931] w-full rounded py-3 px-4">
                <div className="w-full flex items-center mb-2">
                  <img src="/icons/zoom-in.svg" alt="" className="w-6" />
                  <p className="ml-2 text-xs font-semibold w-[calc(100%-24px)]">
                    Spot this tika in the gallery
                  </p>
                </div>
                <p className="mt-2 text-xs">
                  Now take a picture of it to see what you discover next!
                </p>
              </div>
              <div className="flex justify-center items-center">
                <img
                  src="/images/spot-tikka.png"
                  alt=""
                  className="w-52 mt-20"
                />
              </div>
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

        const localImageFile = await fetchLocalImage();
        formData.append("image2", localImageFile, "local-image.jpg");

        const response = await axios.post(
          "https://ttc-master-be.onrender.com/api/compare-images",
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
          setTimeout(() => {
            next();
          }, 3000);
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
