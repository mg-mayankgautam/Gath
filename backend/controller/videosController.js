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
const ffprobeStatic = require('ffprobe-static');
ffmpeg.setFfmpegPath(ffmpegStatic);
ffmpeg.setFfprobePath(ffprobeStatic.path);


// Log the paths to verify
console.log('FFmpeg Path:', ffmpegStatic);
console.log('FFprobe Path:', ffprobeStatic.path);

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


// async function addWatermark(inputVideoPath, watermarkImagePath, outputVideoPath) {
//     return new Promise((resolve, reject) => {
//         ffmpeg(inputVideoPath)
//             .input(watermarkImagePath)
//             .complexFilter([
//                 {
//                     filter: 'overlay',
//                     options: {
//                         x: 0, // Adjust as needed
//                         y: 0, // Adjust as needed
//                     },
//                 },
//             ])
//             .outputOptions(['-codec:a', 'copy']) // Copy audio stream
//             .output(outputVideoPath)
//             .on('end', () => {
//                 console.log('Watermark added successfully!');
//                 resolve(outputVideoPath);
//             })
//             .on('error', (err) => {
//                 console.error('Error adding watermark:', err);
//                 reject(err);
//             })
//             .run();
//     });
// }

// Helper function to run ffprobe and get dimensions


function getDimensions(filePath) {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(filePath, (err, metadata) => {
            if (err) {
                return reject(new Error(`Error probing file ${filePath}: ${err.message}`));
            }
            const stream = metadata.streams.find(s => s.codec_type === 'video');
            if (!stream || !stream.width || !stream.height) {
                 return reject(new Error(`Could not find video stream dimensions for ${filePath}`));
            }
            resolve({ width: stream.width, height: stream.height });
        });
    });
}

// async function addWatermark(inputVideoPath, watermarkImagePath, outputVideoPath, padding = 10) {
//     const tempTiledWatermarkPath = path.join(
//         path.dirname(outputVideoPath),
//         `temp_tiled_${Date.now()}_${path.basename(watermarkImagePath)}`
//     );
//     try {
//         // --- Step 1: Get Dimensions ---
//         console.log("Probing video and watermark dimensions...");
//         const [videoDims, watermarkDims] = await Promise.all([
//             getDimensions(inputVideoPath),
//             getDimensions(watermarkImagePath),
//         ]);

//         console.log(`Video: ${videoDims.width}x${videoDims.height}, Watermark: ${watermarkDims.width}x${watermarkDims.height}`);
//         if (!videoDims.width || !videoDims.height || !watermarkDims.width || !watermarkDims.height) {
//             throw new Error("Invalid video or watermark dimensions.");
//         }

//         // --- Step 2: Create Tiled Watermark Image ---
//         const tileWidthWithPadding = watermarkDims.width + padding;
//         const tileHeightWithPadding = watermarkDims.height + padding;
//         const tilesX = Math.ceil(videoDims.width / tileWidthWithPadding);
//         const tilesY = Math.ceil(videoDims.height / tileHeightWithPadding);

//         await new Promise((resolve, reject) => {
//             ffmpeg()
//                 .input(watermarkImagePath)
//                 .inputOptions(['-loop', '1']) // Loop the watermark
//                 .complexFilter([
//                     `[0:v]scale=${watermarkDims.width}:${watermarkDims.height},pad=${tileWidthWithPadding}:${tileHeightWithPadding}:color=black@0.0,` +
//                     `tile=${tilesX}x${tilesY}`
//                 ])
//                 .outputOptions('-frames:v 1') // Single-frame image
//                 .output(tempTiledWatermarkPath)
//                 .on('start', (cmd) => console.log(`FFmpeg command: ${cmd}`))
//                 .on('end', resolve)
//                 .on('error', reject)
//                 .run();
//         });
//         console.log("Tiled watermark image created successfully.");

