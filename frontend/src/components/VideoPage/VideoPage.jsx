import React, { useEffect, useState } from "react";
import cross from "../../assets/icons/cross.svg";
import wishlist from "../../assets/icons/wishlist.svg";
import wishlistwhite from "../../assets/icons/wishlistwhite.svg";
import add from "../../assets/icons/add.svg";
import addwhite from "../../assets/icons/addwhite.svg";
import share from "../../assets/icons/share.svg";
import sharewhite from "../../assets/icons/sharewhite.svg";
import download from "../../assets/icons/download.svg";
import profile from "../../assets/sampleprofile.png";
import { Skeleton } from "@mui/material";
import axios from "axios";
import { useTheme } from "../../context/ThemeProvider";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import SearchInput from "../SearchPage/SearchInput";
import Video from "../HomePage/Video";
const VideoPage = ({ setShowModal, video }) => {
  const navigate = useNavigate();
  console.log(video);
  const { darkMode } = useTheme();
  const [related, setRelated] = useState([])

  useEffect(() => {
    // Disable background scroll
    document.body.style.overflow = "hidden";

    const viewadd = async () => {
      try {
        const formData = new FormData(); // Ensure formData is properly initialized
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/videos/view`,
          { id: video._id }
        );
        console.log("Response:", response.data); // Handle success
        setRelated(response.data.relatedVideos);
      } catch (error) {
        console.error("Error during viewadd:", error); // Handle errors
      }
    };

    // Call the async function
    viewadd();

    // Cleanup function to restore background scroll
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []); // Empty dependency array ensures it runs only once

  const { auth } = useAuth();
  const [activeModal, setActiveModal] = useState(null); // null | 'similar' | 'add' | 'download'

  const handleIconClick = (type) => {
    setActiveModal(type);
  };

  const closeModal = () => setActiveModal(null);

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
      case "share":
        return (
          <>
            <h2 className="text-lg font-semibold mb-4 capitalize">
              Share Video
            </h2>
            {/* <p className="text-sm">
              Are you sure you want to add this video to your Collection?
            </p> */}
            <button className="greenButton" onClick={handleShare}>
              Share
            </button>
          </>
        );
      case "add":
        return (
          <>
            <h2 className="text-lg font-semibold mb-4 capitalize">
             Save Video
            </h2>
            <p className="text-sm">
              Are you sure you want to add this video to your Favorites?
            </p>
            <button className="greenButton">Add</button>
          </>
        );
      case "download":
        return (
          <>
            <h2 className="text-lg font-semibold mb-4 capitalize">Download</h2>
            <p className="text-sm">Click below to download the video:</p>
            {/* <a href={video?.previewURL} download> */}
            <button className="greenButton">Download</button>
            {/* </a> */}
          </>
        );
      default:
        return null;
    }
  };

  const handleShare = async () => {
    const currentLink = window.location.href;
    if (navigator.share) {
      // Use the native share option if available
      try {
        await navigator.share({
          title: "Check this out!",
          url: currentLink,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback: Copy link to clipboard
      try {
        await navigator.clipboard.writeText(currentLink);

        alert("Link copied to clipboard!");
      } catch (error) {
        console.error("Failed to copy link:", error);
      }
    }
  };


console.log(related)

  return (
    <>
      <div
        className="bg-[#121212CC] h-screen fixed inset-0 z-30 modalOverflow"
        onClick={() => setShowModal(false)}
      >
        <div className="bigscreen py-16 px-20">
          <div
            className={`w-full ${
              darkMode
                ? "bg-[#080E0B] border-[#1E1E1E]"
                : "bg-[#ECECEC] border-[#CBCBCB]"
            } rounded-[8px] border`}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`flex items-center justify-between pl-8 pr-2 text-xs rounded-tl-[8px] rounded-tr-[8px] ${
                darkMode
                  ? "bg-[#10130D] text-[#888888]"
                  : "bg-[#C9DBD2] text-[#222222]"
              } `}
            >
              <div className="py-2">
                All Items &gt; Stock Video &gt; Motion Graphics &gt; Asset 1
              </div>

              <div
                className="cursor-pointer h-6"
                onClick={() => setShowModal(false)}
              >
                <img
                  src={cross}
                  alt="close"
                  className="h-full object-contain"
                />
              </div>
            </div>

            <div className="px-8 py-4 mt-2 flex items-center justify-between">
              {/* <div className="flex gap-6 h-10">
              <div className="h-full w-10">
                <img
                  src={profile}
                  alt="profile"
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>

              <div className="flex flex-col justify-between">
                <div className="font-semibold">Name</div>
                <div className="text-[var(--grey)] text-sm">user_name</div>
              </div>
            </div> */}

              <SearchInput />

              <div className="flex gap-6 items-center">
                <button className="greenButton flex gap-2 text-xs">
                  <img
                    src={download}
                    alt="download"
                    className="h-full object-contain"
                    onClick={() => setActiveModal("download")}
                  />
                  Download
                </button>

                {[
                  // {
                  //   icon: darkMode ? wishlistwhite : wishlist,
                  //   label: "Wishlist",
                  //   type: "wishlist",
                  // },
                  {
                    icon: darkMode ? addwhite : add,
                    label: "Save",
                    type: "add",
                  },
                  {
                    icon: darkMode ? sharewhite : share,
                    label: "Share",
                    type: "share",
                  },
                ].map(({ icon, label, type }) => (
                  <div
                    key={type}
                    className="relative flex flex-col items-center cursor-pointer"
                  >
                    <img
                      src={icon}
                      alt={label}
                      className="h-8 object-contain peer"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent click from bubbling up to parent
                        handleIconClick(type);
                      }}
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

            <div className={darkMode ? "line !bg-[#3D413E]" : "line"}></div>

            <div className="flex flex-col gap-8 px-8 py-8">
              <div className="h-full">
                <video
                  // ref={videoRef}
                  src={video?.waterMarkedVideoURL}
                  muted
                  loop
                  className="w-full h-auto rounded-[8px] aspect-video object-contain"
                  loading="lazy"
                  controls={true}
                />
              </div>

              <div className="flex justify-between items-start gap-10">
                <div className="text-xl font-semibold break-all">
                  {video?.name}
                </div>
                <div className="underline text-[var(--grey)] text-large cursor-pointer min-w-[208px]">
                  View License Information
                </div>
              </div>

              <div className="flex gap-8">
                <div
                  className={`${
                    darkMode
                      ? "bg-[#1B1D1C] border-[#333333]"
                      : "bg-[#F1F1F1] border-[#CBCBCB]"
                  } rounded-[4px] flex flex-col gap-4 p-6 w-full border`}
                >
                  <div className="font-semibold">Attributes</div>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      // { label: "Clip ID", value: "6305646" },
                      {
                        label: "Resolution",
                        value:
                          video.videoWidth && video.videoHeight
                            ? `${video.videoWidth} × ${video.videoHeight}`
                            : "Unknown",
                      },
                      { label: "Clip ID", value: `${video._id}` },
                      {
                        label: "Length",
                        value: video.duration
                          ? `${video.duration} seconds`
                          : "Unknown",
                      },
                      // { label: "Looped", value: "No" },
                      // { label: "Video Encoding", value: "h.264" },
                      // { label: "Frame Rate", value: "25 fps" },
                      {
                        label: "File Size",
                        value: video.fileSizeInMB
                          ? `${parseFloat(video.fileSizeInMB).toFixed(2)} MB`
                          : "Unknown",
                      },
                      {
                        label: "Orientation",
                        value:
                          !video.videoWidth || !video.videoHeight
                            ? "Unknown"
                            : video.videoWidth > video.videoHeight
                            ? "Horizontal"
                            : video.videoWidth < video.videoHeight
                            ? "Vertical"
                            : "Square",
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex flex-col gap-2">
                        <span
                          className={`${
                            darkMode ? "text-[#AAAAAA]" : "text-[#666666]"
                          } text-[12px]`}
                        >
                          {item.label}
                        </span>
                        <span className="text-[13px] font-medium">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={`${
                    darkMode
                      ? "bg-[#1B1D1C] border-[#333333]"
                      : "bg-[#F1F1F1] border-[#CBCBCB]"
                  } rounded-[4px] flex flex-col gap-4 p-6 w-full max-w-[210px] border`}
                >
                  <div className="font-semibold">Attributes</div>

                  <div className="flex flex-col gap-2">
                    {["4K .mp4"].map((item, index) => (
                      <div
                        key={index}
                        className={
                          darkMode ? "text-sm text-[#AAAAAA]" : "text-sm"
                        }
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="font-semibold">Item Tags</div>

                <div className="flex flex-wrap gap-2">
                  {video?.tags.map((tag, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        navigate(`/search?term=${encodeURIComponent(tag)}`)
                      }
                      className={`
        px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ease-in-out
        cursor-pointer transform hover:-translate-y-0.5
        ${
          darkMode
            ? "bg-emerald-900/30 text-emerald-100 hover:bg-emerald-800/50 hover:shadow-lg hover:shadow-emerald-900/20"
            : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 hover:shadow-md hover:shadow-emerald-200/50"
        }
        active:scale-95 active:translate-y-0
      `}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between text-xl font-semibold mt-6">
              <div> Similar Clips </div> 

                <button
                            className="whitespace-nowrap hover:underline text-sm"

                >View More</button>


               
              </div>
              
              {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                <Skeleton
                  variant="rectangular"
                  height={200}
                  sx={darkMode ? { bgcolor: "grey.800" } : {}}
                />
                <Skeleton
                  variant="rectangular"
                  height={200}
                  sx={darkMode ? { bgcolor: "grey.800" } : {}}
                />
                <Skeleton
                  variant="rectangular"
                  height={200}
                  sx={darkMode ? { bgcolor: "grey.800" } : {}}
                />
              </div> */}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full content-start">
            {related?.length > 0 &&
              related?.map((video) => (
                <div key={video._id} className="aspect-[16/9]">
                  {" "}
                  {/* Adjust aspect ratio as needed */}
                  <Video video={video} />
                </div>
              ))}
          </div>

            </div>
          </div>
        </div>
      </div>

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
    </>
  );
};

export default VideoPage;
