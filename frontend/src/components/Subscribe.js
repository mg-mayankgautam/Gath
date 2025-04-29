import React from 'react';
import { useState } from 'react';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';

const Subscribe = () => {

      const [showSignInModal, setShowSignInModal] = useState(false);
      const [showSignUpModal, setShowSignUpModal] = useState(false);
    
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Main Heading */}
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        All the video you need
      </h1>

      {/* Premium Subscription Section */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-semibold">$24192/month</span>
          <span className="text-gray-500 text-sm">(billed annually)</span>
        </div>
        
        <ul className="space-y-3 mb-6">
          {[
            "Unlimited downloads for a full year",
            "Licensed for personal & commercial use",
            "New footage added every week"
          ].map((item, index) => (
            <li key={index} className="flex items-start">
              <svg 
                className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>

        <button 
        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-200"
        >
          Subscribe
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-6"></div>

      {/* Watermarked Video Section */}
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          Want to download a watermarked video?
        </h2>
        <h3 className="text-lg mb-4 text-gray-600">
          Start discovering Artgrid - Download watermarked clips
        </h3>
        
        <ul className="space-y-3 mb-6 text-left">
          {[
            "Download watermarked videos",
            "Organize your personal footage page",
            "Get the latest news & updates"
          ].map((item, index) => (
            <li key={index} className="flex items-start">
              <svg 
                className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>

       

        <button 
        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-200"
        onClick={() => setShowSignUpModal(true)}
              >
                  Start Free Now
              </button>

        <p className="text-gray-500 text-sm">
          Already a member? 
          <div className='navBtn hover:text-[var(--primary)] transition-all duration-250'
                onClick={() => setShowSignInModal(true)}
              >
                Sign In
              </div>
        </p>
        {showSignInModal &&
        <SignIn setShowModal={setShowSignInModal} />
      }

{showSignUpModal &&
        <SignUp setShowModal={setShowSignUpModal} />
      }

      </div>
    </div>
  );
};

export default Subscribe;