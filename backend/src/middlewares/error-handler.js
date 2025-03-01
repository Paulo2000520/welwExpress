const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
   let customError = {
      statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      msg: err.message || 'Algo ocorreu mal, tente mais tarde.',
   };

   if (err.name === 'ValidationError') {
      customError.msg = Object.values(err.errors)
         .map((item) => item.message)
         .join(' ');

      customError.statusCode = StatusCodes.BAD_REQUEST;
   }

   if (err.code && err.code === 11000) {
      const error = !err.keyValue
         ? 'Algo ocorreu mal, tente mais tarde.'
         : Object.keys(err.keyValue);
      const typeof_msg = typeof error;

      const duplicateMsg = `Já existe um usuário com este ${
         typeof_msg === 'object' ? error[0] : ''
      }, tente outro.`;

      customError.msg = duplicateMsg;
      customError.statusCode = StatusCodes.BAD_REQUEST;
   }

   res.status(customError.statusCode).json(customError.msg);
};

module.exports = errorHandlerMiddleware;
