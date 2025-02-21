const { StatusCodes } = require('http-status-codes');
const fs = require('fs');

const errorHandlerMiddleware = (err, req, res, next) => {
   let customError = {
      statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      msg: err.message || 'Algo ocorreu mal, tente mais tarde',
   };

   if (err.name === 'ValidationError') {
      customError.msg = Object.values(err.errors)
         .map((item) => item.message)
         .join(' ');

      customError.statusCode = StatusCodes.BAD_REQUEST;
   }

   if (err.code && err.code === 11000) {
      customError.msg = 'Já existe um usuário com este email, tente outro';
      customError.statusCode = StatusCodes.BAD_REQUEST;
   }

   res.status(customError.statusCode).json(customError.msg);
};

module.exports = errorHandlerMiddleware;
