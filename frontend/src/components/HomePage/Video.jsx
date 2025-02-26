import React, { useRef, useState } from 'react'
import VideoPage from '../VideoPage/VideoPage';
import icon1 from '../../assets/icons/icon1.svg'
import icon2 from '../../assets/icons/add2.svg'
import icon3 from '../../assets/icons/download3.svg'

const Video = ({ video }) => {
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


    const [showIndiVideoPageModal, setShowIndiVideoPageModal] = useState(false);

    return (
        <>
            <div
                className="relative group h-fit cursor-pointer" // `group` is used to enable hover effects on child elements
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
                    className="w-full h-auto"
                    loading="lazy"
                // controls={showControls}
                />

                {/* Hover Content */}
                <div className="absolute inset-1 md:inset-3 flex flex-col justify-between gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className='flex flex-col justify-self-start gap-1 cursor-pointer'>
                        <div className='text-[#fff] font-semibold'>
                            Name
                        </div>
                        <div className='text-[#fff] text-sm'>
                            user_name
                        </div>
                    </div>

                    <div className='flex gap-2 items-center justify-self-end justify-end'>
                        <div className='cursor-pointer'>
                            <img src={icon1} alt='wishlist' className='h-8 object-contain' />
                        </div>

                        <div className='cursor-pointer'>
                            <img src={icon2} alt='add' className='h-8 object-contain' />
                        </div>

                        <div className='cursor-pointer'>
                            <img src={icon3} alt='download' className='h-8 object-contain' />
                        </div>
                    </div>
                </div>
            </div>

            {showIndiVideoPageModal &&
                <VideoPage setShowModal={setShowIndiVideoPageModal} video={video} />
            }

        </>
    );
}

export default Video