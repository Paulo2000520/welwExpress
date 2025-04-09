const User = require('../models/User');
const Employee = require('../models/Employee');
const Store = require('../models/Store');
const { StatusCodes } = require('http-status-codes');
const fs = require('fs');
const path = require('path');
const { BadRequestError, NotFoundError } = require('../errors');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const sendEmail = require('./nodemailer');

const generatePassword = (length = 10) => {
   return crypto.randomBytes(length).toString('hex').slice(0, length);
};

const seller = async (req, res) => {
   const { name, email, password } = req.body;

   let alvara = null;

   if (!req.file) {
      throw new BadRequestError(
         'Envie uma imagem da sua alvará de comerciante'
      );
   }

   alvara = `${Date.now()}${path.extname(req.file.originalname)}`;

   const uploadPath = path.join(process.cwd(), 'uploads', alvara);

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
   let { name, bi, email, phone, address, store } = req.body;

   const isStore = await Store.findById(store);

   if (!isStore) {
      throw new NotFoundError('Nenhuma loja com este ID.');
   }

   const employeePassword = generatePassword();

   const salt = await bcrypt.genSalt(10);
   const password = await bcrypt.hash(employeePassword, salt);

   if (!sendEmail(email, isStore.name, employeePassword)) {
      throw new Error('Algo correu mal, tente mais tarde!');
   }

   const employee = new Employee({
      role: 'funcionario(a)',
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
