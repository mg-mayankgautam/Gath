import React, { useEffect } from 'react'
import cross from '../../assets/icons/cross.svg'
import wishlist from '../../assets/icons/wishlist.svg'
import wishlistwhite from '../../assets/icons/wishlistwhite.svg'
import add from '../../assets/icons/add.svg'
import addwhite from '../../assets/icons/addwhite.svg'
import share from '../../assets/icons/share.svg'
import sharewhite from '../../assets/icons/sharewhite.svg'
import download from '../../assets/icons/download.svg'
import profile from '../../assets/sampleprofile.png'
import { Skeleton } from '@mui/material';
import axios from 'axios'
import { useTheme } from '../../context/ThemeProvider'


const VideoPage = ({ setShowModal, video }) => {

  console.log(video)
  const { darkMode } = useTheme();

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


  return (

    <div className='bg-[#121212CC] h-screen fixed inset-0 z-50 modalOverflow'>

      <div className='bigscreen py-16 px-20'>

        <div className={`w-full ${darkMode ? 'bg-[#080E0B] border-[#1E1E1E]' : 'bg-[#ECECEC] border-[#CBCBCB]'} rounded-[8px] border`}>

          <div className={`flex items-center justify-between pl-8 pr-2 py-2 text-xs rounded-tl-[8px] rounded-tr-[8px] ${darkMode ? 'bg-[#10130D] text-[#888888]' : 'bg-[#C9DBD2] text-[#222222]'} `}>
            <div>
              All Items &gt; Stock Video &gt; Motion Graphics &gt; Asset 1
            </div>

            <div className='cursor-pointer h-full' onClick={() => setShowModal(false)}>
              <img src={cross} alt='close' className='h-full object-contain' />
            </div>
          </div>

          <div className='px-8 py-4 mt-2 flex items-center justify-between'>

            <div className='flex gap-6 h-10'>

              <div className='h-full w-10'>
                <img src={profile} alt='profile' className='h-full w-full object-cover rounded-lg' />
              </div>

              <div className='flex flex-col justify-between'>
                <div className='font-semibold'>
                  Name
                </div>
                <div className='text-[var(--grey)] text-sm'>
                  user_name
                </div>
              </div>

            </div>


            <div className='flex gap-6 items-center'>

              <button className='greenButton flex gap-2 text-xs'>
                <img src={download} alt='download' className='h-full object-contain' />
                Download
              </button>

              <div className='cursor-pointer'>
                <img src={darkMode? wishlistwhite : wishlist} alt='wishlist' className={`h-8 object-contain`} />
              </div>

              <div className='cursor-pointer'>
                <img src={darkMode? addwhite : add} alt='add' className={`h-8 object-contain`} />
              </div>

              <div className='cursor-pointer'>
                <img src={darkMode? sharewhite : share} alt='download' className={`h-8 object-contain`} />
              </div>
            </div>

          </div>

          <div className={darkMode ? 'line !bg-[#3D413E]' : 'line'}></div>


          <div className='flex flex-col gap-8 px-8 py-8'>

            <div
              className="h-full"
            >
              <video
                // ref={videoRef}
                src={video?.previewURL}
                muted
                loop
                className="w-full h-auto rounded-[8px]"
                loading="lazy"
                controls={true}
              />

            </div>

            <div className='flex justify-between items-center'>
              <div className='text-xl font-semibold'>
                {video?.name}
              </div>
              <div className='underline text-[var(--grey)] text-large cursor-pointer'>
                View License Information
              </div>
            </div>


            <div className='flex gap-8'>

              <div className={`${darkMode? 'bg-[#1B1D1C] border-[#333333]' : 'bg-[#F1F1F1] border-[#CBCBCB]'} rounded-[4px] flex flex-col gap-4 p-6 w-full border`}>
                <div className='font-semibold'>
                  Attributes
                </div>

                <div className='grid grid-cols-3 gap-2'>
                  {[
                    { label: "Clip ID", value: "6305646" },
                    { label: "Resolution", value: "4448 × 3096" },
                    { label: "Clip ID", value: "6305646" },
                    { label: "Alpha Channel", value: "No" },
                    { label: "Looped", value: "No" },
                    { label: "Video Encoding", value: "h.264" },
                    { label: "Frame Rate", value: "25 fps" },
                    { label: "File Size", value: "111 MB" },
                    { label: "Orientation", value: "Horizontal" },
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col gap-2">
                      <span className={`${darkMode? 'text-[#AAAAAA]':'text-[#666666]'} text-[12px]`}>{item.label}</span>
                      <span className="text-[13px] font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>

              </div>


              <div className={`${darkMode? 'bg-[#1B1D1C] border-[#333333]' : 'bg-[#F1F1F1] border-[#CBCBCB]'} rounded-[4px] flex flex-col gap-4 p-6 w-full max-w-[210px] border`}>
                <div className='font-semibold'>
                  Attributes
                </div>

                <div className='flex flex-col gap-2'>
                  {[
                    "HD .mp4",
                    "4K .mp4",
                    "4K HQ .mov",
                    "LOG .mov",
                  ].map((item, index) => (
                    <div key={index} className={darkMode? "text-sm text-[#AAAAAA]":"text-sm"}>
                      {item}
                    </div>
                  ))}
                </div>

              </div>

            </div>


            <div className='flex flex-col gap-4'>
              <div className='font-semibold'>
                Item Tags
              </div>

              <div className='flex flex-wrap gap-4'>
                {video?.tags.map((tag, index) => (
                  <div key={index} className={darkMode? 'lightGreenButton dark' :'lightGreenButton'}>
                    {tag}
                  </div>
                ))}
              </div>

            </div>


            <div className='text-xl font-semibold mt-6'>
              Similar Clips (not available yet)
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              <Skeleton variant="rectangular" height={200} 
                sx={darkMode ? { bgcolor: 'grey.800' } : {}} />
              <Skeleton variant="rectangular" height={200} 
                sx={darkMode ? { bgcolor: 'grey.800' } : {}} />
              <Skeleton variant="rectangular" height={200} 
                sx={darkMode ? { bgcolor: 'grey.800' } : {}} />

            </div>


          </div>


        </div>

      </div>

    </div>
  )
}

export default VideoPage