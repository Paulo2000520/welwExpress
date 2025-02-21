const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const fs = require('fs');
const path = require('path');
const { BadRequestError } = require('../errors');

const register = async (req, res) => {
   const { nome, email, password } = req.body;

   const newSeller = new User({
      nome,
      email,
      password,
      role: 'vendedor',
   });

   let alvara = null;

   if (!req.file) {
      throw new BadRequestError('Envie uma imagem da alvará de comerciante');
   }

   alvara = `${Date.now()}${path.extname(req.file.originalname)}`;

   const uploadPath = path.join(process.cwd(), 'src', 'uploads', alvara);

   fs.writeFileSync(uploadPath, req.file.buffer);

   newSeller.alvara = alvara;

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
