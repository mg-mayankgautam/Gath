import React, { useEffect } from "react";
import { useState } from "react";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import { Link } from "react-router-dom";

const Subscribe = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="p-10 min-h-[calc(100vh-80px)] flex flex-col gap-[64px] justify-center">
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

          {/* <Link to={`onetimepurchase/${video?._id}?type=none`}> */}
          <button
            className="greenButton"
            onClick={() => setShowSignInModal(true)}
          >
            Sign in and Pay
          </button>
          {/* </Link> */}
        </div>
      </div>

      <div>
        <p className="text-[var(--grey)] text-sm text-center mx-auto">
          Want to download watermarked videos?{"  "}
          <span
            className="cursor-pointer text-[var(--primary)] hover:text-[var(--hover)] transition-all duration-250"
            onClick={() => setShowSignUpModal(true)}
          >
            Create a free account {"  "}
          </span>
          now
        </p>

        {/* <p className="text-[var(--grey)] mt-2 text-sm text-center mx-auto">
          Already a member?{"  "}
          <span
            className="cursor-pointer text-[var(--primary)] hover:text-[var(--hover)] transition-all duration-250"
            onClick={() => setShowSignInModal(true)}
          >
            Sign In
          </span>
        </p> */}
      </div>

      {showSignInModal && <SignIn setShowModal={setShowSignInModal} />}
      {showSignUpModal && <SignUp setShowModal={setShowSignUpModal} />}
    </div>
  );
};

export default Subscribe;
