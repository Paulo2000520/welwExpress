const getAllProducts = async (req, res) => {
   res.send('Get all products');
};

const createProduct = async (req, res) => {
   res.send('Create product');
};

const getProduct = async (req, res) => {
   res.send('Get single product');
};

const updateProduct = async (req, res) => {
   res.send('Update product');
};

const deleteProduct = async (req, res) => {
   res.send('delete product');
};

module.exports = {
   getAllProducts,
   createProduct,
   getProduct,
   updateProduct,
   deleteProduct,
};
