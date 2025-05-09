const path = require('path');
const express = require('express');
const router = express.Router();
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
// require("dotenv").config();

const videosController = require('../controller/videosController');


router.post('/post', upload.array("video"), videosController.postVideo);
router.post('/postmobilevideo', upload.array("video"), videosController.postMobileVideo);

router.post('/view',  videosController.addView);
router.get('/get', videosController.getVideos);
router.get('/getsearchvideos', videosController.getSearchVideos);
router.post('/editinfo', videosController.editInfo);
router.get('/getonevideo', videosController.getOneVideo);

module.exports = router;
