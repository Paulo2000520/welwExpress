const verifySeller = async (req, res, next) => {
   try {
      if (!req.user || req.user.role !== 'vendedor') {
         return res.status(403).json({
            message: 'Acesso negado. Apenas vendedores podem cadastrar lojas.',
         });
      }
      next();
   } catch (error) {
      res.status(500).json({ message: 'Erro interno no servidor' });
   }
};

module.exports = verifySeller;
