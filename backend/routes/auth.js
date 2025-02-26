const path = require('path');
const express = require('express');
const router = express.Router();

const authController = require('../controller/authController');


router.post('/login', authController.logIn)
router.post('/addemployee', authController.addEmployee);
router.post('/delete-user', authController.deleteEmployee);
router.get('/getallemployees', authController.getAllEmployees);
router.post('/change-password', authController.changeEmpPassword);
// router.post('/logout', authController.logout);


module.exports = router;