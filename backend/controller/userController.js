const siteUsersDB = require("../models/siteUsersDB.js");
const videosDB = require("../models/videosDB.js")
const axios = require('axios');



module.exports.saveToCollection = async (req, res) => {
    console.log('reached saveToCollection');
    console.log('user', req.user);

    const { id } = req.body; // Get the videoId from the request body.  Important.
    console.log(id);
    try {
        // 1.  Check if the user is authenticated.  Important.
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Unauthorized: User not authenticated' });
        }

        const email = req.user; // Get the user ID from the authenticated user.
        console.log(email);

        // 2. Find the user.
        const user = await siteUsersDB.findOne({email});
        console.log(user);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' }); // 404
        }

        // 3. Check if the videoId is valid and exists in the Video collection.  Important.
        const video = await videosDB.findById(id);
        console.log(video);

        if (!video) {
            return res.status(400).json({ success: false, message: 'Invalid videoId: Video not found' }); // 400
        }


        // 4. Check if the videoId is already in the user's saved array.
        if (user.saved.includes(id)) {
            return res.status(200).json({ success: true, message: 'Video already saved' }); //  200 OK -  Idempotent
        }

        // 5. Add the videoId to the user's saved array.
        user.saved.push(id);
        await user.save();



        res.status(200).json({
            success: true,
            message: 'Video saved to collection',
            // savedVideos: user.saved, //  Send back the updated saved videos.
        });


    } catch (error) {
        console.error('Error saving to collection:', error);
        res.status(500).json({ success: false, message: 'Error saving video', error: error.message });
    }
};

module.exports.getSavedVideos = async (req, res) => {
    console.log('reached getsaved videos', req.user);

    try {
        // 1. Check if the user is authenticated
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Unauthorized: User not authenticated' });
        }

        const email = req.user;

        // 2. Find the user and populate the saved videos, selecting specific fields.
        const user = await siteUsersDB.findOne({ email }).populate({
            path: 'saved',
            select: '-URL', //  Exclude URL.  This is the corrected way to exclude a field.
        });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // 3.  Send the saved videos in the response.
        res.status(200).json({
            success: true,
            message: 'Saved videos retrieved successfully',
            savedVideos: user.saved,
        });

    } catch (error) {
        console.error('Error getting saved videos:', error);
        res.status(500).json({ success: false, message: 'Error getting saved videos', error: error.message });
    }
};

module.exports.removeSavedVideo = async (req, res) => {
    console.log('removeSavedVideo', req.body.clipId);
    console.log('removeSavedVideo', req.user);

    const clipId = req.body.clipId; //  Renamed to clipId to match your console.log, and be more descriptive
    try {
        // 1. Check if the user is authenticated.
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Unauthorized: User not authenticated' });
        }

        const email = req.user;  // Get user ID.

        // 2. Find the user.
        const user = await siteUsersDB.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // 3. Check if the videoId exists in the user's saved array.
        const videoIndex = user.saved.indexOf(clipId); //  use indexOf
        if (videoIndex === -1) {
            return res.status(200).json({ success: true, message: 'Video not found in saved list' }); //  200 OK, idempotent
        }

        // 4. Remove the videoId from the user's saved array.
        user.saved.splice(videoIndex, 1); //  Use splice
        await user.save();

        // 5. (Optional) Populate the saved array to return the updated video data.  Good practice.
        await user.populate({
            path: 'saved',
            select: '-URL', //  Exclude URL
        });

        // 6. Send the response.
        res.status(200).json({
            success: true,
            message: 'Video removed from saved list',
            savedVideos: user.saved, // Send the updated saved videos
        });
    } catch (error) {
        console.error('Error removing video:', error);
        res.status(500).json({ success: false, message: 'Error removing video', error: error.message });
    }
};



const datenow = new Date(); // ensure you define datenow properly




// module.exports.downloadWatermark = async (req, res) => {
//     try {
//       console.log('downloadWatermark', req.user, req.body.id);
  
//       const email = req.user;
//       const datenow = new Date(); // ensure datenow is defined here
  
//       const DownloadedVideoInfo = {
//         videoID: req.body.id,
//         date: datenow,
//         type: 'watermark'
//       };
  
//       // Check if video already exists for the user
//       const user = await siteUsersDB.findOne({
//         email: email,
//         'DownloadedVideosInfo.videoID': req.body.id
//       });
  
//       if (user) {
//         return res.json({
//           success: true,
//           message: 'Video has been downloaded before, no updation required'
//         });
//       }
  
//       // Push only if not already in the array
//       const updatedUser = await siteUsersDB.findOneAndUpdate(
//         { email: email },
//         { $push: { DownloadedVideosInfo: DownloadedVideoInfo } },
//         { new: true }
//       );
  
//       if (!updatedUser) {
//         return res.status(404).json({ success: false, message: 'User not found' });
//       }
  
//       res.json({ success: true, message: 'Video info updated' });
  
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ success: false, message: 'Server error' });
//     }
//   };
  
module.exports.downloadWatermark = async (req, res) => {
    try {
      console.log('downloadWatermark', req.user, req.body.id);
      
      // 1. First update user's download info
      const email = req.user;
      const videoID = req.body.id;
      
      const user = await siteUsersDB.findOneAndUpdate(
        { email, 'DownloadedVideosInfo.videoID': { $ne: videoID } },
        { $push: { 
          DownloadedVideosInfo: {
            videoID,
            date: new Date(),
            type: 'watermark'
          }
        }},
        { new: true }
      );
  
      // 2. Get the actual video URL from your database
      const video = await videosDB.findById(videoID); // Assuming you have a Video model
      if (!video) {
        return res.status(404).json({ success: false, message: 'Video not found' });
      }
  
      // 3. Force download with proper headers
      res.setHeader('Content-Disposition', `attachment; filename="watermarked_video_${videoID}.mp4"`);
      res.setHeader('Content-Type', 'video/mp4');
      
      // 4. Stream the file from S3
      const s3Response = await axios.get(video.waterMarkedVideoURL, {
        responseType: 'stream'
      });
      
      s3Response.data.pipe(res);
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };