const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
   if (err instanceof Error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: err.message });
   }

   res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
      'Algo correu mal, tente novamente mais tarde!'
   );
};

module.exports = errorHandlerMiddleware;
