const express = require('express');
const { signup, login, verifyOtp, googleAuth, generateTotpSecret, verifyTotp } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/verify-otp', verifyOtp);
router.post('/google-auth', googleAuth);
router.post('/generate-totp', authMiddleware, generateTotpSecret);
router.post('/verify-totp', verifyTotp);

module.exports = router;