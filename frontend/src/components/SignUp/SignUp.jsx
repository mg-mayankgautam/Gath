// src/pages/SignUp.jsx
import React, { useEffect, useState } from "react";
import cross from "../../assets/icons/cross.svg";
import img from "../../assets/login/login1.png";
import logo from "../../assets/logo.png";
import logowhite from "../../assets/logowhite.png";
import { useTheme } from "../../context/ThemeProvider";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google"; // Correct usage
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail } from "react-icons/hi";

const SignUp = ({ setShowModal }) => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const { darkMode } = useTheme();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [showEmailInputs, setShowEmailInputs] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Google Login Hook - correctly passing "credential"
  const googleLogin = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      console.log(
        "Google login SUCCESS credentialResponse:",
        credentialResponse
      ); // ✅ Log 1
      try {
        setLoading(true);
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/auth/google`,
          {
            credential: credentialResponse.access_token,
          }
        );
        console.log("Backend /auth/google RESPONSE:", response.data); // ✅ Log 2

        const { accessToken } = response.data;
        const decodedToken = jwtDecode(accessToken);
        console.log("Decoded JWT:", decodedToken); // ✅ Log 3

        setAuth(decodedToken);
        navigate("/dashboard");
        setShowModal(false);
      } catch (error) {
        console.error("Error sending credential to backend:", error); // ✅ Log 4
        setErrors({
          ...errors,
          email: "Google login failed. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    },
    onError: (error) => {
      console.error("Google login FAILED:", error); // ✅ Log 5
      setErrors({ ...errors, email: "Google login failed. Please try again." });
    },
    flow: "implicit",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (showEmailInputs) {
      if (!formData.firstName.trim())
        newErrors.firstName = "First Name is required";
      if (!formData.lastName.trim())
        newErrors.lastName = "Last Name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      if (!formData.password.trim())
        newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/auth/signup`,
          formData,
          { withCredentials: true }
        );
        const { accessToken } = response.data;
        const decodedToken = jwtDecode(accessToken);

        setAuth(decodedToken);
        navigate("/dashboard");
        setSuccessMessage("Account created successfully!");
        setFormData({ firstName: "", lastName: "", email: "", password: "" });
      } catch (error) {
        console.error("Signup error:", error);
        if (error.response?.data?.message) {
          setErrors((prev) => ({
            ...prev,
            email: error.response.data.message,
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            email: "Failed to create account. Please try again.",
          }));
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      className="bg-[#121212CC] h-screen fixed inset-0 z-50 modalOverflow"
      onClick={() => setShowModal(false)}
    >
      <div className="bigscreen max-h-[100vh] h-[100vh] p-10">
        <div
          className={`relative max-w-[1024px] mx-auto h-full max-h-full border p-8 ${
            darkMode
              ? "bg-[#10130D] border-[#1E1E1E]"
              : "bg-white border-[#CBCBCB]"
          } shadow grid grid-cols-2 !gap-8`}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="cursor-pointer h-8 absolute top-4 right-4"
            onClick={() => setShowModal(false)}
          >
            <img src={cross} alt="close" className="h-full object-contain" />
          </div>

          <div className="h-full max-h-full w-full rounded-2xl">
            <img
              src={img}
              className="object-cover max-h-full h-[calc(100vh-156px)] w-full rounded-2xl opacity-90"
              alt="login visual"
            />
          </div>

          <div className="flex flex-col gap-8 py-12">
            <div className="h-8">
              <img
                src={darkMode ? logowhite : logo}
                className="object-contain h-full"
                alt="Logo"
              />
            </div>

            <div className="mt-8 text-2xl font-semibold">
              Create a free account
            </div>

            <form onSubmit={handleSubmit}>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => googleLogin()}
                  className={
                    darkMode
                      ? "input dark w-1/2 flex items-center justify-center gap-2"
                      : "input w-1/2 flex items-center justify-center gap-2"
                  }
                >
                  <FcGoogle className="text-xl" /> Continue with Google
                </button>
                <button
                  type="button"
                  className={
                    darkMode
                      ? "input dark w-1/2 flex items-center justify-center gap-2"
                      : "input w-1/2 flex items-center justify-center gap-2"
                  }
                  onClick={() => setShowEmailInputs(true)}
                >
                  <HiOutlineMail className="text-xl" /> Continue with Email
                </button>
              </div>

              {showEmailInputs && (
                <>
                  <div className="relative mt-4">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      className={
                        darkMode ? "input dark w-full" : "input w-full"
                      }
                    />
                    {errors.firstName && (
                      <p className="absolute top-9 right-0 text-[var(--primary)] text-xs font-medium mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div className="relative mt-4">
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className={
                        darkMode ? "input dark w-full" : "input w-full"
                      }
                    />
                    {errors.lastName && (
                      <p className="absolute top-9 right-0 text-[var(--primary)] text-xs font-medium mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  <div className="relative mt-4">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className={
                        darkMode ? "input dark w-full" : "input w-full"
                      }
                    />
                    {errors.email && (
                      <p className="absolute top-9 right-0 text-[var(--primary)] text-xs font-medium mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="relative mt-4">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className={
                        darkMode ? "input dark w-full" : "input w-full"
                      }
                    />
                    {errors.password && (
                      <p className="absolute top-9 right-0 text-[var(--primary)] text-xs font-medium mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="greenButton mt-4 mx-auto"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Create account"}
                  </button>

                  {successMessage && (
                    <p className="text-green-500 text-center mt-2">
                      {successMessage}
                    </p>
                  )}
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
