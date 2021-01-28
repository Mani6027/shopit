const Product = require('../models/product');

//create new prodcut => /api/v1/product/new
exports.newProduct = async(req, res, next) => {
    
    const product =  await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
}

// Get all products => api/v1/products
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

