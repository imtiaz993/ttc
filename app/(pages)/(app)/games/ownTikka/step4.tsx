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
  const next = () => dispatch(nextStep());

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = userData.createdTika;
    link.download = "my-tika.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => {
      next();
    }, 2000);
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
      <Menu />
      <div className="h-full pt-16 pb-12 px-4 flex flex-col justify-between items-center bg-[#FFF8E7] font-manrope">
        <div className="flex justify-center items-center mb-5">
          <img
            src={userData.createdTika}
            alt=""
            className="object-contain w-72"
            style={{ width: "288px", height: "384px" }}
          />
        </div>

        <div>
          <div className="w-full flex items-start mb-10">
            <div>
              <img
                src={`/images/${userData.char}.png`}
                alt=""
                className="w-11 rounded-lg"
              />
              <p className="mt-1 text-sm font-medium text-center">You</p>
            </div>
            <p className="ml-4 font-medium w-[calc(100%-44px)]">
              Look at that! I just made my first Ticket. I should save it.
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
                  userData.createdTika
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
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  userData.createdTika
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center"
              >
                <img
                  src="/icons/facebook.svg"
                  alt="Facebook"
                  className="w-8 mb-1"
                />
                Facebook
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  userData.createdTika
                )}&text=Check+out+this+Tika!`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center"
              >
                <img
                  src="/icons/twitter.svg"
                  alt="Twitter"
                  className="w-8 mb-1"
                />
                Twitter
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
