const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const fs = require('fs');
const path = require('path');
const { BadRequestError } = require('../errors');

const register = async (req, res) => {
   const { name, email, password } = req.body;

   let alvara = null;

   if (!req.file) {
      throw new BadRequestError('Envie uma imagem da alvará de comerciante');
   }

   alvara = `${Date.now()}${path.extname(req.file.originalname)}`;

   const uploadPath = path.join(process.cwd(), 'src', 'uploads', alvara);

   const newSeller = new User({
      name,
      email,
      password,
      role: 'vendedor',
      alvara,
   });

   await newSeller.save();

   fs.writeFileSync(uploadPath, req.file.buffer);

   const token = newSeller.createJWT();

   res.status(StatusCodes.CREATED).json({
      user: {
         msg: 'Conta cadastrada com sucesso!',
         name: newSeller.name,
         role: newSeller.role,
      },
      token,
   });
};

module.exports = register;
