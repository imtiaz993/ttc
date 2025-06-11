import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Menu from "../../components/menu";
import { nextStep } from "../../../../redux/slices/navigationSlice";
import {
  resetStepperProps,
  setStepperProps,
} from "../../../../redux/slices/progressSlice";

const OwnTikkaStep4 = () => {
  const userData = useSelector((state: any) => state.user.userData);
  const dispatch = useDispatch();
  const [showShareModal, setShowShareModal] = useState(false);

  const downloadImage = async () => {
    try {
      const response = await fetch(userData.createdTika, { mode: "cors" });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "my-tika.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert(
        "Failed to download image. Try long-pressing the image to save manually."
      );
    }
  };

  const shareImage = () => {
    setShowShareModal(true);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(userData.createdTika);
      alert("Link copied to clipboard!");
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = userData.createdTika;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        alert("Link copied to clipboard!");
      } catch (error) {
        alert("Failed to copy link. Please copy manually.");
      }
      document.body.removeChild(textArea);
    }
    setShowShareModal(false);
  };

  useEffect(() => {
    dispatch(
      setStepperProps({
        showNext: false,
        showPrev: false,
      })
    );
    return () => {
      dispatch(resetStepperProps()); // This resets to initialState
    };
  }, []);

  return (
    <>
      <Menu showContinue={true} />
      <div
        id="screen-29"
        className="h-full pt-16 pb-12 px-4 flex flex-col justify-between items-center bg-[#FFF8E7] font-manrope"
      >
        <div className="flex justify-center items-center mb-5">
          <img
            src={userData.createdTika}
            alt=""
            className="object-contain w-[270px] xs:w-[288px] h-[350px] xs:h-[384px]"
          />
        </div>

        <div className="w-full">
          <div className="w-full flex items-start mb-4 xs:mb-10">
            <div>
              <img
                src={`/images/${userData.char}.png`}
                alt=""
                className="w-11 rounded-lg"
              />
              <p className="mt-1 text-sm font-medium text-center">You</p>
            </div>
            <p className="ml-4 font-medium w-[calc(100%-44px)]">
              What a lovely ticket ! Let's save it.
            </p>
          </div>
          <div className="w-full grid grid-cols-2 gap-4">
            <button
              onClick={downloadImage}
              className="border border-black bg-transparent rounded font-semibold flex justify-center py-3 w-full"
            >
              <img src="/icons/download.svg" alt="" className="w-6 mr-2" />
              Download
            </button>
            <button
              onClick={shareImage}
              className="text-[#FFF8E7] font-semibold rounded flex justify-center bg-black border border-black py-3 w-full"
            >
              <img src="/icons/share.svg" alt="" className="w-6 mr-2" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full rounded-t-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold mb-4 text-center">Share Tika</h3>
            <div className="grid grid-cols-3 gap-4 text-center text-sm font-medium">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `Check out this Tika! ${userData.createdTika}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center"
              >
                <img
                  src="/icons/whatsapp.svg"
                  alt="WhatsApp"
                  className="w-8 mb-1"
                />
                WhatsApp
              </a>
              <button
                onClick={() => {
                  copyToClipboard();
                  window.open('https://www.instagram.com/', '_blank');
                }}
                className="flex flex-col items-center"
              >
                <img
                  src="/icons/instagram.svg"
                  alt="Instagram"
                  className="w-8 mb-1"
                />
                Instagram
              </button>
              <a
                href={`mailto:?subject=Check out this Tika!&body=Hi! I wanted to share this awesome Tika I created: ${encodeURIComponent(userData.createdTika)}`}
                className="flex flex-col items-center"
              >
                <img
                  src="/icons/gmail.svg"
                  alt="Gmail"
                  className="w-8 mb-1"
                />
                Gmail
              </a>
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(
                  userData.createdTika
                )}&text=Check+out+this+Tika!`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center"
              >
                <img
                  src="/icons/telegram.svg"
                  alt="Telegram"
                  className="w-8 mb-1"
                />
                Telegram
              </a>
              <button
                onClick={copyToClipboard}
                className="flex flex-col items-center"
              >
                <img
                  src="/icons/link.svg"
                  alt="Copy Link"
                  className="w-8 mb-1"
                />
                Copy Link
              </button>
              <button
                onClick={() => setShowShareModal(false)}
                className="col-span-3 mt-4 bg-black text-white py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OwnTikkaStep4;
