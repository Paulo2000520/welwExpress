const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const register = async (req, res) => {
   const { nome, email, password, alvara } = req.body;

   const newSeller = new User({
      nome,
      email,
      password,
      role: 'vendedor',
      alvara,
   });

   await newSeller.save();

   const token = newSeller.createJWT();

   res.status(StatusCodes.CREATED).json({
      user: {
         msg: 'Conta cadastrada com sucesso!',
         nome: newSeller.nome,
      },
      token,
   });
};

module.exports = register;
