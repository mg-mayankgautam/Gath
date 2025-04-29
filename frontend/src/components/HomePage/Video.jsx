import React, { useRef, useState } from 'react'
import VideoPage from '../VideoPage/VideoPage';
import icon1 from '../../assets/icons/icon1.svg'
import icon2 from '../../assets/icons/add2.svg'
import icon3 from '../../assets/icons/download3.svg'
import useAuth from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    const [showIndiVideoPageModal, setShowIndiVideoPageModal] = useState(false);
    const [activeModal, setActiveModal] = useState(null); // null | 'similar' | 'add' | 'download'

    const handleIconClick = (type) => {
        console.log(type)

        if(type=='add'){
            console.log(auth);

            if(!auth.role){
                console.log('no auth found')
                navigate('/subscribe');}
            else{
                setActiveModal('add');

            }
        }
        else{
            setActiveModal(type);
        }
    };

    const closeModal = () => setActiveModal(null);

    const saveVideo = async()=>{
        const token = auth.RawToken;

        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/save`, {  // Changed endpoint
            id:video._id
          },{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Replace with your actual token

            }
        });


//
       

        //
        console.log(video)
    }

    const renderModalContent = () => {
        if (!auth || Object.keys(auth).length === 0) {
            return (
                <>
                    <p className="text-sm">Please login to perform this action.</p>
                    <button className='greenButton'>Subscribe Now</button>
                </>);
        }

        switch (activeModal) {
            case "similar":
                return (
                    <>
                        <h2 className="text-lg font-semibold mb-4 capitalize">Show Similar Videos</h2>
                        {/* <p className="text-sm">Are you sure you want to add this video to your Collection?</p> */}
                        <button className="greenButton">Show</button>
                    </>
                );
            case "add":
                return (
                    <>
                        <h2 className="text-lg font-semibold mb-4 capitalize">Add to Collection</h2>
                        <p className="text-sm">Are you sure you want to add this video to your Collection?</p>
                        <button className="greenButton"
                        onClick={()=>saveVideo()}
                        >Add</button>
                    </>
                );
            case "download":
                return (
                    <>
                        <h2 className="text-lg font-semibold mb-4 capitalize">Download</h2>
                        <p className="text-sm">Click below to download the video:</p>
                        {/* <a href={video?.previewURL} download> */}
                        <button className='greenButton'>
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
                    <div className='flex flex-col justify-self-start gap-1 cursor-pointer'>
                        <div className='text-[#fff] font-semibold'>
                            Name
                        </div>
                        <div className='text-[#fff] text-sm'>
                            user_name
                        </div>
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
                            >
                                <img src={icon} alt={label} className="h-8 object-contain peer"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent click from bubbling up to parent
                                        handleIconClick(type);
                                    }}
                                />
                                {/* Hover Label */}
                                <span className={`absolute -top-6 whitespace-nowrap text-[11px] ${darkMode ? "bg-[#1B1D1C] text-white" : "bg-white text-gray-700"} opacity-0 peer-hover:opacity-100 transition px-2 py-1 rounded shadow absolute`}>
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {showIndiVideoPageModal &&
                <VideoPage setShowModal={setShowIndiVideoPageModal} video={video} />
            }

            {/* Modal */}
            {activeModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 z-40 flex items-center justify-center" onClick={closeModal}>
                    <div
                        className={`${darkMode ? 'bg-[#1B1D1C] border-[#333333]' : 'bg-[#F1F1F1] border-[#CBCBCB]'} border rounded-xl p-6 w-[90%] max-w-sm z-50 shadow-lg flex flex-col items-center gap-6 text-center`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {renderModalContent()}
                        
                    </div>
                </div>
            )}

        </>
    );
}

export default Video