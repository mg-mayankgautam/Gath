import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { FaTimes } from "react-icons/fa"; // Import the delete icon
import VideoPage from "./VideoPage";
import { useTheme } from "../context/ThemeProvider";

const EmployeeDashboard = () => {
  const [file1, setFile1] = useState(null);
  const [tags, setTags] = useState([]);
  const [theme, setTheme] = useState([]);
  const [shot, setShot] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [shotInput, setShotInput] = useState("");
  const [themeInput, setThemeInput] = useState("");
  const [name, setName] = useState("");
  const [activeSection, setActiveSection] = useState("Upload Video");
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [selectedVideoModal, setSelectedVideoModal] = useState(false);
  const { darkMode } = useTheme();
  const [isUploading, setIsUploading] = useState(false);

  const [shotOnMobile, setShotOnMobile] = useState(false); // true/false/null

  const getVideos = async () => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/videos/get`
      );

      console.log(data.data);
      setVideos(data.data);
    } catch (error) {
      console.log("There was an error getting the videos!", error);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  // Fetch videos again when modal closes
  useEffect(() => {
    if (!selectedVideoModal) {
      getVideos();
    }
  }, [selectedVideoModal]);

  const handleNavigate = (section) => {
    setActiveSection(section);
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput(""); // Clear input after adding tag
    }
  };

  const handleAddTheme = (e) => {
    if (e.key === "Enter" && themeInput.trim()) {
      setTheme([...theme, themeInput.trim()]);
      setThemeInput(""); // Clear input after adding tag
    }
  };


  const handleAddShot = (e) => {
    if (e.key === "Enter" && shotInput.trim()) {
        setShot([...shot, shotInput.trim()]);
      setShotInput(""); // Clear input after adding tag
    }
  };
  

  const handleUpload = async () => {
    console.log(tags);

    if (!file1 || tags.length === 0 || !name) {
      toast.error("Please select a video file and add at least one tag.");
      return;
    }

    setIsUploading(true); // Show loader

    const formData = new FormData();
    formData.append("video", file1);
    formData.append("name", name);
    formData.append("tags", JSON.stringify(tags)); // Convert tags array to JSON string
    formData.append("themes", JSON.stringify(theme)); // Convert tags array to JSON string
    formData.append("shots", JSON.stringify(shot)); // Convert tags array to JSON string
    formData.append("shotonmobile", shotOnMobile); // Convert tags array to JSON string


    // Extract additional file information
    formData.append("fileSize", file1.size);
    formData.append("fileType", file1.type);

    // Extract video metadata (duration, width, height)
    const videoURL = URL.createObjectURL(file1);
    const videoElement = document.createElement("video");

    videoElement.addEventListener("loadedmetadata", async () => {
      console.log("inside event listener");
      formData.append("duration", videoElement.duration);
      formData.append("videoWidth", videoElement.videoWidth);
      formData.append("videoHeight", videoElement.videoHeight);
      URL.revokeObjectURL(videoURL); // Clean up

      if (!shotOnMobile) {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/videos/post`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );

          if (response.data) {
            console.log("Upload successful:", response.data);
            toast.success("Video uploaded successfully!");
            setFile1(null);
            setTags([]);
            setTagInput("");
            setName("");
          } else {
            toast.error("Failed to upload video.");
          }
        } catch (error) {
          console.error("Upload failed:", error);
          toast.error("Failed to upload video.");
        } finally {
          setIsUploading(false); // Hide loader
        }
      }
      
      else {


            console.log("this video is shot on mobile, different upload route");
            try {
                const response = await axios.post(
                  `${process.env.REACT_APP_BACKEND_URL}/videos/postmobilevideo`,
                  formData,
                  { headers: { "Content-Type": "multipart/form-data" } }
                );
            
                if (response.data) {
                  console.log("Upload successful:", response.data);
                  toast.success("Video uploaded successfully!");
                  setFile1(null);
                  setTags([]);
                  setTagInput("");
                  setName("");
                } else {
                  toast.error("Failed to upload video.");
                }
              } catch (error) {
                console.error("Upload failed:", error);
                toast.error("Failed to upload video.");
              } finally {
                setIsUploading(false); // Hide loader
              }
      } 
    });

    // Fallback in case metadata doesn't load quickly
    videoElement.onerror = () => {
      URL.revokeObjectURL(videoURL);
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/videos/post`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          if (response.data) {
            toast.success(
              "Video uploaded successfully (metadata could not be extracted)."
            );
            setFile1(null);
            setTags([]);
            setTagInput("");
            setName("");
          } else {
            toast.error("Failed to upload video.");
          }
        })
        .catch((error) => {
          console.error("Upload failed:", error);
          toast.error("Failed to upload video.");
        })
        .finally(() => {
          setIsUploading(false); // Ensure loader is hidden even on error
        });
    };

    videoElement.src = videoURL;
  };

  const handleDeleteTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index); // Remove tag at the given index
    setTags(updatedTags);
  };
  const handleDeleteTheme = (index) => {
    const updatedTheme = theme.filter((_, i) => i !== index); // Remove tag at the given index
    setTheme(updatedTheme);
  };

  const handleDeleteShot = (index)=>{
    const updatedshot = shot.filter((_, i) => i !== index); // Remove tag at the given index
    setShot(updatedshot);

  }

  const handleVideoUpload = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile && selectedFile.type.startsWith("video/")) {
      setFile1(selectedFile);
      extractKeywordsFromFilename(selectedFile.name);
    } else {
      alert("Please select a valid video file.");
      // Optionally clear the file input
      event.target.value = "";
      setFile1(null);
    }
  };

  const predefinedThemes = ["food", "indian", "nature","vintage","rural","festival"];
  const predefinedShots = ["close-up", "Aerial","pan-shot"];

  const extractKeywordsFromFilename = (filename) => {
    // Remove the file extension (e.g., .mp4, .mov)
    const nameWithoutExtension = filename.substring(
      0,
      filename.lastIndexOf(".")
    );
    setName(nameWithoutExtension);

    // Split the filename by underscores to get potential keywords
    // const keywords = nameWithoutExtension.split('_').map(keyword => keyword.trim()).filter(keyword => keyword !== '');
    const keywords = nameWithoutExtension
      .split("_")
      .map((keyword) => keyword.trim().toLowerCase())
      .filter((keyword) => keyword !== "");

    // const predefinedThemes = [
    //     "food"
    // ];

    // Find matching themes (case-insensitive check)
    const themes = predefinedThemes.filter((theme) =>
      keywords.some((keyword) => keyword.toLowerCase() === theme.toLowerCase())
    );

    const shot_type = predefinedShots.filter((shot) =>
        keywords.some((keyword) => keyword.toLowerCase() === shot.toLowerCase())
      );
  
    setShot(shot_type);

    setShotOnMobile(keywords.includes("shot-on-mobile"));

    setTheme(themes);
    // Update the tags state with the extracted keywords
    setTags(keywords);
  };

  const content = {
    // Dashboard:
    //     <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
    //         {/* Welcome Section */}
    //         <Card className="shadow-lg">
    //             <CardContent>
    //                 <Typography variant="h5" component="div">
    //                     Welcome to the Dashboard!
    //                 </Typography>
    //                 <Typography color="text.secondary">
    //                     Explore various analytics below.
    //                 </Typography>
    //             </CardContent>
    //         </Card>

    //         {/* Bar Chart Section */}
    //         <Card className="shadow-lg">
    //             <CardContent>
    //                 <Typography variant="h6" component="div">
    //                     Page Views Analytics
    //                 </Typography>
    //                 <BarChart
    //                     width={400}
    //                     height={300}
    //                     data={barChartData}
    //                     margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    //                 >
    //                     <CartesianGrid strokeDasharray="3 3" />
    //                     <XAxis dataKey="name" />
    //                     <YAxis />
    //                     <Tooltip />
    //                     <Bar dataKey="views" fill="#8884d8" />
    //                 </BarChart>
    //             </CardContent>
    //         </Card>

    //         {/* Pie Chart Section */}
    //         <Card className="shadow-lg">
    //             <CardContent>
    //                 <Typography variant="h6" component="div">
    //                     User Group Distribution
    //                 </Typography>
    //                 <PieChart width={400} height={300}>
    //                     <Pie
    //                         data={pieChartData}
    //                         cx={200}
    //                         cy={150}
    //                         innerRadius={60}
    //                         outerRadius={100}
    //                         fill="#8884d8"
    //                         paddingAngle={5}
    //                         dataKey="value"
    //                         label
    //                     >
    //                         {pieChartData.map((entry, index) => (
    //                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    //                         ))}
    //                     </Pie>
    //                 </PieChart>
    //             </CardContent>
    //         </Card>

    //         {/* Summary Section */}
    //         <Card className="shadow-lg">
    //             <CardContent>
    //                 <Typography variant="h6" component="div">
    //                     Summary
    //                 </Typography>
    //                 <Typography variant="body2" color="text.secondary">
    //                     Total Pages: 5
    //                 </Typography>
    //                 <Typography variant="body2" color="text.secondary">
    //                     Total Views: 1367
    //                 </Typography>
    //                 <Typography variant="body2" color="text.secondary">
    //                     Active Users: 120
    //                 </Typography>
    //             </CardContent>
    //         </Card>
    //     </div>,

    "Upload Video": (
      <div className="p-2 rounded-2xl h-full max-w-[700px] mx-auto flex flex-col gap-6">
        <h2 className="text-2xl font-semibold mb-4">Upload Video</h2>
        <div>
          <label className="text-[var(--grey)]">Select Video</label>
          <input
            type="file"
            accept="video/*"
            // onChange={(e) => setFile1(e.target.files[0])}
            onChange={handleVideoUpload}
            className={`mt-4 w-full input ${
              darkMode && "dark"
            } focus:outline-none focus:border-[var(--primary)]`}
          />
        </div>
        <div className="my-4">
          <label className="text-[var(--grey)]">Add Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name..."
            className={`mt-4 w-full input ${
              darkMode && "dark"
            } focus:outline-none focus:border-[var(--primary)]`}
          />
        </div>
        <div className="my-4">
          <label className="text-[var(--grey)]">Add Tags (Press Enter)</label>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Enter a tag..."
            className={`mt-4 w-full input ${
              darkMode && "dark"
            } focus:outline-none focus:border-[var(--primary)]`}
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="lightGreenButton flex items-center gap-1 px-2 py-1 rounded-full"
              >
                {tag}
                <FaTimes
                  className="cursor-pointer text-red-500"
                  onClick={() => handleDeleteTag(index)} // Handle delete on click
                />
              </span>
            ))}
          </div>
        </div>

        <div className="my-4">
          <label className="text-[var(--grey)]">Add Video Theme</label>
          <select
            value={themeInput}
            onChange={(e) => setThemeInput(e.target.value)}
            onKeyDown={handleAddTheme}
            className={`mt-4 w-full input ${
              darkMode && "dark"
            } focus:outline-none focus:border-[var(--primary)]`}
          >
            <option value="">Select a theme...</option>
            {predefinedThemes.map((theme, index) => (
              <option key={index} value={theme}>
                {theme}
              </option>
            ))}
          </select>

          <div className="flex flex-wrap gap-2 mt-2">
            {theme.map((theme, index) => (
              <span
                key={index}
                className="lightGreenButton flex items-center gap-1 px-2 py-1 rounded-full"
              >
                {theme}
                <FaTimes
                  className="cursor-pointer text-red-500"
                  onClick={() => handleDeleteTheme(index)} // Handle delete on click
                />
              </span>
            ))}
          </div>
        </div>


        {/* shot input below */}

        <div className="my-4">
          <label className="text-[var(--grey)]">Add shot type</label>
          <select
            value={shotInput}
            onChange={(e) => setShotInput(e.target.value)}
            onKeyDown={handleAddShot}
            className={`mt-4 w-full input ${
              darkMode && "dark"
            } focus:outline-none focus:border-[var(--primary)]`}
          >
            <option value="">Select a Shot...</option>
            {predefinedShots.map((shot, index) => (
              <option key={index} value={shot}>
                {shot}
              </option>
            ))}
          </select>

          <div className="flex flex-wrap gap-2 mt-2">
            {shot.map((shot, index) => (
              <span
                key={index}
                className="lightGreenButton flex items-center gap-1 px-2 py-1 rounded-full"
              >
                {shot}
                <FaTimes
                  className="cursor-pointer text-red-500"
                  onClick={() => handleDeleteShot(index)} // Handle delete on click
                />
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <label className="text-[var(--grey)]">Shot on Mobile?</label>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="shotOnMobile"
                value="yes"
                checked={shotOnMobile === true}
                onChange={() => setShotOnMobile(true)}
                className="h-4 w-4"
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="shotOnMobile"
                value="no"
                checked={shotOnMobile === false}
                onChange={() => setShotOnMobile(false)}
                className="h-4 w-4"
              />
              <span>No</span>
            </label>
          </div>
        </div>
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className="w-full greenButton"
        >
          Upload Video
        </button>
      </div>
    ),

    "Manage Videos": (
      <div className="p-2 rounded-2xl h-full mx-auto flex flex-col gap-6">
        <h2 className="text-2xl font-semibold mb-4">Manage Videos</h2>

        <div className="flex flex-col gap-4">
          {videos.length > 0 ? (
            videos?.map((video) => (
              <div
                key={video?._id}
                className="flex items-center justify-between gap-4 p-4 border border-gray-300 rounded-lg"
              >
                <div className="grid grid-cols-[130px_auto] gap-4">
                  <div className="!w-full w-auto h-20 bg-gray-200 rounded-[2px] overflow-hidden">
                    <video
                      src={
                        video?.previewURL || "https://via.placeholder.com/80"
                      }
                      alt={video?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-between gap-2">
                    <p className="font-semibold text-lg break-all">
                      {video?.name}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {video?.tags?.map((tag, index) => (
                        <span key={index} className="lightGreenButton">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 flex-col">
                  <button
                    className="greenButton !py-2 !px-5 !text-xs !w-full"
                    onClick={() => {
                      setSelectedVideo(video);
                      setSelectedVideoModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button className="greenButton !py-2 !px-5 w-full !text-xs !bg-red-700 !text-white">
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No videos available</p>
          )}
        </div>
      </div>
    ),

    Settings: <p>Settings content will appear here.</p>,
  };

  return (
    <div className="flex h-full min-h-[calc(100vh-96px)]">
      {/* Sidebar */}
      <div className="bg-[#C9DBD2] text-black w-1/5 min-h-[calc(100vh-96px)] p-8">
        <h2 className="text-2xl font-semibold mb-6">Employee</h2>
        <ul className="flex flex-col gap-4">
          {Object.keys(content).map((section) => (
            <li
              key={section}
              className={`cursor-pointer p-3 rounded-lg hover:bg-[var(--primary)] ${
                activeSection === section ? "bg-[var(--primary)]" : ""
              }`}
              onClick={() => handleNavigate(section)}
            >
              {section}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div
        className={`${
          darkMode ? "" : "bg-white"
        } w-4/5 p-8 overflow-y-scroll h-full max-h-[calc(100vh-96px)] min-h-[calc(100vh-96px)] text-left`}
      >
        {content[activeSection]}
      </div>

      <Toaster position="top-center" richColors />

      {setSelectedVideo && selectedVideoModal && (
        <VideoPage setShowModal={setSelectedVideoModal} video={selectedVideo} />
      )}

      {isUploading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div
            className={`${
              darkMode ? "bg-black" : "bg-white"
            } p-6 rounded-lg shadow-lg text-center max-w-[500px] w-full flex flex-col gap-6 items-center border border-[#333333]`}
          >
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[var(--primary)]"></div>
            <div className="text-sm">
              Please don’t close or refresh this window while your video is
              uploading. It might take a few minutes depending on file size and
              network speed.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
