import React, { useEffect, useState } from 'react'
import cross from '../assets/icons/cross.svg'
import axios from 'axios'
import { toast, Toaster } from 'sonner'


const VideoPage = ({ setShowModal, video }) => {

  console.log(video)

  useEffect(() => {

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);


  // State for name and tags
  const [name, setName] = useState(video?.name || "");
  const [tags, setTags] = useState(video?.tags || []);
  const [newTag, setNewTag] = useState(""); // To input new tag
  const [isEditing, setIsEditing] = useState(false);

  // Add new tag
  const handleAddTag = () => {
    if (newTag.trim() !== "") {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  // Remove a tag
  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  // Save changes and send to backend
  const handleSave = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/videos/editinfo`,
        { _id: video._id, name, tags }
      );
      if (response.status === 200) {
        setIsEditing(false); // Exit edit mode after saving
        toast.success("Video details updated!");
      }
    } catch (error) {
      console.error("Error updating video:", error);
      toast.error("Failed to update video.");
    }
  };



  return (

    <div className='bg-[#121212CC] h-screen fixed inset-0 z-50 modalOverflow'
    onClick={() => setShowModal(false)} 
    >

      <div className='bigscreen !max-w-[800px] py-16 px-20'>

        <div className='w-full bg-[#fff] rounded-[8px] border border-[#CBCBCB]'>

          <div className='bg-[#C9DBD2] flex items-center justify-between pl-8 pr-2 py-2 text-[#222222] text-xs rounded-tl-[8px] rounded-tr-[8px]'>
            <div>

            </div>

            <div className='cursor-pointer h-full' onClick={() => setShowModal(false)}>
              <img src={cross} alt='close' className='h-full object-contain' />
            </div>
          </div>

          <div className='px-8 py-2 flex items-center justify-between'>

            <div className='flex gap-6 h-10 font-semibold items-center'>

              {video?._id}

            </div>

          </div>

          <div className='line'></div>


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


            <div>
              {/* Editable Name */}
              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-xl font-semibold border p-2 rounded w-full"
                // className='mt-4 w-full input focus:outline-none focus:border-[var(--primary)]'
                />
              ) : (
                <div className="text-xl font-semibold">{name}</div>
              )}

              {/* Tags Section */}
              <div className="flex flex-col gap-4 mt-4">
                <div className="font-semibold">Item Tags</div>

                <div className="flex flex-wrap gap-4">
                  {tags.map((tag, index) => (
                    <div key={index} className="lightGreenButton flex items-center gap-2 p-2 rounded">
                      {tag}
                      {isEditing && (
                        <button
                          className="text-red-500 text-sm"
                          onClick={() => handleRemoveTag(index)}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add New Tag (Only in Edit Mode) */}
                {isEditing && (
                  <div className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="border p-2 rounded w-full"
                      placeholder="Enter new tag"
                    />
                    <button
                      onClick={handleAddTag}
                      className="lightGreenButton"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>

              {/* Edit & Save Buttons */}
              <div className="mt-4">
                {isEditing ? (
                  <button
                    onClick={handleSave}
                    className="greenButton"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="greenButton"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>


          </div>


        </div>

      </div>

      <Toaster position='top-center' richColors />

    </div>
  )
}

export default VideoPage