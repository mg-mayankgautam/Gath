const path = require('path');
const express = require('express');
const router = express.Router();
require("dotenv").config();
// const verifyJWT = require('../middleware/verifyJWT')

const refreshTokenController = require('../controller/refreshTokenController');

router.get('/',refreshTokenController.handleRefreshToken)


module.exports = router;