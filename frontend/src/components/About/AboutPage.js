import React, { useEffect, useState } from "react";
import img from "../../assets/login/login1.png";
import img1 from "../../assets/about/about1.png";
import img2 from "../../assets/about/about2.png";
import img3 from "../../assets/about/about3.png";
import { useTheme } from "../../context/ThemeProvider";

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
    <div className="bigscreen p-10">
      <div className="grid grid-cols-[3fr_2fr] !gap-10">
        <div className="flex flex-col gap-4 justify-center">
          <div className="font-bold text-5xl max-w-[600px]">
            Unlimited Indian Footage for everyone
          </div>
          <div className="text-[20px] font-light max-w-[520px]">
            Over 6 million free high-resolution videos brought to you by the
            world’s most generous community of contributors.
          </div>
          <button className="greenButton mt-6">Start Browsing</button>
        </div>

        <div className="h-full max-h-full w-full rounded-2xl">
          <img
            src={img}
            className="object-cover max-h-full h-[400px] w-full rounded-2xl opacity-90"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 !gap-8 mt-[80px]">
        <div className="flex flex-col gap-2">
          <div className="h-full max-h-[250px] w-full rounded-2xl mb-2">
            <img
              src={img1}
              className="object-cover h-full w-full rounded-md opacity-90"
            />
          </div>
          <div className="font-bold">Over six million curated footages</div>
          <div className="text-sm font-light">
            We hand-select every footage and accept only the best, so that no
            matter what you need—you’ll find exactly what you’re looking for on
            Shotkut.
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="h-full max-h-[250px] w-full rounded-2xl mb-2">
            <img
              src={img2}
              className="object-cover h-full w-full rounded-md opacity-90"
            />
          </div>
          <div className="font-bold">Over six million curated footages</div>
          <div className="text-sm font-light">
            We hand-select every footage and accept only the best, so that no
            matter what you need—you’ll find exactly what you’re looking for on
            Shotkut.
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="h-full max-h-[250px] w-full rounded-2xl mb-2">
            <img
              src={img3}
              className="object-cover h-full w-full rounded-md opacity-90"
            />
          </div>
          <div className="font-bold">Over six million curated footages</div>
          <div className="text-sm font-light">
            We hand-select every footage and accept only the best, so that no
            matter what you need—you’ll find exactly what you’re looking for on
            Shotkut.
          </div>
        </div>
      </div>

      <div className="mt-[72px] flex flex-col gap-4 text-center">
        <div className="text-3xl font-bold">Contact Us</div>
        <div className="text-[18px] max-w-[640px] mx-auto">
          Lorem ipsum dolor sit amet consectetur. Proin facilisi lectus ac urna.
          Sit dictum amet sollicitudin ultrices egestas orci. Viverra tristique
          convallis ultrices vitae orci id. Sagittis non libero in erat
          vestibulum.
        </div>
        <div className="text-[24px] font-bold my-6">
          <a href="mailto:support@shotkut.com">support@shotkut.com</a> <br />{" "}
          +91 23452 56566
        </div>

        <div className="grid grid-cols-2 !gap-8 w-full max-w-[700px] mx-auto">
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

          <div className="relative col-span-2">
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
