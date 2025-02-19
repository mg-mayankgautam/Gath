const path = require('path');
const express = require('express');
const router = express.Router();
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
// require("dotenv").config();

const videosController = require('../controller/videosController');



router.post('/post', upload.array("video"), videosController.postVideo);
router.get('/get', videosController.getVideos);

module.exports = router;
