const express = require('express');
const { login, register, checkAuth } = require('../controllers/auth');
const { auth } = require('../middlewares/auth');
const { addGames, getAllGames, getGameById, updateGame, deleteGame, getGameByUserId } = require('../controllers/games');
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
router.get('/games', auth, getAllGames);
router.get('/game/:id', auth, getGameById);
router.get('/my-games', auth, getGameByUserId);
router.patch('/game/:id', auth, uploadFile(), updateGame);
router.delete('/game/:id', auth, deleteGame);

module.exports = router;