import React, { useRef, useState } from "react";
import VideoPage from "../VideoPage/VideoPage";
import icon1 from "../../assets/icons/icon1.svg";
import icon2 from "../../assets/icons/add2.svg";
import icon3 from "../../assets/icons/download3.svg";
import useAuth from "../../hooks/useAuth";
import { useTheme } from "../../context/ThemeProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SubscribeModal from "../SubscribeModal";

const Video = ({ video }) => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  let hoverTimeout = null;

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout); // Clear any existing timeout
    if (videoRef.current?.paused) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    // Debounce pause to prevent rapid state changes
    hoverTimeout = setTimeout(() => {
      if (!videoRef.current?.paused) {
        videoRef.current.pause();
      }
    }, 200); // Adjust debounce timing as needed
  };

  const { auth } = useAuth();
  const { darkMode } = useTheme();
  const [activeModal, setActiveModal] = useState(null); // null | 'similar' | 'add' | 'download'
  const [showIndiVideoPageModal, setShowIndiVideoPageModal] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);

  const handleIconClick = (type) => {
    console.log(type, auth);

    if (!type) {
      console.error("Received undefined type", type);
      return;
    } else if (type == "add") {
      console.log(auth);

      if (!auth.role) {
        console.log("no auth found");
        navigate("/subscribe");
      } else {
        setActiveModal("add");
      }
    } else if (type == "download") {
      if (!auth.role) {
        console.log("no auth found");
        navigate("/subscribe");
      } else {
        console.log("auth found");
        console.log(auth.subscription);

        if (auth.subscription === "false" || auth.subscription === false) {
          console.log("not subscribed");
          //   navigate("/subscribe");

          setShowSubscribeModal(true);
          //yaha pei call krrr idhrrrrrr
        } else {
          setActiveModal("download");
        }
      }

      //   setActiveModal(type);
    } else {
      setActiveModal(type);
    }
  };

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const closeModal = () => {
    setActiveModal(null);
    setLoading(false);
    setSuccess(false);
    setError(false);
    setMessage("");
  };

  const saveVideo = async () => {
    const token = auth.RawToken;

    setLoading(true);
    setSuccess(false);
    setError(false);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/save`,
        { id: video._id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.data.success == true) {
        setSuccess(true);
        setLoading(false);
        setMessage(response.data.message);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      setError(true);

      if (e.response?.status === 403) {
        console.log("need refresh");
        // window.location.reload();
      }
    }

    console.log(video);
  };

  const renderModalContent = () => {
    if (!auth || Object.keys(auth).length === 0) {
      return (
        <>
          <p className="text-sm">Please login to perform this action.</p>
          <button className="greenButton">Subscribe Now</button>
        </>
      );
    }

    switch (activeModal) {
      case "similar":
        return (
          <>
            <h2 className="text-lg font-semibold mb-4 capitalize">
              Show Similar Videos
            </h2>
            {/* <p className="text-sm">Are you sure you want to add this video to your Collection?</p> */}
            <button className="greenButton">Show</button>
          </>
        );
      case "add":
        return (
          <>
            <h2 className="text-lg font-semibold mb-4 capitalize">
              Add to Collection
            </h2>
            {!loading && !success && (
              <p className="text-sm">
                Are you sure you want to add this video to your Collection?
              </p>
            )}

            {/* Animated Loader/Tick */}
            {loading && !success && (
              <div className="flex items-center justify-center my-2">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[var(--primary)]"></div>
              </div>
            )}
            {success && (
              <div className="h-12 flex items-center justify-center my-2 gap-2">
                <div className="checkmark animate-checkmark">
                  <svg
                    className="w-6 h-6 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <div>{message}</div>
              </div>
            )}
            {error && (
              <p className="text-sm text-red-500">Something went wrong.</p>
            )}

            {!success && (
              <button
                className="greenButton"
                onClick={saveVideo}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add"}
              </button>
            )}
          </>
        );
      case "download":
        return (
          <>
            <h2 className="text-lg font-semibold mb-4 capitalize">Download</h2>
            <p className="text-sm">Click below to download the video:</p>
            {/* <a href={video?.previewURL} download> */}
            <button onClick={handleIconClick()} className="greenButton">
              Download
            </button>
            {/* </a> */}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div
        className="relative group cursor-pointer h-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setShowIndiVideoPageModal(true)}
      >
        {/* Video */}
        <video
          ref={videoRef}
          src={video?.previewURL}
          muted
          loop
          className="w-full h-full object-cover"
          loading="lazy"
          // controls={showControls}
        />

        {/* Hover Content */}
        <div className="absolute inset-1 md:inset-3 flex flex-col justify-between gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex flex-col justify-self-start gap-1 cursor-pointer">
            {/* <div className="text-[#fff] font-semibold">Name</div>
            <div className="text-[#fff] text-sm">user_name</div> */}
          </div>

          <div className="flex gap-4 items-center justify-end relative">
            {[
              { icon: icon1, label: "Show Similar", type: "similar" },
              { icon: icon2, label: "Add", type: "add" },
              { icon: icon3, label: "Download", type: "download" },
            ].map(({ icon, label, type }) => (
              <div
                key={type}
                className="relative flex flex-col items-center cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click from bubbling up to parent
                  e.preventDefault(); // Add this

                  handleIconClick(type);
                }}
              >
                <img
                  src={icon}
                  alt={label}
                  className="h-8 object-contain peer"
                />
                {/* Hover Label */}
                <span
                  className={`absolute -top-6 whitespace-nowrap text-[11px] ${
                    darkMode
                      ? "bg-[#1B1D1C] text-white"
                      : "bg-white text-gray-700"
                  } opacity-0 peer-hover:opacity-100 transition px-2 py-1 rounded shadow absolute`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showIndiVideoPageModal && (
        <VideoPage setShowModal={setShowIndiVideoPageModal} video={video} />
      )}

      {/* Modal */}
      {activeModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className={`${
              darkMode
                ? "bg-[#1B1D1C] border-[#333333]"
                : "bg-[#F1F1F1] border-[#CBCBCB]"
            } border rounded-xl p-6 w-[90%] max-w-sm z-50 shadow-lg flex flex-col items-center gap-6 text-center`}
            onClick={(e) => e.stopPropagation()}
          >
            {renderModalContent()}
          </div>
        </div>
      )}

      {showSubscribeModal && (
        <SubscribeModal video={video} setShowModal={setShowSubscribeModal} />
      )}
    </>
  );
};

export default Video;
