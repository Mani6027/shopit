const express = require('express');
const app = express()
const cookieparser = require('cookie-parser');

const errorMiddlewares = require('./middlewares/errors');

app.use(express.json())
app.use(cookieparser())

// Import all the routes
const productRouter = require('./routes/products');
const authRouter = require('./routes/auth');
const orderRouter = require('./routes/order');

app.use('/api/v1', productRouter);
app.use('/api/v1', authRouter);
app.use('/api/v1', orderRouter);

// Middlewares to handle error
app.use(errorMiddlewares)

module.exports = app;
