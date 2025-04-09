const createCart = async (req, res) => {
   res.send('Create cart');
};

const getCart = async (req, res) => {
   res.send('Get cart');
};

const updateCart = async (req, res) => {
   res.send('Update cart');
};

const deleteFromCart = async (req, res) => {
   res.send('Delete From cart');
};

const deleteCart = async (req, res) => {
   res.send('delete cart');
};

module.exports = {
   createCart,
   getCart,
   updateCart,
   deleteFromCart,
   deleteCart,
};
