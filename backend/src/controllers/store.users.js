const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const fs = require('fs');
const path = require('path');
const { BadRequestError } = require('../errors');

const seller = async (req, res) => {
   const { name, email, password } = req.body;

   let alvara = null;

   if (!req.file) {
      throw new BadRequestError(
         'Envie uma imagem da sua alvará de comerciante'
      );
   }

   alvara = `${Date.now()}${path.extname(req.file.originalname)}`;

   const uploadPath = path.join(process.cwd(), 'src', 'uploads', alvara);

   const newSeller = new User({
      role: 'vendedor(a)',
      name,
      email,
      password,
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

const employee = async (req, res) => {
   let { name, bi, email, password, phone, address, store } = req.body;

   employee = await Store.findById(store);

   if (!store) {
      throw new BadRequestError(
         'Insira o id da loja onde o funcionário será cadastrado.'
      );
   }

   const employee = new User({
      role: 'funcionario',
      name,
      bi,
      email,
      password,
      phone,
      address,
      store,
   });

   await employee.save();

   const token = employee.createJWT();

   res.status(StatusCodes.CREATED).json({
      user: {
         msg: 'Conta cadastrada com sucesso!',
         name: employee.name,
         role: employee.role,
      },
      token,
   });
};

module.exports = { seller, employee };
