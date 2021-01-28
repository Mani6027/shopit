const Product = require('../models/product');
const mongoose = require('mongoose');

// Create new prodcut => /api/v1/product/new
exports.newProduct = async(req, res, next) => {
    
    const product =  await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
}

// Get all products => /api/v1/products
exports.getProducts = async (req, res, next) => {
    try{
        var products = await Product.find();
    }catch(err){
        console.log('Error occurred while fetching data from DB');
        console.log(err);
    }
    res.status(200).json({
        success: true,
        count: products.length,
        products
    })
}

// Get single product details => /api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
    try{
        const product = await Product.findById(req.params.id);
        
        if(!product){
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }

        res.status(200).json({
            success: true,
            product
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
        // console.log('Error occurred while fetching data from DB');
        // console.log(err);
    }
}


// Update product => /api/v1/product/:id
exports.updateProdcut = async (req, res, next) => {
    try{
        let product = await Product.findById(req.params.id);

        if (!product){
            res.status(404).json({
                success: true,
                message: 'Product not found'
            })
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
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
