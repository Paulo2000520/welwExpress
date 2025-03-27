require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const cors = require('cors');

const connect = require('./src/db/connect');

app.use(express.json());

app.use(
   cors({
      origin: ['http://localhost/api/v1', 'http://127.0.0.1:5500'],
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
   })
);

const sellerAuthRouter = require('./src/routers/user');
const userAuthRouter = require('./src/routers/user');
const employeeAuthRouter = require('./src/routers/user');

const storeRouter = require('./src/routers/store');

const productsRouter = require('./src/routers/products');

const notFound = require('./src/middlewares/not-found');
const errorHandlerMiddleware = require('./src/middlewares/error-handler');

app.use(process.env.BASE_URL, sellerAuthRouter);
app.use(process.env.BASE_URL, userAuthRouter);
app.use(process.env.BASE_URL, employeeAuthRouter);

app.use(process.env.BASE_URL, storeRouter);

app.use(process.env.BASE_URL, productsRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
   try {
      await connect(process.env.MONGO_URI);
      app.listen(port, () =>
         console.log(`Server is running at http://localhost:${port}...`)
      );
   } catch (error) {
      console.log(error);
   }
};

start();
