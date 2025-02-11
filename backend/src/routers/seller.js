const express = require('express');
const router = express.Router();
const register = require('../controllers/seller.auth');

router.post('/registro-vendedor', register);

module.exports = router;
