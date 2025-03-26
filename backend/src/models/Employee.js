const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
   role: {
      type: String,
      enum: ['admin', 'comprador', 'vendedor', 'funcionario'],
      required: true,
   },
   name: {
      type: String,
      required: [true, 'Insira o nome completo.'],
      minlength: 3,
      maxlength: 20,
      trim: true,
      capitalise: true,
   },
   email: {
      type: String,
      required: [true, 'Insira o email.'],
      match: [
         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
         'Por favor, forneça um email válido.',
      ],
      unique: true,
      lowercase: true,
   },
   password: {
      type: String,
      required: [true, 'Insira uma palavra passe.'],
      minlength: [6, 'Palavra-passe deve conter mais de 6 caracteres.'],
   },
   bi: {
      type: String,
      required: [true, 'O B.I. é obrigatório!'],
      unique: true,
      validate: {
         validator: function (value) {
            return regexBI.test(value); // `value` é o valor inserido no campo B.I.
         },
         message: (props) => `${props.value} não é um B.I. válido!`,
      },
   },
   phone: {
      type: String,
      required: [true, 'O número de telefone é obrigatório.'],
      unique: true,
      match: [
         /^(?:\+244\s?)?9\d{2}[\s.-]?\d{3}[\s.-]?\d{3}$/,
         'Insira um número de telefone válido.',
      ],
   },
   address: {
      type: String,
      required: [true, 'O endereço é obrigatório.'],
   },
   store: {
      type: mongoose.Schema.Types.ObjectId,
      required: [
         true,
         'Insira o id da loja onde o funcionário será cadastrado.',
      ],
      ref: 'lojas',
   },
   createdAt: {
      type: Date,
      default: Date.now(),
   },
});
