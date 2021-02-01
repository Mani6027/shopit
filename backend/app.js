const express = require('express');
const app = express()

const errorMiddlewares = require('./middlewares/errors');

app.use(express.json())

// Import all the routes
const productRouter = require('./routes/products');
const authRouter = require('./routes/auth');

app.use('/api/v1', productRouter);
app.use('/api/v1', authRouter);

// Middlewares to handle error
app.use(errorMiddlewares)

module.exports = app;