import { useRef, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Menu from "../../components/menu";
import GameStepper from "../../components/gameStepper";
import { nextStep } from "../../../../redux/slices/navigationSlice";
import Lottie from "react-lottie";
import successAnimation from "../../../animation/Correct Case.json";
import failureAnimation from "../../../animation/IR Try again.json";
import verifyingAnimation from "../../../animation/Image Recognition Checker.json";
import scanningAnimation from "../../../animation/Image Scan.json";

const ScratchStep2 = () => {
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

  async function fetchLocalImage() {
    const response = await fetch("/images/scratched-image.jpeg");
    return await response.blob();
  }

  const handleSkip = () => {
    next();
  };

  const handleImageCapture = async (event) => {
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

  const renderVerificationStatus = () => {
    switch (verificationStatus) {
      case "verifying":
        return (
          <div className="h-full pt-16 pb-24 px-4 flex flex-col justify-center items-center bg-[#FFF8E7] font-manrope">
            <div className="mt-10 mb-6 flex flex-col justify-center items-center">
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: verifyingAnimation,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
                height={154}
                width={154}
              />
              <p className="font-medium mt-7">Verifying your picture...</p>
            </div>
          </div>
        );
      case "success":
        return (
          <div className="h-full pt-16 pb-24 px-4 flex flex-col justify-center items-center bg-[#FFF8E7] font-manrope">
            <div className="mt-10 mb-6 flex flex-col items-center">
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: successAnimation,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
                height={137}
                width={137}
              />
              <p className="font-medium mt-7">Great job!</p>
              <p className="text-center mt-2">
                You got it right in the first go
              </p>
            </div>
          </div>
        );
      case "failure":
        return (
          <div className="h-full pt-16 pb-16 px-4 flex flex-col justify-center items-center bg-[#FFF8E7] font-manrope">
            <div className="mt-10 mb-6 flex flex-col items-center w-[250px]">
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: failureAnimation,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
                height={81}
                width={81}
              />
              <p className="font-medium mt-7">Oops! Not quite.</p>
              <p className="text-center mt-2">
                Have another go before these big cats disappear into the wild!
              </p>
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
          <div className="h-full pt-16 px-4 flex flex-col justify-start items-center bg-[#FFF8E7] font-manrope">
            <div className="w-full flex items-start mb-4">
              <div>
                <img
                  src={`/images/${userData.char}.png`}
                  height={0}
                  width={0}
                  alt=""
                  className="w-11 rounded-lg"
                />
                <p className="mt-1 text-xs font-medium text-center">You</p>
              </div>
              <p className="ml-4 font-medium w-[calc(100%-44px)]">
                I love that I have a smartphone to help me solve this ancient
                mystery!
              </p>
            </div>
            <div className="mt-10 mb-6 relative" onClick={handleCameraClick}>
              <div className="relative z-20">
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: scanningAnimation,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                    },
                  }}
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
                <p className="ml-2 text-xs font-semibold w-[calc(100%-24px)]">
                  Find this colorful image of a lion & lioness within a glass
                  case around you
                </p>
              </div>
              <p className="mt-2 text-xs">
                Now take a picture of it to see what you discover next!
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <Menu />
      <GameStepper
        showNext={verificationStatus === "initial"}
        showPrev={verificationStatus === "initial"}
        showCamera={verificationStatus === "initial"}
        onCameraClick={handleCameraClick}
        reduceProgress={verificationStatus == "initial" ? 8 : 0}
      />
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

export default ScratchStep2;
