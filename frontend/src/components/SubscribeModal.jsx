import React, { useEffect } from "react";
import cross from "../assets/icons/cross.svg";
import { useState } from "react";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import { useTheme } from "../context/ThemeProvider";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const SubscribeModal = ({ video, setShowModal }) => {
  const { auth } = useAuth();

  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const { darkMode } = useTheme();

  useEffect(() => {
    // Prevent scroll
    document.body.style.overflow = "hidden";

    // Allow scroll when modal unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const downloadWatermark = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/downloadwatermark`,
        { id: video._id },
        {
          headers: {
            Authorization: `Bearer ${auth.RawToken}`,
          },
          responseType: 'blob' // Important for file downloads
        }
      );
  
      // Create download link from the blob response
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `watermarked_video_${video._id}.mp4`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      
    } catch (e) {
      console.error('Download failed:', e);
      // Handle errors (show toast/notification)
    }
  };

  return (
    <div
      className="bg-[#121212CC] h-screen fixed inset-0 z-50 modalOverflow flex items-center"
      onClick={() => setShowModal(false)} // close modal on background click
    >
      <div className="bigscreen max-h-[100vh] p-10">
        <div
          className={`relative max-w-[1024px] max-h-full border p-8 ${
            darkMode
              ? "bg-[#10130D] border-[#1E1E1E]"
              : "bg-white border-[#CBCBCB]"
          } shadow`}
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
        >
          <div
            className="cursor-pointer h-8 absolute top-4 right-4"
            onClick={() => setShowModal(false)}
          >
            <img src={cross} alt="close" className="h-full object-contain" />
          </div>

          <div className="p-10 flex flex-col gap-[64px] justify-center">
            <div className="flex items-center justify-center gap-10">
              {/* Premium Subscription Section */}
              <div className="w-full max-w-[360px] text-sm">
                <h1 className="text-3xl font-bold mb-6">
                  All the videos <br />
                  <span className="text-[var(--primary)]">you need</span>
                </h1>

                <div className="flex justify-start items-center mb-4">
                  <span className="text-[18px] font-semibold">₹ 833/ month</span>
                  <span className="text-[var(--grey)]">(billed annually)</span>
                </div>

                <ul className="space-y-3 mb-6">
                  {[
                    "Unlimited downloads for a full year",
                    "Licensed for personal & commercial use",
                    "New footage added every week",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-[var(--primary)] mt-0.5 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-[var(--grey)]">{item}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/pricing">
                  <button className="button">View Plans</button>
                </Link>
              </div>

              {/* Divider */}
              <div className="w-full max-w-[1px] h-[300px] bg-[var(--grey)]"></div>

              {/* Watermarked Video Section */}
              <div className="w-full max-w-[360px] text-sm">
                <h1 className="text-3xl font-bold mb-6">
                  Get Exactly What You Need, Instantly!
                </h1>
                <div className="font-semibold mb-4">
                  Purchase the video, prices starting from ₹29
                </div>

                <ul className="space-y-3 mb-6 text-left">
                  {[
                    "Pay Once and Download Instantly",
                    "Licensed for personal & commercial use",
                    // ""
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-[var(--primary)] mt-0.5 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-[var(--grey)]">{item}</span>
                    </li>
                  ))}
                  <br />
                </ul>

                <Link to={`onetimepurchase/${video?._id}?type=none`}>
                  <button
                    className="greenButton"
                    onClick={() => setShowSignUpModal(true)}
                  >
                    Continue to Payment
                  </button>
                </Link>
              </div>
            </div>

            <p className="text-[var(--grey)] text-sm text-center mx-auto">
              To Download a Watermarked Preview,{"  "}
              <span
                className="cursor-pointer text-[var(--primary)] hover:text-[var(--hover)] transition-all duration-250"
                onClick={() => downloadWatermark(true)}
              >
                Click Here!
              </span>
            </p>
          </div>
        </div>
      </div>

      {showSignInModal && <SignIn setShowModal={setShowSignInModal} />}
      {showSignUpModal && <SignUp setShowModal={setShowSignUpModal} />}
    </div>
  );
};

export default SubscribeModal;
