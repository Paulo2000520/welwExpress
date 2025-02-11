const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/user.auth');

router.post('/registro', register);
router.post('/login', login);

module.exports = router;
