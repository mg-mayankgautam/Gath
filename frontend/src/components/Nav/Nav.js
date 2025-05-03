import React, { useState } from "react";
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

  return (
    <>
      <div className={darkMode ? "NavContainer dark" : "NavContainer"}>
        <div className={"Nav bigscreen"}>
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

          <FiMenu
            className="md:hidden text-2xl text-white cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="absolute top-12 left-0 w-full bg-black shadow-lg flex flex-col items-start p-4 space-y-2 md:hidden">
              <button className="w-full text-left px-4 py-2 rounded-lg text-[rgba(255,255,255,0.541)] bg-transparent hover:text-white">
                Join
              </button>
              <button className="w-full text-left px-4 py-2 rounded-lg text-[rgba(255,255,255,0.541)] bg-transparent hover:text-white">
                Contact
              </button>
              {/* Sign In Button */}
              <button className="w-full text-left px-4 py-2 bg-[rgb(255,173,143)] text-black rounded-lg hover:bg-[rgb(252,185,161)]">
                Sign In
              </button>
            </div>
          )}

          {/* {showProfileDropDown && ( */}
          <div
            className={`absolute top-[60px] right-[124px] w-full max-w-[200px] px-2 flex flex-col gap-2 shadow-md transition-all duration-300 ease-in-out max-h-0 overflow-y-hidden rounded border
                ${
                  darkMode
                    ? "bg-[#1B1D1C] border-[#333333]"
                    : "bg-[#F1F1F1] border-[#CBCBCB]"
                }
                ${
                  showProfileDropDown
                    ? "opacity-100 h-auto max-h-[999px] py-2"
                    : "opacity-0 py-0"
                }`}
          >
            <Link to="/dashboard">
              <div className="navBtn hover:text-[var(--primary)] transition-all duration-250">
                Dashboard
              </div>
            </Link>
            <div
              onClick={() => logout()}
              className="navBtn hover:text-[var(--primary)] transition-all duration-250"
            >
              Logout
            </div>
          </div>
          {/* )} */}
        </div>
      </div>

      {/* {(location.pathname == '/dashboard' || location.pathname == '/employee/dashboard') ?
        <div className='navStrip h-6 px-10 flex items-center justify-evenly text-white text-sm'>
        </div>
        :
        <div className='navStrip h-10 px-10 flex items-center justify-evenly text-white text-sm'>
          <div className='cursor-pointer'>Video Themes</div>
          <div className='cursor-pointer'>Shot Types</div>
          <div className='cursor-pointer'>People</div>
          <div className='cursor-pointer'>Collections</div>
          <div className='cursor-pointer'>Filmmakers</div>
        </div>
      } */}

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
