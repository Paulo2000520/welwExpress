const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
   const { nome, email, password } = req.body;

   const newUser = new User({
      nome,
      email,
      password,
      role: 'comprador',
   });

   await newUser.save();

   const token = newUser.createJWT();

   res.status(StatusCodes.CREATED).json({
      user: { msg: 'Conta cadastrada com sucesso!', nome: newUser.nome },
      token,
   });
};

const login = async (req, res) => {
   const { email, password } = req.body;

   if (!email || !password) {
      throw new BadRequestError(
         'Por favor, insira o seu email e palavra-passe!'
      );
   }

   const user = await User.findOne({ email });

   if (!user) {
      throw new UnauthenticatedError(
         'Não existe uma conta associada a este email!'
      );
   }

   const checkPassword = await user.comparePassword(password);

   if (!checkPassword) {
      throw new UnauthenticatedError('Palavra-passe incorreta!');
   }

   const token = user.createJWT();

   res.status(StatusCodes.OK).json({ user: { nome: user.nome }, token });
};

module.exports = { register, login };
