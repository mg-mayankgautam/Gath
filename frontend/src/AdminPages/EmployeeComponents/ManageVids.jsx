import axios from 'axios';
import React from 'react'
import { useState,useEffect } from 'react';
import VideoPage from "../VideoPage";


const ManageVids = () => {
  const [videos, setVideos] = useState([]);
  const videosPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/videos/get?page=${currentPage}&limit=${videosPerPage}`
        );
        console.log(response.data);
        setVideos(response.data.videos);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.log("There was an error getting the videos!", error);
      }
    };

    getData();
  }, [currentPage, videosPerPage]);


      const [totalPages, setTotalPages] = useState(1); // New state for total pages
      const [selectedVideo, setSelectedVideo] = useState("");
      const [selectedVideoModal, setSelectedVideoModal] = useState(false);
    

    console.log(videos)
    return (
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


             

                {/* Pagination */}
                <div className="mt-10 flex justify-center items-center gap-4">
                    <div
                        className={`text-2xl font-semibold cursor-pointer ${currentPage === 1 && "opacity-30 pointer-events-none"
                            }`}
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    >
                        ‹
                    </div>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <div
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`w-10 h-10 flex items-center justify-center rounded-full text-sm cursor-pointer 
                ${currentPage === i + 1
                                    ? "bg-[var(--primary)] text-black"
                                    : "bg-transparent"
                                }`}
                        >
                            {i + 1}
                        </div>
                    ))}

                    <div
                        className={`text-2xl font-semibold cursor-pointer ${currentPage === totalPages && "opacity-30 pointer-events-none"
                            }`}
                        onClick={() =>
                            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                        }
                    >
                        ›
                    </div>
                </div>
            </div>

            {setSelectedVideo && selectedVideoModal && (
        <VideoPage setShowModal={setSelectedVideoModal} video={selectedVideo} />
      )}
        </div>
    )
}

export default ManageVids