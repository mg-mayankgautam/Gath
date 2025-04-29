import React, { useEffect } from "react";
import { useTheme } from "../../context/ThemeProvider";

const Refund = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { darkMode } = useTheme();


  return (
    <div className="bigscreen p-10 flex flex-col gap-5">
      <div>
        <div className="font-bold text-4xl">Refund Policy</div>
        <div
          className={`${
            darkMode ? "bg-[#284637]" : "bg-[#C9DBD2]"
          } py-1 px-2 rounded text-sm mt-2 w-fit`}
        >
          Last Updated On: 30 March'25
        </div>
      </div>

      <div className="flex flex-col gap-6 text-sm leading-relaxed">
        <p>
          Our Refund Policy is simple - If you paid within 14 days and have not
          downloaded any clips from the site, then you qualify for a refund.
          Please contact us with your name and email so that we can quickly
          process your request.
        </p>

        <p className="font-semibold">
          Below are a few examples of how our refund policy works:
        </p>

        <div className="ml-0 mt-2">
          <p className="font-semibold">
            Did you recently sign up for a new Shotkut subscription but changed
            your mind?
          </p>
          <p className="ml-4">You will qualify for a refund if:</p>
          <ul className="list-disc list-inside ml-8">
            <li>Payment was made within the last 14 days</li>
            <li>You have not downloaded or used any clips</li>
          </ul>

          <p className="font-semibold mt-4">
            Did your account renew and you don't need a subscription right now?
          </p>
          <p className="ml-4">You will qualify for a refund if:</p>
          <ul className="list-disc list-inside ml-8">
            <li>Payment was made within the last 14 days</li>
            <li>
              You have not downloaded or used any assets since your renewal
            </li>
          </ul>

          <p className="font-semibold mt-4">
            Would you like to change your plan? Was there a billing error?
          </p>
          <p className="ml-4">
            If you qualify for a refund or need any help with billing, please
            contact us at{" "}
            <a
              href="mailto:support@shotkut.com"
              className="text-blue-600 underline"
            >
              support@shotkut.com
            </a>{" "}
            with your account information such as name, registered email and
            license number so that we can offer you the best solutions
            available.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Refund;
