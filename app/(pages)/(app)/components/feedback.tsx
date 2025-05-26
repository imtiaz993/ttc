import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Menu from "./menu";
import { nextStep } from "../../../redux/slices/navigationSlice";
import { setUserData } from "../../../redux/slices/userSlice";

const Feedback = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.user.userData);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setIsSubmitting] = useState(false);

  const updateUserData = (data) => dispatch(setUserData(data));
  const next = () => dispatch(nextStep());

  const imageToFileObject = async (imagePath) => {
    const response = await fetch(imagePath);
    const blob = await response.blob();
    const fileName = imagePath.split("/").pop();
    return new File([blob], fileName, { type: blob.type });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    feedback: Yup.string().required("Feedback is required"),
    policy1: Yup.boolean().oneOf([true], "Required"),
    policy2: Yup.boolean().oneOf([true], "Required"),
  });

  const initialValues = {
    email: userData?.email || "",
    feedback: "",
    policy1: false,
    policy2: false,
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    const formData = new FormData();
    const file = await imageToFileObject(`/images/${userData.char}.png`);

    formData.append("avatar", file);
    formData.append("email", values.email);
    formData.append("feedback", values.feedback);
    formData.append("userName", userData.name);

    try {
      const response = await fetch(
        "https://ttc-master-be.onrender.com/api/users",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setFormSubmitted(true);
        setTimeout(() => next(), 3000);
      } else {
        setIsSubmitting(false);
        console.error("Submission failed");
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error submitting form:", error);
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
          <div className="mb-2">
            <p className="font-semibold">
              Hope you enjoyed this little journey back in time! 
            </p>
          </div>
          <p className="text-sm">
            Share your contact details with us to unravel more mysteries about
            art, only at the Museum of Art & Photography, Bangalore. 
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, isValid }) => (
              <Form>
                <div className=" my-6">
                  <div className="flex justify-between pb-2 border-b border-[#223100]">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="text-[#202F00] text-sm outline-none placeholder:text-[#202F00] w-full bg-transparent"
                      onChange={(e) => {
                        handleChange(e);
                        updateUserData({ ...userData, email: e.target.value });
                      }}
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className=" my-6">
                  <div className="flex justify-between pb-2 border-b border-[#223100]">
                    <Field
                      as="textarea"
                      name="feedback"
                      placeholder="What should MAP to do next?"
                      className="text-[#202F00] text-sm outline-none placeholder:text-[#202F00] w-full bg-transparent resize-none h-6 leading-6"
                    />
                  </div>
                  <ErrorMessage
                    name="feedback"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="flex flex-col justify-center items-center">
                  <label className="text-xs flex justify-center items-center  w-full">
                    <Field
                      type="checkbox"
                      name="policy1"
                      className="mr-2 w-[18px] h-[18px] -mt-1"
                    />
                    <span className="w-[calc(100%-20px)]">
                      Receiving communication from MAP via Email and WhatsApp.
                    </span>
                  </label>
                  <ErrorMessage
                    name="policy1"
                    component="div"
                    className="text-red-500 text-xs w-full "
                  />

                  <label className="text-xs flex justify-center items-center  mt-3 w-full">
                    <Field
                      type="checkbox"
                      name="policy2"
                      className="mr-2 w-[18px] h-[18px] -mt-1"
                    />
                    <span className="w-[calc(100%-20px)]">
                      Having my data stored as per MAP’s{" "}
                      <span className="underline whitespace-nowrap">
                        Privacy Policy
                      </span>
                    </span>
                  </label>
                  <ErrorMessage
                    name="policy2"
                    component="div"
                    className="text-red-500 text-xs w-full "
                  />
                </div>
                <div className="w-full mt-6">
                  <button
                    disabled={submitting || !isValid}
                    type="submit"
                    className="text-[#FFF8E7] font-semibold rounded text-center leading-[0px] bg-black border border-black h-10 w-full disabled:text-[#FFF8E7] disabled:bg-[#817C74] disabled:border-[#817C74]"
                  >
                    {submitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

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
