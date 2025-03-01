const User = require('../models/User');
const Store = require('../models/Store');
const { UnauthenticatedError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const register = async (req, res) => {
   const {
      name,
      nif,
      email,
      phone,
      iban,
      commerce,
      province,
      address,
      owner,
      createdAt,
   } = req.body;

   const user = await User.findById(owner);

   if (!user) {
      throw new UnauthenticatedError('Usuário não encontrado.');
   }

   const store = new Store({
      name,
      nif,
      email,
      phone,
      iban,
      commerce,
      province,
      address,
      owner,
      createdAt,
   });

   await store.save();

   res.status(StatusCodes.CREATED).json({
      msg: 'Loja cadastrada com sucesso!',
      store: store,
   });
};

module.exports = register;
