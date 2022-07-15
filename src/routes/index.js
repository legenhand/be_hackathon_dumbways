const express = require('express');
const { login, register, checkAuth } = require('../controllers/auth');
const { auth } = require('../middlewares/auth');

const router = express.Router();

// Route Register
router.post('/register', register);

// Route Login
router.post('/login', login);

// Route Check Auth
router.get('/check-auth', auth, checkAuth);

module.exports = router;
