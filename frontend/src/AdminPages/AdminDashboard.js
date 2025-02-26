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
    const [selectedVideo, setSelectedVideo] = useState("");
    const [selectedVideoModal, setSelectedVideoModal] = useState(false);
    console.log(videos);
    let topVideos = [];
    useEffect(() => {
         topVideos = [...videos].sort((a, b) => b.views - a.views).slice(0, 5);
    }, [videos])
    
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
            const data = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/videos/get`
            );
            setVideos(data.data);
        } catch (error) {
            console.error("There was an error getting the videos!", error);
        }
    };

    useEffect(() => {
        getVideos();
    }, []);

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
            setTagInput("");
        }
    };

    const handleUpload = async () => {
        if (!file1 || tags.length === 0 || !name) {
            toast.error("Please select a video file and add at least one tag.");
            return;
        }

        const formData = new FormData();
        formData.append("video", file1);
        formData.append("name", name);
        formData.append("tags", JSON.stringify(tags));

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/videos/post`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (response.data) {
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
        const updatedTags = tags.filter((_, i) => i !== index);
        setTags(updatedTags);
    };


    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("EMPLOYEE");

    const submitUser = async (e) => {
        e.preventDefault();

        if (!userId || !password || !role) {
            toast.error("Please fill in all fields.");
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/addemployee`, {
                userId,
                password,
                role,
            });

            if (response.status === 201) {
                toast.success("User added successfully!");
                // Clear fields after successful submission
                setUserId("");
                setPassword("");
                setRole("");
            } else {
                toast.error("Failed to add user. Please try again.");
            }
        } catch (error) {
            console.error("Error adding user:", error);
            toast.error("An error occurred while adding the user.");
        }
    };


    useEffect(() => {
        //http://localhost:4700/auth/getallemployees
    }, [])


    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // For the modal
    const [modalOpen, setModalOpen] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    // console.log(users)
    useEffect(() => {
        // Fetch all employees
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/getallemployees`);
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    // Change password API
    const handleChangePassword = async (_id) => {
        console.log(_id, newPassword)
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/change-password`, {
                _id,
                password: newPassword,
            });
            toast.success("Password updated successfully!");
            setModalOpen(false); // Close modal
        } catch (error) {
            console.error("Error changing password:", error);
            toast.error("Failed to update password.");
        }
    };

    // Delete user API
    const handleDeleteUser = async (userId) => {
        console.log(userId)
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/delete-user`, { userId });
            setUsers(users.filter((user) => user.id !== userId)); // Remove user from state
            toast.success("User deleted successfully!");
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Failed to delete user.");
        }
    };


    const content = {
        Dashboard: (
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Welcome Card */}
            <Card className="shadow-lg col-span-1 lg:col-span-2">
                <CardContent>
                    <Typography variant="h5" component="div">
                        Welcome to the Dashboard!
                    </Typography>
                    <Typography color="text.secondary">
                        Explore various analytics below.
                    </Typography>
                </CardContent>
            </Card>

            {/* Page Views Analytics */}
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

            {/* Top 5 Most Viewed Videos */}
            <Card className="shadow-lg">
                <CardContent>
                    <Typography variant="h6" component="div">
                        Top 5 Most Viewed Videos
                    </Typography>
                    <ul className="mt-4">
                        {topVideos.map((video, index) => (
                            <li key={video._id} className="mb-2">
                                <strong>{index + 1}. {video.name}</strong> - {video.views} views
                                <br />
                                <video src={video.previewURL} controls className="w-full mt-2" />
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            {/* Additional Analytics Section */}
            <Card className="shadow-lg">
                <CardContent>
                    <Typography variant="h6" component="div">
                        Additional Analytics
                    </Typography>
                    <Typography color="text.secondary" className="mt-4">
                        Coming soon: Detailed user engagement data.
                    </Typography>
                </CardContent>
            </Card>
        </div>
        ),
        "Add User": (
            <div className="p-2 rounded-2xl h-full max-w-[700px] mx-auto flex flex-col gap-6">
                <h2 className="text-xl font-semibold mb-4">Add User</h2>
                <form className="space-y-4" onSubmit={submitUser}>
                    <div className="flex flex-col">
                        <label htmlFor="userId" className="mb-2 text-sm font-medium">
                            User ID
                        </label>
                        <input
                            type="text"
                            id="userId"
                            className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter User ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="mb-2 text-sm font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {/* <div className="flex flex-col">
                        <label htmlFor="role" className="mb-2 text-sm font-medium">
                            Role
                        </label>
                        <select
                            id="role"
                            className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="">Select Role</option>
                            <option value="Admin">Admin</option>
                            <option value="Editor">Editor</option>
                            <option value="Viewer">Viewer</option>
                        </select>
                    </div> */}
                    <button
                        type="submit"
                        className="greenButton"
                    >
                        Add User
                    </button>
                </form>
            </div>
        ),
        "Manage Users": (
            <div className="p-2 rounded-2xl h-full max-w-[860px] mx-auto flex flex-col gap-6">
                <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 text-left">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 border-b text-center">#</th>
                                <th className="px-4 py-2 border-b">User ID</th>
                                <th className="px-4 py-2 border-b">Role</th>
                                <th className="px-4 py-2 border-b text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border-b text-center">{index + 1}</td>
                                    <td className="px-4 py-2 border-b">{user.id}</td>
                                    <td className="px-4 py-2 border-b">{user.role}</td>
                                    <td className="px-4 py-2 border-b text-center">
                                        <button
                                            className="greenButton !py-2 !px-5 w-full !text-xs mx-1"
                                            onClick={() => setSelectedUser(user)}
                                        >
                                            Change Password
                                        </button>
                                        <button
                                            className="greenButton !py-2 !px-5 w-full !text-xs !bg-red-700 !text-white"
                                            onClick={() => handleDeleteUser(user._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {selectedUser && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded shadow-lg w-96">
                            <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                            <p className="mb-4">User ID: {selectedUser.id}</p>
                            <input
                                type="password"
                                className="w-full p-2 border rounded mb-4 focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                                    onClick={() => setSelectedUser(null)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={() => handleChangePassword(selectedUser._id)}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        ),
    };

    return (
        <div className="flex h-full min-h-[calc(100vh-96px)]">

            {/* Sidebar */}
            <div className="bg-[#C9DBD2] w-1/5 min-h-[calc(100vh-96px)] p-8">
                <h2 className="text-2xl font-semibold mb-6">Super Admin</h2>
                <ul className="flex flex-col gap-4">
                    {Object.keys(content).map((section) => (
                        <li
                            key={section}
                            className={`cursor-pointer p-3 rounded-lg hover:bg-[#66B28D] ${activeSection === section ? "bg-[var(--primary)]" : ""
                                }`}
                            onClick={() => handleNavigate(section)}
                        >
                            {section}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content */}
            <div className="bg-white w-4/5 p-8 overflow-y-scroll">
                {content[activeSection]}
            </div>

            <Toaster position="top-center" richColors />

        </div>
    );
};

export default AdminDashboard;