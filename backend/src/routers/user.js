const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const auth = require('../middlewares/authentication');
const verifySeller = require('../middlewares/verify-seller');

const {
   register,
   login,
   getUser,
   updateUser,
   deleteUser,
} = require('../controllers/user');

const { seller, employee } = require('../controllers/store.users');

router.post('/auth/register', register);

router.post('/auth/employee-register', auth, verifySeller, employee);
router.post('/auth/seller-register', upload.single('alvara'), seller);

router.post('/auth/login', login);

router
   .route('/users/:id')
   .all(auth)
   .get(getUser)
   .patch(updateUser)
   .delete(deleteUser);

module.exports = router;
