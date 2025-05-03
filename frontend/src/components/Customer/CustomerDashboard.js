import React, { useEffect, useState } from "react";
import profile from "../../assets/sampleprofile.png";
import { useTheme } from "../../context/ThemeProvider";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";

const CustomerDashboard = () => {
  const { auth } = useAuth();
  // console.log(auth);
  const [savedViewMode, setSavedViewMode] = useState("grid"); // 'grid' or 'list'

  const [savedClips, setSavedClips] = useState([]);

  const { darkMode } = useTheme();

  const [activeTab, setActiveTab] = useState("downloads");

  useEffect(() => {
    const getsavedVideos = async () => {
      const token = auth?.RawToken;

      if (!token) {
        console.warn("No auth token found. Aborting request.");
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/user/getsavedvideos`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSavedClips(response.data.savedVideos);
      } catch (error) {
        console.error("Error fetching saved videos:", error?.response || error);
      }
    };

    getsavedVideos();
  }, [auth]);

  const handleRemoveSaved = async (clipId) => {
    try {
      const token = auth.RawToken;

      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/removesaved`,
        { clipId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSavedClips((prev) => prev.filter((clip) => clip._id !== clipId));
    } catch (error) {
      console.error("Failed to remove clip from saved:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="bigscreen p-10 flex items-center w-full justify-between">
        <div className="flex gap-6 h-20">
          <div className="h-full w-20">
            <img
              src={profile}
              alt="profile"
              className="h-full w-full object-cover rounded-lg"
            />
          </div>

          <div className="flex flex-col justify-center gap-2">
            <div className="font-semibold text-2xl">Name</div>
            <div className="text-[var(--grey)] text-xl">{auth.username}</div>
          </div>
        </div>

        <button className="greenButton flex gap-2">
          {/* <img src={} alt='download' className='h-full object-contain'/> */}
          Edit Profile
        </button>
      </div>

      <div className={darkMode ? "line !bg-[#3D413E]" : "line"}></div>

      <div className="bigscreen p-10 mt-2">
        <div className="flex">
          {[
            { id: "downloads", label: "Download History" },
            { id: "purchased", label: "Purchased Videos" },
            { id: "saved", label: "Saved Clips" },
          ].map((tab) => (
            <div
              key={tab.id}
              className={`py-2 px-4 font-medium focus:outline-none border-b-2 cursor-pointer transition-all duration-250 ease-in-out ${
                activeTab === tab.id
                  ? "text-[var(--primary)] border-[var(--primary)]"
                  : "text-[var(--grey)] hover:text-white border-transparent"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </div>
          ))}
        </div>

        {/* Tab Content */}
        {/* Tab Content */}
        <div className="py-10">
          {activeTab === "downloads" && <p>No downloads yet</p>}

          {activeTab === "collections" && <p>No collections yet</p>}

          {activeTab === "saved" && (
            <>
              <div className="flex justify-end mb-4 gap-2">
                <button
                  className={`${
                    savedViewMode === "grid" ? "greenButton" : "button"
                  }`}
                  onClick={() => setSavedViewMode("grid")}
                >
                  Grid View
                </button>
                <button
                  className={`px-4 py-2 rounded border ${
                    savedViewMode === "list" ? "greenButton" : "button"
                  }`}
                  onClick={() => setSavedViewMode("list")}
                >
                  List View
                </button>
              </div>

              {savedViewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedClips.map((clip) => (
                    <div
                      key={clip._id}
                      className={`border ${
                        darkMode
                          ? "bg-[#1B1D1C] border-[#333333]"
                          : "bg-[#F1F1F1] border-[#CBCBCB]"
                      }`}
                    >
                      <div className="aspect-video overflow-hidden">
                        <video
                          src={clip.previewURL}
                          className="w-full h-full object-cover"
                          muted
                          loop
                          preload="metadata"
                          controls
                        />
                      </div>
                      <div className="p-4 flex flex-col">
                        <h3 className="font-semibold mb-1 truncate">
                          {clip.name}
                        </h3>
                        <div className="text-xs text-[var(--grey)]">
                          Duration: {clip.duration}s • Size:{" "}
                          {parseFloat(clip.fileSizeInMB).toFixed(1)} MB
                        </div>
                        <button
                          className="text-xl text-right self-end"
                          onClick={() => handleRemoveSaved(clip._id)}
                        >
                          <MdDeleteForever />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  {savedClips.map((clip) => (
                    <div
                      key={clip._id}
                      className={`grid grid-cols-[200px_1fr] border ${
                        darkMode
                          ? "bg-[#1B1D1C] border-[#333333]"
                          : "bg-[#F1F1F1] border-[#CBCBCB]"
                      }`}
                    >
                      <div className="w-full h-full max-w-full aspect-video overflow-hidden">
                        <video
                          src={clip.previewURL}
                          className="w-full h-full object-cover"
                          muted
                          loop
                          preload="metadata"
                          controls
                        />
                      </div>
                      <div className="p-4 flex flex-col">
                        <h3 className="font-semibold mb-1 break-all max-h-[24px] overflow-hidden">
                          {clip.name}
                        </h3>
                        <div className="text-xs text-[var(--grey)]">
                          Duration: {clip.duration}s • Size:{" "}
                          {parseFloat(clip.fileSizeInMB).toFixed(1)} MB
                        </div>
                        <button
                          className="text-xl text-right self-end"
                          onClick={() => handleRemoveSaved(clip._id)}
                        >
                          <MdDeleteForever />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
