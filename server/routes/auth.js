const express = require('express');
const router = express.Router();
const { register, verifyOTP, sendOTP, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/login', login);

module.exports = router;
