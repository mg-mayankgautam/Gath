import axios from 'axios';
import React, { useState } from 'react'
import { toast, Toaster } from 'sonner'

const AdminDashboard = () => {

    const [file1, setFile1] = useState(null);
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState("");

    const handleFileChange = (e) => {
        setFile1(e.target.files[0]);
    };

    const handleTagInputChange = (e) => {
        setTagInput(e.target.value);
    };

    const handleAddTag = (e) => {
        if (e.key === "Enter" && tagInput.trim()) {
            setTags([...tags, tagInput.trim()]);
            setTagInput(""); // Clear input after adding tag
        }
    };

    const handleUpload = async () => {
        if (!file1 || tags.length === 0) {
            toast.error("Please select a video file and add at least one tag.");
            return;
        }

        const formData = new FormData();
        formData.append("video", file1);
        formData.append("tags", JSON.stringify(tags)); // Convert tags array to JSON string

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/videos/post`, formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            )

            if (response.data) {
                console.log("Upload successful:", response.data);
                toast.success("Video uploaded successfully!");
            }
            else {
                toast.error("Failed to upload video.");
            }
        } catch (error) {
            console.error("Upload failed:", error);
            toast.error("Failed to upload video.");
        }
    };


    return (
        <div className='bg-w h-full min-h-[calc(100vh-72px)]'>

            <div className='line'></div>

            <div className='bg-[#C9DBD2]'>
                <div className='max-w-[1400px] mx-auto p-10 flex justify-between items-center'>
                    <div className='text-2xl font-semibold'>Admin Dashboard</div>
                    <button className='greenButton'>Settings</button>
                </div>
            </div>

            {/* <div className='line'></div> */}

            <div className='p-10 bg-white h-full min-h-[calc(100vh-184px)]'>

                <div className="p-2 rounded-2xl h-full max-w-[700px] mx-auto flex flex-col gap-6">
                    <h2 className="text-2xl font-semibold mb-4">Upload Video</h2>

                    <div className="">
                        <label className="text-[var(--grey)]">Select Video</label>
                        <input
                            type="file"
                            accept="video/*"
                            onChange={handleFileChange}
                            className="mt-4 w-full input focus:outline-none focus:border-[var(--primary)]"
                        />
                    </div>

                    <div className="my-4">
                        <label className="text-[var(--grey)]">Add Tags (Press Enter)</label>
                        <input
                            type="text"
                            value={tagInput}
                            onChange={handleTagInputChange}
                            onKeyDown={handleAddTag}
                            placeholder="Enter a tag..."
                            className="mt-4 w-full input focus:outline-none focus:border-[var(--primary)]"
                        />


                        <div className="flex flex-wrap mt-4 gap-2">
                            {tags.map((tag, index) => (
                                <span key={index} className="lightGreenButton">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>


                    <button
                        onClick={handleUpload}
                        className="w-full greenButton"
                    >
                        Upload Video
                    </button>
                </div>
            </div>

            <Toaster richColors position='top-center' />

        </div>
    )
}

export default AdminDashboard