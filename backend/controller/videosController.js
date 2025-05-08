const videosDB = require("../models/videosDB.js");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");
// require('dotenv').config();
const ffmpeg = require("fluent-ffmpeg");
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKeyId = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const crypto = require("crypto");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
// const client = new S3Client(clientParams);

const ffmpegStatic = require("ffmpeg-static");
const ffprobeStatic = require("ffprobe-static");
ffmpeg.setFfmpegPath(ffmpegStatic);
ffmpeg.setFfprobePath(ffprobeStatic.path);

// Log the paths to verify
console.log("FFmpeg Path:", ffmpegStatic);
console.log("FFprobe Path:", ffprobeStatic.path);

const s3Client = new S3Client({
  region: bucketRegion,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

async function addWatermark(
  inputVideoPath,
  watermarkImagePath,
  outputVideoPath
) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputVideoPath)
      .input(watermarkImagePath)
      .complexFilter([
        {
          filter: "overlay",
          options: {
            x: 10, // Adjust as needed
            y: 10, // Adjust as needed
          },
        },
      ])
      .outputOptions(["-codec:a", "copy"]) // Copy audio stream
      .output(outputVideoPath)
      .on("end", () => {
        console.log("Watermark added successfully!");
        resolve(outputVideoPath);
      })
      .on("error", (err) => {
        console.error("Error adding watermark:", err);
        reject(err);
      })
      .run();
  });
}

async function create1080pVersion(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .videoCodec("libx264")
      .outputOptions([
        "-crf 23",
        "-preset fast",
        "-vf scale=1920:1080", // Scale to 1080p
        "-profile:v high",
        "-pix_fmt yuv420p",
      ])
      .audioCodec("aac")
      .audioBitrate("128k")
      .on("end", () => resolve(outputPath))
      .on("error", (err) => reject(err))
      .save(outputPath);
  });
}

