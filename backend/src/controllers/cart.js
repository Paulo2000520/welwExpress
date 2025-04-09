const Cart = require('../models/Cart');
const User = require('../models/User');
const { NotFoundError, BadRequestError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const createCart = async (req, res) => {
   const { userId = null, items = [] } = req.body;

   if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Carrinho vazio ou inválido.' });
   }

   let cart = await Cart.findOne({ userId });

   if (cart) {
      return res.status(StatusCodes.OK).json({ cart });
   }

   cart = await Cart.create({ userId, items });

   res.status(StatusCodes.CREATED).json({ cart });
};

const getCart = async (req, res) => {
   const cart = await Cart.find({ userId: req.user.userId });

   res.status(StatusCodes.OK).json({ cart });
};

const updateCart = async (req, res) => {
   const {
      user: { userId },
      params: { cartId },
      body: { productId, quantity },
   } = req;

   const user = await Cart.findOne({ _id: cartId, userId });

   if (!user) {
      throw new BadRequestError('Nenhum carrinho associado a este usuário.');
   }

   if (!productId || typeof quantity !== 'number') {
      throw new BadRequestError('Produto ou quantidade inválidos.');
   }

   const cart = await Cart.findById(cartId);

   if (!cart) {
      throw new NotFoundError('Nenhum carrinho encontrado.');
   }

   if (!Array.isArray(cart.items)) {
      throw new BadRequestError('Items do carrinho estão inválidos.');
   }

   const indexOfitem = cart.items.findIndex(
      (item) => item.productId.toString() === productId
   );

   if (indexOfitem > -1) {
      if (quantity === 0) {
         cart.items.splice(indexOfitem, 1);
      } else {
         cart.items[indexOfitem].quantity = quantity;
      }
   } else {
      if (quantity > 0) {
         cart.items.push({ productId, quantity });
      }
   }

   await cart.save();

   res.status(StatusCodes.OK).json({ cart });
};

const deleteFromCart = async (req, res) => {
   const {
      user: { userId },
      params: { cartId },
      body: { productId },
   } = req;

   const user = await Cart.findOne({ _id: cartId, userId });

   if (!user) {
      throw new BadRequestError('Nenhum carrinho associado a este usuário.');
   }

   if (!productId) {
      throw new BadRequestError('ID do produto é obrigatório.');
   }

   const cart = await Cart.findById(cartId);

   if (!cart) {
      throw new NotFoundError('Carrinho não encontrado.');
   }

   const size = cart.items.length;

   cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
   );

   if (cart.items.length === size) {
      throw new NotFoundError('Produto não encontrado no carrinho.');
   }

   await cart.save();

   res.status(StatusCodes.OK).json({
      message: 'Produto removido com sucesso.',
      cart,
   });
};

const deleteCart = async (req, res) => {
   const {
      user: { userId },
   } = req;

   const user = await Cart.findOne({ userId });

   if (!user) {
      throw new BadRequestError('Nenhum carrinho associado a este usuário.');
   }

   const cart = await Cart.findOneAndDelete({ userId });

   if (!cart) throw new NotFoundError('Carrinho não encontrado.');

   res.status(StatusCodes.OK).json({ msg: 'Carrinho eliminado com sucesso!' });
};

module.exports = {
   createCart,
   getCart,
   updateCart,
   deleteFromCart,
   deleteCart,
};
