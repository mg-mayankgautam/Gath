import React, { useEffect, useState } from "react";
import img from "../assets/login/login1.png";
import img1 from "../assets/about/about1.png";
import img2 from "../assets/about/about2.png";
import img3 from "../assets/about/about3.png";
import { useTheme } from "../context/ThemeProvider";

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { darkMode } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    query: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    query: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when user types
  };

  const handleSubmit = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "phone is required";
    if (!formData.query.trim()) newErrors.query = "query is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // navigate("/dashboard");
    }
  };

  return (
    <div className="bigscreen p-10">
      {/* <div className="grid grid-cols-[3fr_2fr] !gap-10"> */}
      <div className="grid grid-cols-1 !gap-10">
        <div className="flex flex-col gap-4 justify-center">
          <div className="font-bold text-5xl max-w-[600px]">Contact Us</div>
          <div className="text-[18px] font-light max-w-[520px]">
            Submit any request and we'll reach out to you as soon as possible!
          </div>
          {/* <button className="greenButton mt-6">Start Browsing</button> */}
          <div className="text-[18px] font-semibold my-4">
            <a href="mailto:support@shotkut.com">support@shotkut.com</a> <br />{" "}
            <a href="tel:+919717914147">+91 97179 14147</a>
          </div>
        </div>
        {/* helo
        call when done, if not feeling sleepy
okk,:) till when u up?3-4 okk same, will be waiting . u can call rn ...too, i ll do work later. u can push and go sleep, no need to stay on live share.
i have some bug fixing to do. call me when its done.check tags clear all etc works. u want me to see the bug or just try what u have done? 2nd one okiiii dekhri hu.  */}
        {/* niceeee, bs reset krne ke baad search results bhi reset krdo. */}
      </div>

      <div className="mt-[60px] flex flex-col gap-4 w-full max-w-[800px]">
        {/* <div className="text-3xl font-bold">Contact Us</div> */}

        <div className="grid grid-cols-1 !gap-8 w-full">
          <div className="relative">
            <div className="mb-1 ml-1 text-sm">Full Name *</div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              //   placeholder="Full Name"
              className={darkMode ? "input dark w-full" : "input w-full"}
            />

            {errors.name && (
              <p className="absolute top-16 right-0 text-[var(--primary)] text-xs font-medium mt-1">
                {errors.name}
              </p>
            )}
          </div>

          <div className="relative">
            <div className="mb-1 ml-1 text-sm">Email ID *</div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              //   placeholder="Email ID"
              className={darkMode ? "input dark w-full" : "input w-full"}
            />

            {errors.email && (
              <p className="absolute top-16 right-0 text-[var(--primary)] text-xs font-medium mt-1">
                {errors.email}
              </p>
            )}
          </div>

          <div className="relative">
            <div className="mb-1 ml-1 text-sm">Phone Number *</div>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              //   placeholder="Phone Number"
              className={darkMode ? "input dark w-full" : "input w-full"}
            />

            {errors.phone && (
              <p className="absolute top-16 right-0 text-[var(--primary)] text-xs font-medium mt-1">
                {errors.phone}
              </p>
            )}
          </div>

          <div className="relative">
            <div className="mb-1 ml-1 text-sm">Your Query *</div>
            <input
              type="text"
              name="query"
              value={formData.query}
              onChange={handleChange}
              //   placeholder="User Country"
              className={darkMode ? "input dark w-full" : "input w-full"}
            />

            {errors.query && (
              <p className="absolute top-16 right-0 text-[var(--primary)] text-xs font-medium mt-1">
                {errors.query}
              </p>
            )}
          </div>

          <div className="relative">
            <div className="mb-1 ml-1 text-sm">
              Kindly give full description of your concern
            </div>
            <textarea
              type="text"
              name="message"
              value={formData.message}
              onChange={handleChange}
              //   placeholder="Message"
              className={darkMode ? "input dark w-full" : "input w-full"}
            />

            {/* {errors.message && (
              <p className="absolute top-9 right-0 text-[var(--primary)] text-xs font-medium mt-1">
                {errors.country}
              </p>
            )} */}
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2 mx-auto">
          <input
            type="checkbox"
            id="agree"
            className="form-checkbox text-[var(--primary)] focus:ring-[var(--primary)]"
          />
          <label htmlFor="agree" className="text-sm">
            I agree to the{" "}
            <a
              href="/termsandconditions"
              className="text-[var(--primary)] underline hover:opacity-80"
            >
              Terms and Conditions
            </a>
          </label>
        </div>

        <button
          className="greenButton mt-6 mx-auto"
          onClick={() => handleSubmit()}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ContactUs;
