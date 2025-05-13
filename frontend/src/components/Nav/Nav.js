import React, { useState, useEffect, useRef } from "react";
import { FiMenu } from "react-icons/fi";
import "./Nav.css";
import logo from "../../assets/logo.png";
import logowhite from "../../assets/logowhite.png";
import { Link, useLocation } from "react-router-dom";
import SignIn from "../SignIn/SignIn";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../../context/ThemeProvider";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const Nav = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  // console.log(auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const location = useLocation();
  const { darkMode } = useTheme();
  const [showProfileDropDown, setShowProfileDropDown] = useState(false);

  const logout = async () => {
    console.log("clicked logout");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/logout`
      );
      if (response.data) {
        window.location.reload();
        navigate("/");
      }
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  const profileDropdownRef = useRef(null);
  const mobileNavRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setShowProfileDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileNavRef.current &&
        !mobileNavRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className={darkMode ? "NavContainer dark" : "NavContainer"}>
        <div className="Nav bigscreen">
          {auth.role == "ADMIN" ? (
            <Link className="navLogo">
              <img
                src={darkMode ? logowhite : logo}
                className="object-contain h-full"
              />
            </Link>
          ) : (
            <Link className="navLogo" to="/">
              <img
                src={darkMode ? logowhite : logo}
                className="object-contain h-full"
              />
            </Link>
          )}

          <div className="hidden md:flex gap-6 items-center ml-auto">
            <Link to="/pricing">
              <div className="navBtn hover:text-[var(--primary)] transition-all duration-250">
                Pricing
              </div>
            </Link>

            {auth.role ? (
              <div
                onClick={() => setShowProfileDropDown(!showProfileDropDown)}
                className="navBtn hover:text-[var(--primary)] transition-all duration-250 flex items-center gap-1"
              >
                <IoPerson />
                {/* {auth.role} */}
                User
              </div>
            ) : (
              <div
                className="navBtn hover:text-[var(--primary)] transition-all duration-250"
                onClick={() => setShowSignInModal(true)}
              >
                Sign In
              </div>
            )}

            <ThemeToggle />
          </div>

          <div
            className={`md:hidden text-2xl cursor-pointer`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <RxCross2 /> : <FiMenu />}
          </div>

          {/* Mobile Menu */}
          {/* {menuOpen && ( */}
          <div
            ref={mobileNavRef}
            className={`absolute top-[60px] left-0 w-full flex flex-col px-4 gap-2 shadow-md transition-all duration-300 ease-in-out max-h-0 overflow-y-hidden rounded border
                ${darkMode
                ? "bg-[#1B1D1C] border-[#333333]"
                : "bg-[#F1F1F1] border-[#CBCBCB]"
              }
                ${menuOpen
                ? "opacity-100 h-auto max-h-[calc(100vh-80px)] pt-6 pb-8"
                : "opacity-0 py-0"
              }`}
          >
            {/* <div className="absolute top-12 left-0 w-full bg-black shadow-lg flex flex-col p-4 md:hidden"> */}
            <Link to="/pricing">
              <div className="navBtn hover:text-[var(--primary)] transition-all duration-250">
                Pricing
              </div>
            </Link>

            {auth.role ? (
              <>
                <div
                  // ref={userButtonMobileRef}
                  onClick={() => setShowProfileDropDown(!showProfileDropDown)}
                  className="navBtn hover:text-[var(--primary)] transition-all duration-250 flex items-center gap-1"
                >
                  <IoPerson />
                  {/* {auth.role} */}
                  User
                </div>

                {/* {showProfileDropDown && ( */}
                <div
                  ref={profileDropdownRef}
                  className={`md:hidden pl-4 flex flex-col gap-2 transition-all duration-300 ease-in-out max-h-0 overflow-y-hidden 
                    ${showProfileDropDown
                      ? "opacity-100 h-auto max-h-[999px] py-0"
                      : "opacity-0 py-0"
                    }`}
                >
                  <Link to="/dashboard" onClick={() => setShowProfileDropDown(false)}>
                    <div className="navBtn hover:text-[var(--primary)] transition-all duration-250">
                      Dashboard
                    </div>
                  </Link>
                  <div
                    onClick={() => {
                      logout();
                      setShowProfileDropDown(false);
                    }}
                    className="navBtn hover:text-[var(--primary)] transition-all duration-250"
                  >
                    Logout
                  </div>
                </div>
                {/* )} */}
              </>
            ) : (
              <div
                className="navBtn hover:text-[var(--primary)] transition-all duration-250 mb-20"
                onClick={() => { setShowSignInModal(true); setMenuOpen(false) }}
              >
                Sign In
              </div>
            )}

            <ThemeToggle />
          </div>
          {/* )} */}

          {/* {showProfileDropDown && ( */}
          <div
            ref={profileDropdownRef}
            className={`hidden absolute top-[60px] right-[124px] w-full max-w-[200px] px-2 md:flex flex-col gap-2 shadow-md transition-all duration-300 ease-in-out max-h-0 overflow-y-hidden rounded border
                ${darkMode
                ? "bg-[#1B1D1C] border-[#333333]"
                : "bg-[#F1F1F1] border-[#CBCBCB]"
              }
                ${showProfileDropDown
                ? "opacity-100 h-auto max-h-[999px] py-2"
                : "opacity-0 py-0"
              }`}
          >
            <Link to="/dashboard" onClick={() => setShowProfileDropDown(false)}>
              <div className="navBtn hover:text-[var(--primary)] transition-all duration-250">
                Dashboard
              </div>
            </Link>
            <div
              onClick={() => {
                logout();
                setShowProfileDropDown(false);
              }}
              className="navBtn hover:text-[var(--primary)] transition-all duration-250"
            >
              Logout
            </div>
          </div>
          {/* )} */}
        </div>
      </div>

      {showSignInModal && <SignIn setShowModal={setShowSignInModal} />}
    </>
  );
};

export default Nav;

const uniqueKeywords = [
  "alta",
  "katori",
  "bowl",
  "red",
  "henna",
  "durga",
  "pooja",
  "pujo",
  "chana",
  "masala",
  "rice",
  "indian",
  "spices",
  "dhania",
  "basmati",
  "chickpeas",
  "bottle gourd",
  "farm",
  "crop",
  "harvest",
  "farming",
  "vegetable",
  "green",
  "fields",
  "vine",
  "mother earth",
  "leaves",
  "cucumber",
  "box",
  "stack",
  "sorting facility",
  "farmers market",
  "farmer",
  "plucking",
  "man",
  "field",
  "greenery",
  "trees",
  "indian fruits",
  "farmers",
  "walking",
  "farm field",
  "indian man",
  "dal tadka",
  "lentils",
  "coriander",
  "red chilly",
  "standing",
  "smiling",
  "sunset",
  "river",
  "bridge",
  "india",
  "howrah",
  "slow motion",
  "river bank",
  "photos",
  "street park",
  "taxi cars",
  "lights",
  "decorated",
  "decorated street",
  "fairy lights",
  "crowd",
  "christmas",
  "pile of cucumber",
  "stacked vegetables",
  "sorting",
  "healthy",
  "water",
  "Rituals",
  "Food",
  "Agriculture",
  "Nature",
  "Festival",
];
