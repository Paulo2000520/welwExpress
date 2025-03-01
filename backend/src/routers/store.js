const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authentication');
const verifySeller = require('../middlewares/verify-seller');

const register = require('../controllers/store');

router.post('/store-register', auth, verifySeller, register);

module.exports = router;
