import React, { useEffect, useState } from "react";
import cross from "../../assets/icons/cross.svg";
import img from "../../assets/login/login1.png";
import logo from "../../assets/logo.png";
import logowhite from "../../assets/logowhite.png";
import { useTheme } from "../../context/ThemeProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import useAuth from "../../hooks/useAuth";
import { useGoogleLogin } from "@react-oauth/google"; // Correct usage
import { FcGoogle } from "react-icons/fc";

const SignIn = ({ setShowModal }) => {
  const [loading, setLoading] = useState(false);

  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  // Disable background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Stop scrolling

    return () => {
      document.body.style.overflow = "auto"; // Restore scrolling
    };
  }, []);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when user types
  };

  const handleLogin = async () => {
    let newErrors = {};

    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/userlogin`,
        {
          id: formData.email,
          password: formData.password,
        }
      );
      // console.log(response.data);
      const { accessToken } = response.data; // Assume backend returns accessToken
      const decodedToken = jwtDecode(accessToken); // Decode the JWT

      console.log(decodedToken);

      const tokenData = {
        ...decodedToken, // Spread all properties from decodedToken
        RawToken: accessToken, // Add the raw token as a new property
      };

      setAuth(tokenData);
      navigate("/dashboard");
      setShowModal(false);
    } catch (error) {
      console.error("Wrong Credentials", error);
    }
  };

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

        const tokenData = {
          ...decodedToken, // Spread all properties from decodedToken
          RawToken: accessToken, // Add the raw token as a new property
        };


        console.log("Decoded JWT:", tokenData); // ✅ Log 3

        setAuth(tokenData);
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
            />
          </div>

          <div className="flex flex-col gap-8 py-12">
            <div className="h-8">
              <img
                src={darkMode ? logowhite : logo}
                className="object-contain h-full"
              />
            </div>
            <div className="mt-8 text-2xl font-semibold">Sign In</div>
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
            or
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
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
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={darkMode ? "input dark w-full" : "input w-full"}
              />

              {errors.password && (
                <p className="absolute top-9 right-0 text-[var(--primary)] text-xs font-medium mt-1">
                  {errors.password}
                </p>
              )}
            </div>
            <button className="greenButton mt-2 mx-auto" onClick={handleLogin}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
