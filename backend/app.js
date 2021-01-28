const express = require('express');
const app = express()

app.use(express.json()) 
// Import all the routes
const productRouter = require('./routes/products');

app.use('/api/v1', productRouter);

module.exports = app;