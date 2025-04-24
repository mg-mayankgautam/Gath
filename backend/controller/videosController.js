const videosDB = require("../models/videosDB.js")
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require('path');
// require('dotenv').config();
const ffmpeg = require('fluent-ffmpeg');
const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKeyId = process.env.ACCESS_KEY_ID
const secretAccessKey = process.env.SECRET_ACCESS_KEY
const crypto = require('crypto');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
// const client = new S3Client(clientParams);

const ffmpegStatic = require('ffmpeg-static');
ffmpeg.setFfmpegPath(ffmpegStatic);

const s3Client = new S3Client({
    region: bucketRegion,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
})

// const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });


const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');


// module.exports.postVideo = async (req, res) => {

//     try {
//         console.log("Reached post video controller");

//         const name = req.body.name;
//         const tags = JSON.parse(req.body.tags);

//         const video = req.files[0];

//         console.log(name, tags, video);

//         const fileName = generateFileName();
//         const previewName = `${fileName}_preview.webm`;

//         // Generate a 6-second preview using FFmpeg
//         ffmpeg(video.path)
//             .setStartTime(0) // Start from the beginning
//             .setDuration(6) // 6-second preview
//             .outputOptions(['-c:v libvpx', '-crf 10', '-b:v 1M', '-an']) // WebM encoding options
//             .saveToFile(`./tmp/${previewName}`) // Save preview locally
//             .on('end', async () => {
//                 console.log('Preview generated successfully.');

//                 const uploadParams = {
//                     Bucket: bucketName,
//                     Body: video.buffer,
//                     Key: `${fileName}.mp4`,
//                     ContentType: 'video/mp4',
//                 };
//                 await s3Client.send(new PutObjectCommand(uploadParams));



//                 // Upload preview
//                 const previewBuffer = fs.readFileSync(`./tmp/${previewName}`);
//                 const uploadPreviewParams = {
//                     Bucket: process.env.BUCKET_NAME,
//                     Key: `previews/${previewName}`,
//                     Body: previewBuffer,
//                     ContentType: 'video/webm',
//                 };
//                 await s3Client.send(new PutObjectCommand(uploadPreviewParams));

//                 const videoURL = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${fileName}.mp4`;
//                 const previewURL = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/previews/${previewName}`;
//             })




//         // const URL = `https://${bucketName}.s3.ap-south-1.amazonaws.com/${fileName}.mp4`;
//         console.log(URL);
//     }
//     catch (err) {
//         console.log(err)
//     }

//     // hardcoded URL
//     // const URL = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
//     // const URL = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
//     // const URL ='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'

//     // let newvideo = new videosDB({ URL,name, tags,views:0 });

//     // newvideo.save()
//     //     .then(video => {
//     //         console.log(video);
//     //         res.send(true);
//     //     })
//     //     .catch((error) => {
//     //         console.log(error);
//     //         res.send(false);
//     //         // res.status(500).json({ error: "Failed to post love letter" });
//     //     })


// };


async function addWatermark(inputVideoPath, watermarkImagePath, outputVideoPath) {
    return new Promise((resolve, reject) => {
        ffmpeg(inputVideoPath)
            .input(watermarkImagePath)
            .complexFilter([
                {
                    filter: 'overlay',
                    options: {
                        x: 10, // Adjust as needed
                        y: 10, // Adjust as needed
                    },
                },
            ])
            .outputOptions(['-codec:a', 'copy']) // Copy audio stream
            .output(outputVideoPath)
            .on('end', () => {
                console.log('Watermark added successfully!');
                resolve(outputVideoPath);
            })
            .on('error', (err) => {
                console.error('Error adding watermark:', err);
                reject(err);
            })
            .run();
    });
}

