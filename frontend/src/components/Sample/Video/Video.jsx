import React, { useRef, useState } from 'react'
import { IoBookmarksOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import './Video.css'

const Video = ({ src }) => {
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


    return (
        <div
            className="relative group h-fit" // `group` is used to enable hover effects on child elements
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Video */}
            <video
                ref={videoRef}
                src={src}
                muted
                loop
                className="w-full h-auto"
                loading="lazy"
                // controls={showControls}
            />

            {/* Hover Content */}
            <div className="absolute inset-1 md:inset-3 flex flex-col items-end justify-between gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white rounded-md px-2 py-1 flex justify-start items-center gap-2 shadow cursor-pointer">
                    <IoBookmarksOutline />
                </div>
                <button className="vidSaveBtn shadow flex items-center gap-2">
                    <MdOutlineFileDownload size={20} />
                    Save
                </button>
            </div>
        </div>
    );
}

export default Video