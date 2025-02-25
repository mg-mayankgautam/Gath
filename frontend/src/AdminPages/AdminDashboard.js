import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { FaTimes } from "react-icons/fa"; // Import the delete icon
import VideoPage from "./VideoPage";
import { Card, CardContent, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from "recharts";

const AdminDashboard = () => {
    const [file1, setFile1] = useState(null);
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState("");
    const [name, setName] = useState("");
    const [activeSection, setActiveSection] = useState("Dashboard");
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState('');
    const [selectedVideoModal, setSelectedVideoModal] = useState(false);

    const barChartData = [
        { name: "Page A", views: 400 },
        { name: "Page B", views: 300 },
        { name: "Page C", views: 200 },
        { name: "Page D", views: 278 },
        { name: "Page E", views: 189 },
    ];

    const pieChartData = [
        { name: "Group A", value: 400 },
        { name: "Group B", value: 300 },
        { name: "Group C", value: 300 },
        { name: "Group D", value: 200 },
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];


    const getVideos = async () => {
        try {
            const data = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/videos/get`)

            console.log(data.data);
            setVideos(data.data);
        }
        catch (error) { console.log('There was an error getting the videos!', error); }
    }

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

    const handleUpload = async () => {
        console.log(tags)

        if (!file1 || tags.length === 0 || !name) {
            toast.error("Please select a video file and add at least one tag.");
            return;
        }

        const formData = new FormData();
        formData.append("video", file1);
        formData.append("name", name);
        formData.append("tags", JSON.stringify(tags)); // Convert tags array to JSON string
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
        }
    };


    const handleDeleteTag = (index) => {
        const updatedTags = tags.filter((_, i) => i !== index); // Remove tag at the given index
        setTags(updatedTags);
    };

    const content = {
        Dashboard: <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Welcome Section */}
            <Card className="shadow-lg">
                <CardContent>
                    <Typography variant="h5" component="div">
                        Welcome to the Dashboard!
                    </Typography>
                    <Typography color="text.secondary">
                        Explore various analytics below.
                    </Typography>
                </CardContent>
            </Card>

            {/* Bar Chart Section */}
            <Card className="shadow-lg">
                <CardContent>
                    <Typography variant="h6" component="div">
                        Page Views Analytics
                    </Typography>
                    <BarChart
                        width={400}
                        height={300}
                        data={barChartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="views" fill="#8884d8" />
                    </BarChart>
                </CardContent>
            </Card>

            {/* Pie Chart Section */}
            <Card className="shadow-lg">
                <CardContent>
                    <Typography variant="h6" component="div">
                        User Group Distribution
                    </Typography>
                    <PieChart width={400} height={300}>
                        <Pie
                            data={pieChartData}
                            cx={200}
                            cy={150}
                            innerRadius={60}
                            outerRadius={100}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            label
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </CardContent>
            </Card>

            {/* Summary Section */}
            <Card className="shadow-lg">
                <CardContent>
                    <Typography variant="h6" component="div">
                        Summary
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Total Pages: 5
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Total Views: 1367
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Active Users: 120
                    </Typography>
                </CardContent>
            </Card>
        </div>,

        "Upload Video": (
            <div className="p-2 rounded-2xl h-full max-w-[700px] mx-auto flex flex-col gap-6">
                <h2 className="text-2xl font-semibold mb-4">Upload Video</h2>
                <div>
                    <label className="text-[var(--grey)]">Select Video</label>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setFile1(e.target.files[0])}
                        className="mt-4 w-full input focus:outline-none focus:border-[var(--primary)]"
                    />
                </div>
                <div className="my-4">
                    <label className="text-[var(--grey)]">Add Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter a name..."
                        className="mt-4 w-full input focus:outline-none focus:border-[var(--primary)]"
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
                        className="mt-4 w-full input focus:outline-none focus:border-[var(--primary)]"
                    />
                    <div className="flex gap-2 mt-2">
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
                <button onClick={handleUpload} className="w-full greenButton">
                    Upload Video
                </button>
            </div>
        ),

        "Manage Videos": (
            <div className="p-2 rounded-2xl h-full max-w-[700px] mx-auto flex flex-col gap-6">
                <h2 className="text-2xl font-semibold mb-4">Manage Videos</h2>

                <div className="flex flex-col gap-4">
                    {videos.length > 0 ? (
                        videos?.map((video) => (
                            <div key={video?._id}
                                className="flex items-center justify-between gap-4 p-4 border border-gray-300 rounded-lg"
                            >

                                <div className="flex items-center gap-4">

                                    <div className="w-auto h-20 bg-gray-200 rounded-[2px] overflow-hidden">
                                        <video
                                            src={video?.URL || "https://via.placeholder.com/80"}
                                            alt={video?.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="flex flex-col justify-between gap-2">
                                        <p className="font-semibold text-lg">{video?.name}</p>
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
                                    <button className="greenButton !py-2 !px-5 w-full !text-xs !bg-red-700 !text-white">Delete</button>
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
        Reports: <p>Reports section will be available soon.</p>,
        "User Management": <p>User Management tools will be here.</p>,
    };

    return (
        <div className="flex h-full min-h-[calc(100vh-72px)]">
            {/* Sidebar */}
            <div className="bg-[#2E3A46] text-white w-1/5 min-h-[calc(100vh-72px)] p-4">
                <h2 className="text-2xl font-semibold mb-6">Admin Panel</h2>
                <ul className="flex flex-col gap-4">
                    {Object.keys(content).map((section) => (
                        <li
                            key={section}
                            className={`cursor-pointer p-3 rounded-lg hover:bg-[#3C4A57] ${activeSection === section ? "bg-[#3C4A57]" : ""
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
                className="bg-white w-4/5 p-6 border-[6px] overflow-y-scroll h-full max-h-[calc(100vh-116px)] min-h-[calc(100vh-116px)] text-left"
                style={{ borderColor: "rgb(252, 231, 243)" }}
            >
                {content[activeSection]}
            </div>

            <Toaster />


            {setSelectedVideo && selectedVideoModal &&
                <VideoPage setShowModal={setSelectedVideoModal} video={selectedVideo} />
            }
        </div>
    );
};

export default AdminDashboard;