//         // --- Step 3: Overlay Tiled Watermark on Video ---
//         await new Promise((resolve, reject) => {
//             ffmpeg(inputVideoPath)
//                 .input(tempTiledWatermarkPath)
//                 .complexFilter('overlay=0:0:shortest=1')
//                 .outputOptions([
//                     '-c:v libx264',
//                     '-crf 23',
//                     '-preset fast',
//                     '-c:a copy',
//                 ])
//                 .output(outputVideoPath)
//                 .on('start', (cmd) => console.log(`FFmpeg overlay command: ${cmd}`))
//                 .on('end', resolve)
//                 .on('error', reject)
//                 .run();
//         });
//         console.log("Watermark successfully applied to video.");
//     } catch (error) {
//         console.error("Error in watermark process:", error);
//         throw error;
//     } finally {
//         if (fs.existsSync(tempTiledWatermarkPath)) {
//             try {
//                 fs.unlinkSync(tempTiledWatermarkPath);
//                 console.log("Temporary watermark file cleaned up.");
//             } catch (err) {
//                 console.error("Error cleaning up temporary watermark file:", err);
//             }
//         }
//     }
// }

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
        console.log("Reached post video controller",req.body);

        const name = req.body.name;
        const filesize=req.body.fileSize;
        const fileSizeInMB = Number(filesize) / (1024 * 1024);

        const fileType=req.body.fileType;
        const duration=req.body.duration;
        const videoWidth=req.body.videoWidth;
        const videoHeight=req.body.videoHeight;

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
            waterMarkedVideoURL: watermarkedVideoURL, // Save the watermarked URL
            name,
            tags,
            theme: [],
            views: 0,
            filesize,
            fileSizeInMB,
            fileType,
            duration,
            videoWidth,videoHeight
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


// module.exports.getVideos = async (req, res) => {

//     videosDB.find({})
//         .then((videos) => {
//             // console.log(loveLetters);
//             res.send(videos);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({ error: "Failed to get love letters" });
//         });

// }

module.exports.getVideos = async (req, res) => {
    const { page = 1, limit = 9 } = req.query; // Default page to 1, limit to 9
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    try {
        const videos = await videosDB.find({})
            .skip(skip)
            .limit(limitNumber);

        const totalVideos = await videosDB.countDocuments({});
        const totalPages = Math.ceil(totalVideos / limitNumber);

        res.status(200).json({
            videos,
            totalPages,
            currentPage: pageNumber,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to get videos" });
    }
};

module.exports.getSearchVideos = async (req, res) => {
    console.log('reached getSearchVideos');
    console.log('Request Query:', req.query);
  
    const searchQuery = req.query.term;
  
    if (searchQuery) {
      console.log('Search Query:', searchQuery);
  
      const keywords = searchQuery.toLowerCase().split(/\s+/).filter(Boolean); // Split, lowercase, and remove empty strings
  
      if (keywords.length === 1) {
        // Scenario 1: Single keyword - use the case-insensitive substring search
        const singleKeyword = keywords[0];
        try {
          const videosWithTag = await videosDB.find({
            tags: { $regex: new RegExp(singleKeyword, 'i') }
          });
          console.log('Videos with single tag:', videosWithTag);
          res.send(videosWithTag);
        } catch (error) {
          console.error('Error fetching videos by single tag:', error);
          res.status(500).send('Error fetching videos.');
        }
      } else if (keywords.length > 1) {
        // Scenario 2: Multiple keywords - use $all with case-insensitive regex for each keyword
        try {
          const matchingVideos = await videosDB.find({
            tags: {
              $all: keywords.map(keyword => new RegExp(keyword, 'i'))
            }
          });
          console.log('Matching Videos (all keywords):', matchingVideos);
          res.send(matchingVideos);
        } catch (error) {
          console.error('Error fetching videos by all keywords:', error);
          res.status(500).send('Error fetching videos.');
        }
      } else {
        // Scenario 3: No keywords (empty search) - you might want to handle this differently
        console.log('No keywords in search query.');
        res.send([]); // Or perhaps return all videos, or a message
      }
    } else {
      console.log('No search query provided.');
      res.status(400).send('Search query is required.');
    }
  };


  module.exports.addView = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'Video ID is required.' });
    }

    try {
        const updatedVideo = await videosDB.findOneAndUpdate(
            { _id: id },
            { $inc: { views: 1 } },
            { 
                new: true,
                upsert: true,
                select: '-URL' // This is the key change
            }
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






