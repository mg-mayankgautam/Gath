const path = require('path');
const express = require('express');
const router = express.Router();
require("dotenv").config();
const verifyJWT = require('../middlewares/verifyJWT')

const userController = require('../controller/userController');

router.post('/save',verifyJWT,userController.saveToCollection)
router.get('/getsavedvideos',verifyJWT,userController.getSavedVideos)


module.exports = router;