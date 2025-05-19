import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Menu from "./menu";
import { nextStep } from "../../../redux/slices/navigationSlice";
import { setUserData } from "../../../redux/slices/userSlice";

const Feedback = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.user.userData);
  const [submitting, setIsSubmitting] = useState(false);
  const updateUserData = (data) => dispatch(setUserData(data));

  const next = () => dispatch(nextStep());

  const [formSubmitted, setFormSubmitted] = useState(false);

  async function imageToFileObject(imagePath) {
    const response = await fetch(imagePath);
    const blob = await response.blob();
    const fileName = imagePath.split("/").pop();
    return new File([blob], fileName, { type: blob.type });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    const file = await imageToFileObject(`/images/${userData.char}.png`);
    formData.append("avatar", file);
    formData.append("email", e.target.email.value);
    formData.append("feedback", e.target.feedback.value);
    formData.append("userName", userData.name);

    try {
      // Mock API call
      const response = await fetch(
        "https://ttc-master-be.onrender.com/api/users",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setFormSubmitted(true);
        setTimeout(() => {
          next();
        }, 3000);
      } else {
        console.error("Mock API call failed");
      }
    } catch (error) {
      console.error("Error during mock API call:", error);
    }
  };

  return (
    <>
      <Menu />
      <div className="h-full pt-16 px-4 flex flex-col justify-start items-center bg-[#FFF8E7] font-manrope">
        <img
          src={`/images/${userData.char}.png`}
          alt=""
          className="w-20 rounded-lg"
        />
        <div className="mt-6 w-full">
          <div className="w-full flex items-center mb-2">
            <img src="/icons/emoji.svg" alt="" className="w-6" />
            <p className="font-semibold ml-2">
              Hope you enjoyed this little journey back in time! 
            </p>
          </div>
          <p className="text-xs">
            Share your contact details with us to unravel more mysteries about
            art, only at the Museum of Art & Photography, Bangalore. 
          </p>

          <form onSubmit={handleSubmit}>
            <div className="flex justify-between pb-2 border-b border-[#223100] my-6">
              <input
                className="text-[#202F00] text-sm outline-none placeholder:text-[#202F00] w-full bg-transparent"
                placeholder="Enter your email"
                type="email"
                name="email"
                onChange={(e) => {
                  updateUserData({
                    ...userData,
                    email: e.target.value,
                  });
                }}
                required
              />

              <button disabled={submitting} type="submit" className="w-5 h-5">
                <img
                  src="/icons/arrow-forward.svg"
                  // arrow-forward-disable.svg

                  alt=""
                  className="w-5"
                />
              </button>
            </div>
            <div className="flex justify-between pb-2 border-b border-[#223100] my-6">
              <textarea
                className="text-[#202F00] text-sm outline-none placeholder:text-[#202F00] w-full bg-transparent"
                placeholder="What would you like MAP to do next?"
                name="feedback"
                required
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <label className=" text-xs flex justify-center items-center max-w-[240px] mb-6">
                <input
                  className="mr-2 w-[18px] h-[18px] -mt-1"
                  name="policy"
                  required
                  type="checkbox"
                />
                <span className="w-[calc(100%-20px)]">
                  Receiving communication from MAP via Email and WhatsApp.
                </span>
              </label>
              <label className=" text-xs flex justify-center items-center max-w-[240px]">
                <input
                  className="mr-2 w-[18px] h-[18px] -mt-1"
                  name="policy"
                  required
                  type="checkbox"
                />
                <span className="w-[calc(100%-20px)]">
                  Having my data stored as per MAP’s{" "}
                  <span className="underline whitespace-nowrap">
                    Privacy Policy
                  </span>
                </span>
              </label>
            </div>
          </form>
          {formSubmitted && (
            <div className="fixed inset-0 flex justify-center items-center">
              <div className="mt-5 bg-[#202F00] rounded-full py-1.5 px-3 flex items-center w-fit">
                <img src="/icons/info.svg" alt="" className="w-6" />
                <p className="ml-2 text-xs text-[#FFF8E7]">
                  Submitted successfully!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Feedback;