module.exports.postVideo = async (req, res) => {
  try {
    console.log("Reached post video controller", req.body);

    const name = req.body.name;
    const filesize = req.body.fileSize;
    const fileSizeInMB = Number(filesize) / (1024 * 1024);
    const fileType = req.body.fileType;
    const duration = req.body.duration;
    const videoWidth = req.body.videoWidth;
    const videoHeight = req.body.videoHeight;
    const tags = JSON.parse(req.body.tags);
    const themes = JSON.parse(req.body.themes);
    const shots = JSON.parse(req.body.shots);
    const shotonmobile=req.body.shotonmobile;
    const video = req.files[0];

    console.log(name, tags, video);
    const tmpDir = path.join(__dirname, "../tmp");

    // Ensure the tmp directory exists
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir);
    }
    const fileName = generateFileName();
    const previewName = `${fileName}_preview.mp4`;
    const watermarkedName = `${fileName}_watermarked.mp4`;
    const hdName = `${fileName}_1080p.mp4`; // 1080p version filename

    // Generate paths for all video versions
    const videoPath = path.join(tmpDir, `${fileName}.mp4`);
    const previewPath = path.join(tmpDir, previewName);
    const watermarkedVideoPath = path.join(tmpDir, watermarkedName);
    const hdVideoPath = path.join(tmpDir, hdName); // 1080p version path

    // Save the original video to disk temporarily
    fs.writeFileSync(videoPath, video.buffer);

    const watermarkImagePath = path.join(__dirname, "watermark.png");

    // Generate watermarked video
    try {
      await addWatermark(videoPath, watermarkImagePath, watermarkedVideoPath);
      console.log("Watermarked video generated successfully");
    } catch (error) {
      console.error("Error generating watermarked video:", error);
    }

    // Generate 1080p version
    let hdVideoURL = null;
    try {
      await create1080pVersion(videoPath, hdVideoPath);
      console.log("1080p version generated successfully");

      // Upload 1080p version to S3
      const hdVideoBuffer = fs.readFileSync(hdVideoPath);
      const hdUploadParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: `hd/${hdName}`,
        Body: hdVideoBuffer,
        ContentType: "video/mp4",
      };
      await s3Client.send(new PutObjectCommand(hdUploadParams));
      hdVideoURL = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/hd/${hdName}`;
    } catch (error) {
      console.error("Error generating 1080p version:", error);
    }

    // Generate a 6-second MP4 preview using FFmpeg
    await new Promise((resolve, reject) => {
      ffmpeg(videoPath)
        .setStartTime(0)
        .setDuration(6)
        .outputOptions(["-c:v libx264", "-crf 23", "-preset veryfast", "-an"])
        .save(previewPath)
        .on("end", resolve)
        .on("error", reject);
    });

    console.log("Preview generated successfully.");

    // Upload the full video to S3
    const videoUploadParams = {
      Bucket: process.env.BUCKET_NAME,
      Body: video.buffer,
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
    let watermarkedVideoURL = null;
    if (fs.existsSync(watermarkedVideoPath)) {
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
      waterMarkedVideoURL: watermarkedVideoURL,
      hdVideoURL: hdVideoURL, // Add 1080p URL to database
      name,
      tags,
      theme: [],
      views: 0,
      filesize,
      fileSizeInMB,
      fileType,
      duration,
      videoWidth,
      videoHeight,
      themes,shots,shotonmobile

    });

    await newVideo.save();

    console.log("Video and versions uploaded successfully:", {
      videoURL,
      previewURL,
      watermarkedVideoURL,
      hdVideoURL,
    });

    res.status(200).json({
      success: true,
      videoURL,
      previewURL,
      watermarkedVideoURL,
      hdVideoURL,
    });

    // Clean up temporary files
    fs.unlinkSync(videoPath);
    fs.unlinkSync(previewPath);
    if (fs.existsSync(watermarkedVideoPath)) {
      fs.unlinkSync(watermarkedVideoPath);
    }
    if (fs.existsSync(hdVideoPath)) {
      fs.unlinkSync(hdVideoPath);
    }
  } catch (err) {
    console.error("Error uploading video:", err);
    res.status(500).json({ success: false, message: "Failed to upload video" });
  }
};

module.exports.postMobileVideo=async(req,res)=>{
try{
  console.log('reached post mobile videos',req.body);
  const name = req.body.name;
  const filesize = req.body.fileSize;
  const fileSizeInMB = Number(filesize) / (1024 * 1024);
  const fileType = req.body.fileType;
  const duration = req.body.duration;
  const videoWidth = req.body.videoWidth;
  const videoHeight = req.body.videoHeight;
  const tags = JSON.parse(req.body.tags);
  const themes = JSON.parse(req.body.themes);
  const shots = JSON.parse(req.body.shots);
  const shotonmobile=req.body.shotonmobile;
  const video = req.files[0];



  const tmpDir = path.join(__dirname, "../tmp");
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
  }
  const fileName = generateFileName();
  const previewName = `${fileName}_preview.mp4`;
  const watermarkedName = `${fileName}_watermarked.mp4`;

  const videoPath = path.join(tmpDir, `${fileName}.mp4`);
  const previewPath = path.join(tmpDir, previewName);
  const watermarkedVideoPath = path.join(tmpDir, watermarkedName);

  fs.writeFileSync(videoPath, video.buffer);
  const watermarkImagePath = path.join(__dirname, "watermark.png");
   
      // Generate watermarked video

      try {
        await addWatermark(videoPath, watermarkImagePath, watermarkedVideoPath);
        console.log("Watermarked video generated successfully");
      } catch (error) {
        console.error("Error generating watermarked video:", error);
      }

      await new Promise((resolve, reject) => {
        ffmpeg(videoPath)
          .setStartTime(0)
          .setDuration(6)
          .outputOptions(["-c:v libx264", "-crf 23", "-preset veryfast", "-an"])
          .save(previewPath)
          .on("end", resolve)
          .on("error", reject);
      });
      console.log("Preview generated successfully.");
   
      // Upload the full video to S3
   const videoUploadParams = {
    Bucket: process.env.BUCKET_NAME,
    Body: video.buffer,
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
   let watermarkedVideoURL = null;
   if (fs.existsSync(watermarkedVideoPath)) {
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
    waterMarkedVideoURL: watermarkedVideoURL,
    hdVideoURL: '', // Add 1080p URL to database
    name,
    tags,
    theme: [],
    views: 0,
    filesize,
    fileSizeInMB,
    fileType,
    duration,
    videoWidth,
    videoHeight,
    themes,shots,shotonmobile

  });

  await newVideo.save();

  console.log("Video and versions uploaded successfully:", {
    videoURL,
    previewURL,
    watermarkedVideoURL,
  
  });

   res.status(200).json({
    success: true,
    videoURL,
    previewURL,
    watermarkedVideoURL,
  });

  // Clean up temporary files
  fs.unlinkSync(videoPath);
  fs.unlinkSync(previewPath);
  if (fs.existsSync(watermarkedVideoPath)) {
    fs.unlinkSync(watermarkedVideoPath);
  }

}catch(err){
  
  console.error("Error uploading video:", err);
  res.status(500).json({ success: false, message: "Failed to upload video" });
}

}

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
    const videos = await videosDB.find({}, '-hdVideoURL -URL').skip(skip).limit(limitNumber);

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
  console.log("reached getSearchVideos");
  console.log("Request Query:", req.query);

  const searchQuery = req.query.term;

  if (searchQuery) {
    console.log("Search Query:", searchQuery);

    const keywords = searchQuery.toLowerCase().split(/\s+/).filter(Boolean); // Split, lowercase, and remove empty strings

    if (keywords.length === 1) {
      // Scenario 1: Single keyword - use the case-insensitive substring search
      const singleKeyword = keywords[0];
      try {
        const videosWithTag = await videosDB.find({
          tags: { $regex: new RegExp(singleKeyword, "i") },
        });
        console.log("Videos with single tag:", videosWithTag);
        res.send(videosWithTag);
      } catch (error) {
        console.error("Error fetching videos by single tag:", error);
        res.status(500).send("Error fetching videos.");
      }
    } else if (keywords.length > 1) {
      // Scenario 2: Multiple keywords - use $all with case-insensitive regex for each keyword
      try {
        const matchingVideos = await videosDB.find({
          tags: {
            $all: keywords.map((keyword) => new RegExp(keyword, "i")),
          },
        });
        console.log("Matching Videos (all keywords):", matchingVideos);
        res.send(matchingVideos);
      } catch (error) {
        console.error("Error fetching videos by all keywords:", error);
        res.status(500).send("Error fetching videos.");
      }
    } else {
      // Scenario 3: No keywords (empty search) - you might want to handle this differently
      console.log("No keywords in search query.");
      res.send([]); // Or perhaps return all videos, or a message
    }
  } else {
    console.log("No search query provided.");
    res.status(400).send("Search query is required.");
  }
};

module.exports.addView = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Video ID is required." });
  }

  try {
    const updatedVideo = await videosDB.findOneAndUpdate(
      { _id: id },
      { $inc: { views: 1 } },
      {
        new: true,
        upsert: true,
        select: "-URL", // This is the key change
      }
    );

    if (!updatedVideo) {
      return res.status(404).json({ message: "Video not found." });
    }

    return res.status(200).json({
      message: "View count updated successfully.",
      video: updatedVideo,
    });
  } catch (error) {
    console.error("Error updating view count:", error);
    return res.status(500).json({ message: "Internal server error." });
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
};

module.exports.getOneVideo = async (req, res) => {
  console.log("getonevideo");
  const { id } = req.query;
  console.log(id);

  try {
    const video = await videosDB.findById(id); // or use findOne({ _id: id })
    console.log(video);

    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    res.status(200).json(video);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get video" });
  }
};



