const express = require('express');
const {checkGrammar} = require('../controllers/grammerCheckController');
const router = express.Router();
const {isAuthenticated} = require('../middlewares/authmiddleware');

router.post('/', isAuthenticated, checkGrammar);

module.exports = router;
