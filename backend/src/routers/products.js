const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authentication');
const verifySeller = require('../middlewares/verify-seller');
const upload = require('../middlewares/upload');

const {
   getAllProducts,
   getProduct,
   createProduct,
   updateProduct,
   deleteProduct,
} = require('../controllers/products');

router
   .route('/products')
   .all(auth, verifySeller)
   .get(getAllProducts)
   .all(upload.single('image'))
   .post(createProduct);

router
   .route('/products/:id')
   .all(auth, verifySeller)
   .get(getProduct)
   .patch(updateProduct)
   .delete(deleteProduct);

module.exports = router;
