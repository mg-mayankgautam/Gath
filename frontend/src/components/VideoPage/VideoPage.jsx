import React, { useEffect } from 'react'
import cross from '../../assets/icons/cross.svg'
import wishlist from '../../assets/icons/wishlist.svg'
import add from '../../assets/icons/add.svg'
import share from '../../assets/icons/share.svg'
import download from '../../assets/icons/download.svg'
import profile from '../../assets/sampleprofile.png'
import { Skeleton } from '@mui/material';



const VideoPage = ({ setShowModal, video }) => {

  console.log(video)

  // Disable background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Stop scrolling

    return () => {
      document.body.style.overflow = "auto"; // Restore scrolling
    };
  }, []);

  return (

    <div className='bg-[#121212CC] h-screen fixed inset-0 z-50 modalOverflow'>

      <div className='bigscreen py-16 px-20'>

        <div className='w-full bg-[#ECECEC] rounded-[8px] border border-[#CBCBCB]'>

          <div className='bg-[#C9DBD2] flex items-center justify-between pl-8 pr-2 py-2 text-[#222222] text-xs rounded-tl-[8px] rounded-tr-[8px]'>
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
                <div className='text-[#666666] text-sm'>
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
                <img src={wishlist} alt='wishlist' className='h-8 object-contain' />
              </div>

              <div className='cursor-pointer'>
                <img src={add} alt='add' className='h-8 object-contain' />
              </div>

              <div className='cursor-pointer'>
                <img src={share} alt='download' className='h-8 object-contain' />
              </div>
            </div>

          </div>

          <div className='line'></div>


          <div className='flex flex-col gap-8 px-8 py-8'>

            <div
              className="h-full"
            >
              <video
                // ref={videoRef}
                src={video?.URL}
                muted
                loop
                className="w-full h-auto rounded-[8px]"
                loading="lazy"
                controls={true}
              />

            </div>

            <div className='flex justify-between items-center'>
              <div className='text-xl font-semibold'>
                Asset Example
              </div>
              <div className='underline text-large cursor-pointer'>
                View License Information
              </div>
            </div>


            <div className='flex gap-8'>

              <div className='bg-[#F1F1F1] border border-[#CBCBCB] rounded-[4px] flex flex-col gap-4 p-6 w-full'>
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
                      <span className="text-[#666666] text-[12px]">{item.label}</span>
                      <span className="text-[13px] font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>

              </div>


              <div className='bg-[#F1F1F1] border border-[#CBCBCB] rounded-[4px] flex flex-col gap-4 p-6 w-full max-w-[210px]'>
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
                    <div key={index} className="text-sm">
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
                  <div key={index} className='lightGreenButton'>
                    {tag}
                  </div>
                ))}
              </div>

            </div>


            <div className='text-xl font-semibold mt-6'>
              Similar Clips (not available yet)
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              <Skeleton variant="rectangular" height={200} />
              <Skeleton variant="rectangular" height={200} />
              <Skeleton variant="rectangular" height={200} />

            </div>


          </div>


        </div>

      </div>

    </div>
  )
}

export default VideoPage