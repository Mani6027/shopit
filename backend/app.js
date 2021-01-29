const express = require('express');
const app = express()

const errorMiddlewares = require('./middlewares/errors');

app.use(express.json())

// Import all the routes
const productRouter = require('./routes/products');

app.use('/api/v1', productRouter);

// Middlewares to handle error
app.use(errorMiddlewares)

module.exports = app;