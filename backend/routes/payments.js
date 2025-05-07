const path = require('path');
const express = require('express');
const router = express.Router();
require("dotenv").config();

const paymentsController = require('../controller/paymentsController');

router.post('/create-order', paymentsController.createOrder)
router.post('/verify-payment', paymentsController.verifyPayment)


module.exports = router;