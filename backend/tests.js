require('dotenv').config();

const Product = require('./src/models/Product');
const connect = require('./src/db/connect');
const express = require('express');
const app = express();
const products = require('./produtos.json');

const populate = async (req, res) => {
   const newProducts = await Product.create(products);
   console.log('success!');
};

const start = async () => {
   try {
      await connect(process.env.MONGO_URI);
      populate();
      app.listen(8080, () => console.log('server running on port 8080'));
   } catch (error) {
      console.log(error);
   }
};

start();
