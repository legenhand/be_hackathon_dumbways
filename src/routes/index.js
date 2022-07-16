const express = require('express');
const { login, register, checkAuth } = require('../controllers/auth');
const { auth } = require('../middlewares/auth');
const { addGames, getAllGames, getGameById, updateGame, deleteGame, getGameByUserId } = require('../controllers/games');
const { uploadFile } = require('../middlewares/uploadFile');
const { getAllGenre, getGenreById } = require('../controllers/genre');
const { getAllPlatform, getPlatformById } = require('../controllers/platform');
const { addReview, getReviewByGameId, updateReview, deleteReview } = require('../controllers/review');

const router = express.Router();

// Route Register
router.post('/auth/register', register);

// Route Login
router.post('/auth/login', login);

// Route Check Auth
router.get('/check-auth', auth, checkAuth);


// Route Games
router.post('/game', auth, uploadFile(isCreate = true), addGames);
router.get('/games', auth, getAllGames);
router.get('/game/:id', auth, getGameById);
router.get('/my-games', auth, getGameByUserId);
router.patch('/game/:id', auth, uploadFile(), updateGame);
router.delete('/game/:id', auth, deleteGame);

// Route Genre
router.get('/genres', auth, getAllGenre);
router.get('/genre/:id', auth, getGenreById);

// Route platform
router.get('/platforms', auth, getAllPlatform);
router.get('/platform/:id', auth, getPlatformById);

// Route Reviews
router.post('/game/:gameId/review', auth, addReview);
router.get('/game/:gameId/reviews', auth, getReviewByGameId);
router.patch('/game/:gameId/review', auth, updateReview);
router.delete('/review/:id', auth, deleteReview);
module.exports = router;