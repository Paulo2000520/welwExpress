const express = require('express');
const router = express.Router();
const {
   createCart,
   getCart,
   updateCart,
   deleteFromCart,
   deleteCart,
} = require('../controllers/cart');
const auth = require('../middlewares/authentication');

router.route('/cart').post(createCart).all(auth).get(getCart);
router.delete('/cart/clear', auth, deleteCart);
router
   .route('/cart/:cartId')
   .all(auth)
   .patch(updateCart)
   .delete(deleteFromCart);

module.exports = router;
