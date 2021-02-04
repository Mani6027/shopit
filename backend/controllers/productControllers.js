const Product = require('../models/product');
const APIFeatures = require('../utils/apiFeatures')

const ErrorHandler = require('../utils/errorHandler');
const asyncErrorHandler = require('../middlewares/catchAsyncErrors');

// Create new prodcut => /api/v1/product/new
exports.newProduct = asyncErrorHandler(
    async(req, res, next) => {
        
        // Todo: Handle same product storing in db
        req.body.user = req.user.id

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

        const resultPerPage = 8;
        const productsCount = await Product.countDocuments()

        const apiFeatures = new APIFeatures(Product.find(), req.query)
                                .search()
                                .filter()
                                .pagination(resultPerPage)

        const products = await apiFeatures.query;

        // setTimeout(() =>{
        //     res.status(200).json({
        //         success: true,
        //         productsCount,
        //         products
        //     })
        // }, 3000)
        res.status(200).json({
            success: true,
            productsCount,
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


// Craete new review => /api/v1/review
exports.createProductReview = asyncErrorHandler(async (req, res, next) => {
    const {rating, comment, productId} = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString())
    
    if(isReviewed){
        product.reviews.forEach(review => {
            if(review.user.toString() === req.user._id.toString){
                review.comment = comment;
                review.rating = rating;
            }
        })
    }else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success: true,
    })
})

// Get product reviews => /api/v1/reviews
exports.getProductReviews = asyncErrorHandler(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// Delete review of a product => /api/v1/review
exports.deleteProductReview = asyncErrorHandler(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.reviewId.toString())

    const numOfReviews = reviews.length;

    let rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
    rating = isNaN(rating) ? 0 : rating;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        rating,
        numOfReviews
    },{
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})
