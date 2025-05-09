import React, { useEffect, useState } from 'react'
import cross from '../assets/icons/cross.svg'
import axios from 'axios'
import { toast, Toaster } from 'sonner'


const VideoPage = ({ setShowModal, video }) => {

const initialOrientation=video.orientation
  const [themes, setThemes] = useState(video.themes || []);
  const [shots, setShots] = useState(video.shots || []);
  const [shotonmobile, setShotonmobile] = useState(video.shotonmobile || false);

  const [orientation, setOrientation] = useState(initialOrientation || '');
  const [customOrientation, setCustomOrientation] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const commonOrientations = ['horizontal', 'vertical', 'square', 'portrait', 'landscape'];

  const handleOrientationChange = (e) => {
    if (e.target.value === 'custom') {
      setShowCustomInput(true);
      setOrientation('');
    } else {
      setOrientation(e.target.value);
      setShowCustomInput(false);
    }
  };

  const handleCustomOrientationSubmit = () => {
    if (customOrientation.trim()) {
      setOrientation(customOrientation.trim());
      setShowCustomInput(false);
      setCustomOrientation('');
    }
  };
 

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
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/videos/editinfoz`,
        {
          _id: video._id,
          name,          // updated name
          tags,          // updated tags array
          themes,        // updated themes array
          shots,         // updated shots array
          shotonmobile,  // updated boolean
          orientation,   // updated orientation
        
        }
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

  // State for editing
const [newTheme, setNewTheme] = useState('');
const [newShot, setNewShot] = useState('');

// Handlers for themes
const handleAddTheme = () => {
  if (newTheme.trim() && !themes.includes(newTheme.trim())) {
    setThemes([...themes, newTheme.trim()]);
    setNewTheme('');
  }
};

const handleRemoveTheme = (index) => {
  setThemes(themes.filter((_, i) => i !== index));
};

// Handlers for shots
const handleAddShot = () => {
  if (newShot.trim() && !shots.includes(newShot.trim())) {
    setShots([...shots, newShot.trim()]);
    setNewShot('');
  }
};

const handleRemoveShot = (index) => {
  setShots(shots.filter((_, i) => i !== index));
};



  return (

    <div className='bg-[#121212CC] h-screen fixed inset-0 z-50 modalOverflow'
    // onClick={() => setShowModal(false)} 
    >

      <div className='bigscreen !max-w-[800px] py-16 px-20'>

        <div className='w-full bg-[#fff] rounded-[8px] border border-[#CBCBCB]'>

          <div className='bg-[#C9DBD2] flex items-center justify-between pl-8 pr-2 py-2 text-[#222222] text-xs rounded-tl-[8px] rounded-tr-[8px]'>
            <div>

            </div>

            <div className='cursor-pointer h-full' 
            onClick={(e) => {setShowModal(false);console.log(e)}}
            
            
            >
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
  {/* Basic Information Section */}
  <div className="mb-6">
    <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
    
    {/* Editable Name */}
    <div className="mb-4">
      <label className="block font-medium mb-1">Name</label>
      {isEditing ? (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-xl font-semibold border p-2 rounded w-full"
        />
      ) : (
        <div className="text-xl font-semibold">{name}</div>
      )}
    </div>

    {/* File Information (Read-only) */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block font-medium mb-1">File Size</label>
        <div>{video.fileSizeInMB} MB</div>
      </div>
      <div>
        <label className="block font-medium mb-1">File Type</label>
        <div>{video.fileType}</div>
      </div>
      <div>
        <label className="block font-medium mb-1">Duration</label>
        <div>{video.duration} seconds</div>
      </div>
      <div>
        <label className="block font-medium mb-1">Resolution</label>
        <div>{video.videoWidth} × {video.videoHeight} ({video?.orientation})</div>
      </div>
    </div>
  </div>

  {/* Tags Section */}
  <div className="mb-6">
    <h2 className="text-lg font-semibold mb-4">Tags</h2>
    <div className="flex flex-wrap gap-2 mb-4">
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

    {isEditing && (
      <div className="flex gap-2">
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

  {/* Themes Section */}
  <div className="mb-6">
    <h2 className="text-lg font-semibold mb-4">Themes</h2>
    <div className="flex flex-wrap gap-2 mb-4">
      {themes.map((theme, index) => (
        <div key={index} className="lightGreenButton flex items-center gap-2 p-2 rounded">
          {theme}
          {isEditing && (
            <button
              className="text-red-500 text-sm"
              onClick={() => handleRemoveTheme(index)}
            >
              ✕
            </button>
          )}
        </div>
      ))}
    </div>

    {isEditing && (
      <div className="flex gap-2">
        <input
          type="text"
          value={newTheme}
          onChange={(e) => setNewTheme(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Enter new theme"
        />
        <button
          onClick={handleAddTheme}
          className="lightGreenButton"
        >
          Add
        </button>
      </div>
    )}
  </div>

    {/* Shots Section - Always shown with option to add */}
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4">Shots</h2>
      
      {/* Display existing shots */}
      <div className="flex flex-wrap gap-2 mb-4">
        {shots.map((shot, index) => (
          <div key={index} className="lightGreenButton flex items-center gap-2 p-2 rounded">
            {shot}
            {isEditing && (
              <button
                className="text-red-500 text-sm"
                onClick={() => handleRemoveShot(index)}
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Persistent input box for adding new shots */}
      {isEditing && (
        <div className="flex gap-2">
          <input
            type="text"
            value={newShot}
            onChange={(e) => setNewShot(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Enter new shot"
            onKeyPress={(e) => e.key === 'Enter' && handleAddShot()}
          />
          <button
            onClick={handleAddShot}
            className="lightGreenButton"
          >
            Add
          </button>
        </div>
      )}
    </div>


    <div className="mb-4">
      <label className="block font-medium mb-1">Orientation</label>
      
      {isEditing ? (
        <div>
          <select
            value={orientation || ''}
            onChange={handleOrientationChange}
            className="border p-2 rounded w-full mb-2"
          >
            <option value="">Select orientation...</option>
            {commonOrientations.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
            <option value="custom">Custom orientation...</option>
          </select>

          {showCustomInput && (
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                value={customOrientation}
                onChange={(e) => setCustomOrientation(e.target.value)}
                className="border p-2 rounded w-full"
                placeholder="Enter custom orientation"
                onKeyPress={(e) => e.key === 'Enter' && handleCustomOrientationSubmit()}
              />
              <button
                onClick={handleCustomOrientationSubmit}
                className="lightGreenButton"
              >
                Add
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>{orientation || 'Not specified'}</div>
      )}
    </div>

  {/* Technical Details */}
  <div className="mb-6">
    <h2 className="text-lg font-semibold mb-4">Technical Details</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block font-medium mb-1">Shot on Mobile</label>
        {isEditing ? (
          <select
            value={shotonmobile}
            onChange={(e) => setShotonmobile(e.target.value === 'true')}
            className="border p-2 rounded w-full"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        ) : (
          <div>{shotonmobile ? 'Yes' : 'No'}</div>
        )}
      </div>
    </div>
  </div>

  {/* Edit & Save Buttons */}
  <div className="mt-6">
    {isEditing ? (
      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="greenButton"
        >
          Save Changes
        </button>
        <button
          onClick={() => setIsEditing(false)}
          className="grayButton"
        >
          Cancel
        </button>
      </div>
    ) : (
      <button
        onClick={() => setIsEditing(true)}
        className="greenButton"
      >
        Edit Details
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