const Product = require('../models/product');
const mongoose = require('mongoose');
const APIFeatures = require('../utils/apiFeatures')

const ErrorHandler = require('../utils/errorHandler');
const asyncErrorHandler = require('../middlewares/catchAsyncErrors');

// Create new prodcut => /api/v1/product/new
exports.newProduct = asyncErrorHandler(
    async(req, res, next) => {
    
        const product =  await Product.create(req.body);
    
        res.status(201).json({
            success: true,
            product
        })
    }
)

// Get all products => /api/v1/products
exports.getProducts = asyncErrorHandler(
    async (req, res, next) => {

        const apiFeatures = new APIFeatures(Product.find(), req.query)
                                .search()
                                .filter()
        const products = await apiFeatures.query;

        res.status(200).json({
            success: true,
            count: products.length,
            products
        })
    }
)

// Get single product details => /api/v1/product/:id
exports.getSingleProduct = asyncErrorHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    
    if(!product){
        return next(new ErrorHandler('Product not found', 400))
    }
    
    res.status(200).json({
        success: true,
        product
    })
})

// Update product => /api/v1/product/:id
exports.updateProdcut = asyncErrorHandler(
    async (req, res, next) => {
        let product = await Product.findById(req.params.id);
    
        if(!product){
            return next(new ErrorHandler('Product not found', 400))
        }
    
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
    
        res.status(200).json({
            success: true,
            product
        })
    }
    
)

// Deleted product  => /api/v1/admin/product/:id
exports.deleteProduct = asyncErrorHandler(async (req, res, next) => {
    let product;
    product = await Product.findById(req.params.id);
    
    if(!product){
        return next(new ErrorHandler('Product not found', 400))
    }

    await product.remove();
    res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
    })
}) 
