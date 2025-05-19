// authRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe,updateProfile } = require('../controller/authController');
const { authenticate } = require('../middlewar/authMiddleware');

// Add this route
router.get('/me', authenticate, getMe);
router.put('/updateProfile',authenticate, updateProfile )

// Your existing routes
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;