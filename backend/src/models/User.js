const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Insira o seu nome.'],
      minlength: 3,
      maxlength: 20,
      trim: true,
      capitalise: true,
   },
   email: {
      type: String,
      required: [true, 'Insira o seu email.'],
      match: [
         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
         'Por favor, forneça um email válido.',
      ],
      unique: true,
      lowercase: true,
   },
   password: {
      type: String,
      required: [true, 'Insira uma palavra passe'],
      minlength: [6, 'Palavra-passe deve conter mais de 6 caracteres.'],
   },
   role: {
      type: String,
      enum: ['admin', 'comprador', 'vendedor', 'funcionario'],
      required: true,
   },
   alvara: {
      type: String,
      trim: true,
   },
});

userSchema.pre('save', async function () {
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function () {
   return jwt.sign(
      { userId: this._id, name: this.name, role: this.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_LIFETIME }
   );
};

userSchema.methods.comparePassword = async function (candidatePassword) {
   const isMatch = await bcrypt.compare(candidatePassword, this.password);
   return isMatch;
};

module.exports = mongoose.model('User', userSchema, 'usuarios');
