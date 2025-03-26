const express = require('express');
const router = express.Router();

const auth = require('../middlewares/authentication');
const verifySeller = require('../middlewares/verify-seller');

const {
   register,
   getStore,
   updateStore,
   deleteStore,
} = require('../controllers/store');

router.post('/stores', auth, verifySeller, register);
// router.route('/stores').get(getAllStores);
router
   .route('/stores/:id')
   .all(auth, verifySeller)
   .get(getStore)
   .patch(updateStore)
   .delete(deleteStore);

module.exports = router;
