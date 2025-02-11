const jwt = require('jsonwebtoken');
const { UnautenticatedError } = require('../errors');

const auth = (req, res, next) => {
   const authHeader = req.headears.authentication;

   if (!authHeader && authHeader.startsWith('Bearer')) {
      throw new UnautenticatedError('As credencias estão erradas');
   }

   const token = authHeader.split(' ')[1];

   try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);

      req.user = {
         userId: payload._id,
         nome: payload.nome,
         role: payload.role,
      };
   } catch (error) {
      throw new UnautenticatedError('As credencias estão erradas');
   }
};

module.exports = auth;
