const express = require('express');
const router = express.Router();
const {
   createCart,
   getCart,
   updateCart,
   deleteFromCart,
   deleteCart,
} = require('../controllers/cart');

router.route('/cart').post(createCart).get(getCart);
router.delete('/cart/clear', deleteCart);
router.route('/cart/:id').patch(updateCart).delete(deleteFromCart);

module.exports = router;
