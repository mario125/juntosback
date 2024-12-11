// src/app/routes/authRoutes.js
const express = require('express');
const authController = require('../../interfaces/controllers/authController');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
