const videosDB = require("../models/videosDB.js")
// const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
// const { GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
// require('dotenv').config();
// const bucketName = process.env.BUCKET_NAME
// const bucketRegion = process.env.BUCKET_REGION
// const accessKeyId = process.env.ACCESS_KEY_ID
// const secretAccessKey = process.env.SECRET_ACCESS_KEY

// const s3Client = new S3Client({
//     region: bucketRegion,
//     credentials: {
//         accessKeyId,
//         secretAccessKey
//     }
// })

// const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
// const crypto = require('crypto');


module.exports.postVideo = async (req, res) => {

    console.log("Reached post video controller");

    const { tags } = req.body;

    const video = req.files[0];
    console.log(tags, video);


    // const fileName = generateFileName();

    // const uploadParams = {
    //     Bucket: bucketName,
    //     Body: compressedImageBuffer,
    //     Key: `${fileName}.webp`, // Save as WebP
    //     ContentType: 'image/webp',
    // };

    // await s3Client.send(new PutObjectCommand(uploadParams));
    // const URL = `https://${bucketName}.s3.ap-south-1.amazonaws.com/${fileName}.webp`;

    //hardcoded URL
    // const URL = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
    // const URL ='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
    const URL ='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'

    let newvideo = new videosDB({ URL, tags });

    newvideo.save()
        .then(video => {
            console.log(video);
            res.send(true);
        })
        .catch((error) => {
            console.log(error);
            res.send(false);
            // res.status(500).json({ error: "Failed to post love letter" });
        })


};


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