const express = require('express');
const router = express.Router();
const register = require('../controllers/seller.auth');
const upload = require('../middlewares/upload');

router.post('/seller-register', upload.single('alvara'), register);

module.exports = router;
