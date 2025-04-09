const Product = require('../models/Product');
const Store = require('../models/Store');
const { NotFoundError, BadRequestError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getAllProducts = async (req, res) => {
   const store = await Store.findOne({ owner: req.user.userId });

   if (!store) {
      throw new NotFoundError('Loja não encontrada!');
   }

   const products = await Product.find({ storeId: store._id });

   res.status(StatusCodes.OK).json({ products, nHibts: products.length });
};

const createProduct = async (req, res) => {
   const store = await Store.findOne({ owner: req.user.userId });

   if (!store) {
      throw new NotFoundError('Loja não encontrada!');
   }

   const product = await Product.create({ ...req.body, storeId: store._id });

   res.status(StatusCodes.CREATED).json({ product });
};

const getProduct = async (req, res) => {
   const {
      user,
      params: { id: productId },
   } = req;

   const store = await Store.find({ owner: user.userId });

   const product = await Product.find({
      _id: productId,
      storeId: store[0]._id,
   });

   if (product.length === 0) {
      throw new BadRequestError(
         `Não existe nenhum produto com este ID ${productId}`
      );
   }

   res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
   const {
      user,
      params: { id: productId },
   } = req;

   const store = await Store.find({ owner: user.userId });

   if (!store) {
      throw new NotFoundError('Loja não encontrada!');
   }

   const product = await Product.findOneAndUpdate(
      { _id: productId, storeId: store[0]._id },
      req.body,
      { new: true, runValidators: true }
   );

   if (!product) {
      throw new BadRequestError(
         `Não existe nenhum produto com este ID ${productId}`
      );
   }

   res.status(StatusCodes.OK).json({
      msg: 'Produto atualizado com sucesso!',
      product,
   });
};

const deleteProduct = async (req, res) => {
   const {
      user,
      params: { id: productId },
   } = req;

   const store = await Store.find({ owner: user.userId });

   if (!store) {
      throw new NotFoundError('Loja não encontrada!');
   }

   const product = await Product.findOneAndDelete({
      _id: productId,
      storeId: store[0]._id,
   });

   if (!product) {
      throw new NotFoundError(
         `Não existe nenhum produto com este ID ${productId}`
      );
   }

   res.status(StatusCodes.OK).json({ msg: 'Produto eliminado com sucesso!' });
};

module.exports = {
   getAllProducts,
   createProduct,
   getProduct,
   updateProduct,
   deleteProduct,
};