module.exports.postVideo = async (req, res) => {
    try {
        console.log("Reached post video controller");

        const name = req.body.name;
        const tags = JSON.parse(req.body.tags);
        const video = req.files[0];

        console.log(name, tags, video);
        const tmpDir = path.join(__dirname, '../tmp');

        // Ensure the tmp directory exists
        if (!fs.existsSync(tmpDir)) {
            fs.mkdirSync(tmpDir);
        }
        const fileName = generateFileName();
        const previewName = `${fileName}_preview.mp4`;
        const watermarkedName = `${fileName}_watermarked.mp4`; //added watermarked

        // Generate paths for original video and preview and watermarked
        const videoPath = path.join(tmpDir, `${fileName}.mp4`);
        const previewPath = path.join(tmpDir, previewName);
        const watermarkedVideoPath = path.join(tmpDir, watermarkedName); // Added

        // Save the original video to disk temporarily
        fs.writeFileSync(videoPath, video.buffer);

        const watermarkImagePath = path.join(__dirname, 'watermark.png'); // Path to your watermark image.  Make sure this exists

        // Generate watermarked video
        try {
            await addWatermark(videoPath, watermarkImagePath, watermarkedVideoPath);
            console.log("Watermarked video generated successfully");
        } catch (error) {
            console.error("Error generating watermarked video:", error);
            // Handle error, e.g., skip uploading watermarked version, or send error response
            // Important:  Decide how you want to handle this.  For this example, I'm proceeding without the watermarked video.
            // You might want to:
            //    -  res.status(500).json({ error: "Watermark failed", ... }); return;  // Stop processing
            //    -  Don't create watermarked, and just use original.
        }



        // Generate a 6-second MP4 preview using FFmpeg
        await new Promise((resolve, reject) => {
            ffmpeg(videoPath)
                .setStartTime(0) // Start from the beginning
                .setDuration(6) // 6-second preview
                .outputOptions([
                    "-c:v libx264", // H.264 codec
                    "-crf 23", // Quality (lower is better)
                    "-preset veryfast", // Faster encoding
                    "-an", // No audio
                ])
                .save(previewPath) // Save preview locally
                .on("end", resolve)
                .on("error", reject);
        });

        console.log("Preview generated successfully.");

        // Upload the full video to S3
        const videoUploadParams = {
            Bucket: process.env.BUCKET_NAME,
            Body: video.buffer, // Use the original video buffer
            Key: `${fileName}.mp4`,
            ContentType: "video/mp4",
        };
        await s3Client.send(new PutObjectCommand(videoUploadParams));

        // Upload the preview to S3
        const previewBuffer = fs.readFileSync(previewPath);
        const previewUploadParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: `previews/${previewName}`,
            Body: previewBuffer,
            ContentType: "video/mp4",
        };
        await s3Client.send(new PutObjectCommand(previewUploadParams));

        // Upload the watermarked video to S3
        let watermarkedVideoURL = null; // Initialize
        if (fs.existsSync(watermarkedVideoPath)) { // Check if the watermarked file was successfully created
            const watermarkedVideoBuffer = fs.readFileSync(watermarkedVideoPath);
            const watermarkedUploadParams = {
                Bucket: process.env.BUCKET_NAME,
                Key: `watermarked/${watermarkedName}`,
                Body: watermarkedVideoBuffer,
                ContentType: "video/mp4",
            };
            await s3Client.send(new PutObjectCommand(watermarkedUploadParams));
            watermarkedVideoURL = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/watermarked/${watermarkedName}`;
        }


        const videoURL = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${fileName}.mp4`;
        const previewURL = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/previews/${previewName}`;

        // Save video details to the database
        const newVideo = new videosDB({
            URL: videoURL,
            previewURL: previewURL,
            watermarkedURL: watermarkedVideoURL, // Save the watermarked URL
            name,
            tags,
            views: 0,
        });

        await newVideo.save();

        console.log("Video and preview uploaded successfully:", { videoURL, previewURL, watermarkedVideoURL });
        res.status(200).json({ success: true, videoURL, previewURL, watermarkedVideoURL });

        // Clean up temporary files
        fs.unlinkSync(videoPath);
        fs.unlinkSync(previewPath);
        if (fs.existsSync(watermarkedVideoPath)) { // Check if the file exists before attempting to delete
            fs.unlinkSync(watermarkedVideoPath);
        }

    } catch (err) {
        console.error("Error uploading video:", err);
        res.status(500).json({ success: false, message: "Failed to upload video" });
    }
};

//below was the last wirking code
// module.exports.postVideo = async (req, res) => {
//     try {
//         console.log("Reached post video controller");

//         const name = req.body.name;
//         const tags = JSON.parse(req.body.tags);
//         const video = req.files[0];

//         console.log(name, tags, video);
//         const tmpDir = path.join(__dirname, '../tmp');

//         // Ensure the tmp directory exists
//         if (!fs.existsSync(tmpDir)) {
//             fs.mkdirSync(tmpDir);
//         }
//         const fileName = generateFileName();
//         const previewName = `${fileName}_preview.mp4`;

//         // Generate paths for original video and preview
//         const videoPath = path.join(tmpDir, `${fileName}.mp4`);
//         const previewPath = path.join(tmpDir, previewName);

//         // Save the original video to disk temporarily
//         fs.writeFileSync(videoPath, video.buffer);

//         // Generate a 6-second MP4 preview using FFmpeg
//         await new Promise((resolve, reject) => {
//             ffmpeg(videoPath)
//                 .setStartTime(0) // Start from the beginning
//                 .setDuration(6) // 6-second preview
//                 .outputOptions([
//                     "-c:v libx264", // H.264 codec
//                     "-crf 23", // Quality (lower is better)
//                     "-preset veryfast", // Faster encoding
//                     "-an", // No audio
//                 ])
//                 .save(previewPath) // Save preview locally
//                 .on("end", resolve)
//                 .on("error", reject);
//         });

//         console.log("Preview generated successfully.");

//         // Upload the full video to S3
//         const videoUploadParams = {
//             Bucket: process.env.BUCKET_NAME,
//             Body: video.buffer,
//             Key: `${fileName}.mp4`,
//             ContentType: "video/mp4",
//         };
//         await s3Client.send(new PutObjectCommand(videoUploadParams));

//         // Upload the preview to S3
//         const previewBuffer = fs.readFileSync(previewPath);
//         const previewUploadParams = {
//             Bucket: process.env.BUCKET_NAME,
//             Key: `previews/${previewName}`,
//             Body: previewBuffer,
//             ContentType: "video/mp4",
//         };
//         await s3Client.send(new PutObjectCommand(previewUploadParams));

//         const videoURL = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${fileName}.mp4`;
//         const previewURL = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/previews/${previewName}`;

//         // Save video details to the database
//         const newVideo = new videosDB({
//             URL: videoURL,
//             previewURL: previewURL,
//             name,
//             tags,
//             views: 0,
//         });

//         await newVideo.save();

//         console.log("Video and preview uploaded successfully:", { videoURL, previewURL });
//         res.status(200).json({ success: true, videoURL, previewURL });

//         // Clean up temporary files
//         fs.unlinkSync(videoPath);
//         fs.unlinkSync(previewPath);
//     } catch (err) {
//         console.error("Error uploading video:", err);
//         res.status(500).json({ success: false, message: "Failed to upload video" });
//     }
// };




// hardcoded URL
// const URL = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
// const URL = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
// const URL ='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'


module.exports.getVideos = async (req, res) => {

    videosDB.find({})
        .then((videos) => {
            // console.log(loveLetters);
            res.send(videos);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Failed to get love letters" });
        });

}

module.exports.addView = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'Video ID is required.' });
    }

    try {
        const updatedVideo = await videosDB.findOneAndUpdate(
            { _id: id },
            {
                $inc: { views: 1 } // Increment views if document exists
                // $setOnInsert: { views: 1 } // Set views to 1 ONLY if a new document is inserted
            },
            { new: true, upsert: true }
        );

        if (!updatedVideo) {
            return res.status(404).json({ message: 'Video not found.' });
        }

        return res.status(200).json({
            message: 'View count updated successfully.',
            video: updatedVideo
        });
    } catch (error) {
        console.error('Error updating view count:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};



module.exports.editInfo = async (req, res) => {

    const { _id, name, tags } = req.body;

    try {
        const updatedVideo = await videosDB.findOneAndUpdate(
            { _id },
            { name, tags },
            { new: true, runValidators: true } // Return updated document & validate input
        );

        if (!updatedVideo) {
            return res.status(404).json({ error: "Video not found" });
        }

        res.status(200).json(updatedVideo);

    } catch (error) {
        console.error("Error updating video:", error);
        res.status(500).json({ error: "Failed to update video" });
    }
}






