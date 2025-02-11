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

const sellerAuthRouter = require('./src/routers/seller');
const authRouter = require('./src/routers/user');

const notFound = require('./src/middlewares/not-found');
const errorHandlerMiddleware = require('./src/middlewares/error-handler');

app.use('/api/v1/welwexpress', sellerAuthRouter);
app.use('/api/v1/welwexpress', authRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
   try {
      connectDB(process.env.MONGO_URI);
      app.listen(port, () =>
         console.log(`Server is listening on port ${port}...`)
      );
   } catch (error) {
      console.log(error);
   }
};

start();
