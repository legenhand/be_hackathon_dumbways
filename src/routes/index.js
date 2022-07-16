const express = require('express');
const { login, register, checkAuth } = require('../controllers/auth');
const { auth } = require('../middlewares/auth');
const { addGames } = require('../controllers/games');
const { uploadFile } = require('../middlewares/uploadFile');

const router = express.Router();

// Route Register
router.post('/auth/register', register);

// Route Login
router.post('/auth/login', login);

// Route Check Auth
router.get('/check-auth', auth, checkAuth);


// Route Games
router.post('/game', auth, uploadFile(), addGames);

module.exports = router;