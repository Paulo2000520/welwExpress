require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const cors = require('cors');

const connectDB = require('./src/db/connect');

app.use(express.json());

app.use(cors());
app.use(
   cors({
      origin: ['http://localhost/api/v1', 'http://127.0.0.1:5500'],
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
   })
);

const sellerAuthRouter = require('./src/routers/user');
const userAuthRouter = require('./src/routers/user');
const storeRegisterRouter = require('./src/routers/store');
const employeeRouter = require('./src/routers/user');

const productsRouter = require('./src/routers/products');

const notFound = require('./src/middlewares/not-found');
const errorHandlerMiddleware = require('./src/middlewares/error-handler');

app.use(process.env.BASE_URL, sellerAuthRouter);
app.use(process.env.BASE_URL, userAuthRouter);
app.use(process.env.BASE_URL, employeeRouter);

app.use(process.env.BASE_URL, storeRegisterRouter);

app.use(process.env.BASE_URL, productsRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
   try {
      await connectDB(process.env.MONGO_URI);
      app.listen(port, () =>
         console.log(`Server is listening on port http://localhost:${port}...`)
      );
   } catch (error) {
      console.log(error);
   }
};

start();
