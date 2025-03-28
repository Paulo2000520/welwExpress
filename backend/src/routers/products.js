const express = require('express');
const router = express.Router();

const {
   getAllProducts,
   getProduct,
   createProduct,
   updateProduct,
   deleteProduct,
} = require('../controllers/products');

router.route('/products/').get(getAllProducts).post(createProduct);
router
   .route('/products/:id')
   .get(getProduct)
   .patch(updateProduct)
   .delete(deleteProduct);

module.exports = router;
