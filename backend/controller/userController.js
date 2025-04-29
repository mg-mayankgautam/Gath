const siteUsersDB = require("../models/siteUsersDB.js");
const videosDB = require("../models/videosDB.js")


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
        // if (user.saved.includes(id)) {
        //     return res.status(200).json({ success: true, message: 'Video already saved' }); //  200 OK -  Idempotent
        // }

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

