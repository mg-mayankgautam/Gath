import React, { useEffect, useState } from "react";
import img from "../../assets/login/login1.png";
import img1 from "../../assets/about/about1.png";
import img2 from "../../assets/about/about2.png";
import img3 from "../../assets/about/about3.png";
import { useTheme } from "../../context/ThemeProvider";
import { Link } from "react-router-dom";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { darkMode } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
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
    if (!formData.country.trim()) newErrors.country = "country is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // navigate("/dashboard");
    }
  };

  return (
    <div className="bigscreen px-5 py-10 md:p-10">
      <div className="grid grid-cols-1 sm:grid-cols-[3fr_2fr] !gap-10">
        <div className="flex flex-col gap-4 justify-center">
          <div className="font-bold text-4xl md:text-5xl max-w-[600px]">
            Unlimited Indian Footage for everyone
          </div>
          <div className="md:text-[20px] font-light max-w-[520px]">
            A collection of over 10,000 high resolution Indian stock videos at an incredibly low cost
          </div>
          <Link to='/' >

            <button className="greenButton mt-6">Start Browsing</button></Link>
        </div>

        <div className="hidden sm:block h-full max-h-full w-full rounded-2xl">
          <img
            src={img}
            className="object-cover max-h-full h-[400px] w-full rounded-2xl opacity-90"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 !gap-8 mt-[80px]">
        <div className="flex flex-col gap-2">
          <div className="h-full max-h-[250px] w-full rounded-2xl mb-2">
            <img
              src={img1}
              className="object-cover h-full w-full rounded-md opacity-90"
            />
          </div>
          <div className="font-bold">Find authentic Indian stock footage</div>
          <div className="text-sm font-light">
            Prioritize genuine portrayals of India by seeking footage that reflects real life, diverse cultures, and landscapes.
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="h-full max-h-[250px] w-full rounded-2xl mb-2">
            <img
              src={img2}
              className="object-cover h-full w-full rounded-md opacity-90"
            />
          </div>
          <div className="font-bold">Unlock over 10,000 high-res curated footages</div>
          <div className="text-sm font-light">
            Access a large library of quality visuals through our subscription. Benefit from a wealth of high-resolution Indian video clips readily available for your projects.
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="h-full max-h-[250px] w-full rounded-2xl mb-2">
            <img
              src={img3}
              className="object-cover h-full w-full rounded-md opacity-90"
            />
          </div>
          <div className="font-bold">Elevate your projects with professional-grade Indian visuals</div>
          <div className="text-sm font-light">
            We hand-select every footage and accept only the best, so that no
            matter what you need—you’ll find exactly what you’re looking for on
            Shotkut.
          </div>
        </div>
      </div>

      <div className="mt-[72px] flex flex-col gap-4 text-center">
        <div className="text-3xl font-bold">Contact Us</div>
        <div className="md:text-[18px] max-w-[640px] mx-auto">
          Whether you have a question about subscription plans,
          pricing or anything else, our team has all the answers!
        </div>
        <div className="text-[20px] md:text-[24px] font-bold my-6">
          <a href="mailto:support@shotkut.com">support@shotkut.com</a> <br />{" "}
          <a href="tel:+919717914147">+91 97179 14147</a>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 !gap-8 w-full max-w-[700px] mx-auto">
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className={darkMode ? "input dark w-full" : "input w-full"}
            />

            {errors.name && (
              <p className="absolute top-9 right-0 text-[var(--primary)] text-xs font-medium mt-1">
                {errors.name}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email ID"
              className={darkMode ? "input dark w-full" : "input w-full"}
            />

            {errors.email && (
              <p className="absolute top-9 right-0 text-[var(--primary)] text-xs font-medium mt-1">
                {errors.email}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className={darkMode ? "input dark w-full" : "input w-full"}
            />

            {errors.phone && (
              <p className="absolute top-9 right-0 text-[var(--primary)] text-xs font-medium mt-1">
                {errors.phone}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="User Country"
              className={darkMode ? "input dark w-full" : "input w-full"}
            />

            {errors.country && (
              <p className="absolute top-9 right-0 text-[var(--primary)] text-xs font-medium mt-1">
                {errors.country}
              </p>
            )}
          </div>

          <div className="relative md:col-span-2">
            <textarea
              type="text"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
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

export default AboutPage;
