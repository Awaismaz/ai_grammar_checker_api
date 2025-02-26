const express = require('express');
const { register, login, logout, getUserSession} = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/session', getUserSession)

module.exports = router;
