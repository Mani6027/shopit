const Order = require('../models/order');
const Prodcut = require('../models/product');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

//Create a new order => /api/v1/order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        paymentInfo,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(), 
        user: req.user._id,
    })

    res.status(200).json({
        success: true,
        order
    })
})

// Get single order => /api/v1/order/:id
exports.getSigleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if(!order){
        return next(new ErrorHandler('No order found with this ID', 404));
    }

    res.status(200).json({
        success: true,
        order
    })
})

// Get my order => /api/v1/order/me
exports.myOrder = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({user: req.user.id});

    // if(!order){
    //     return next(new ErrorHandler('No order found with this ID', 404));
    // }

    res.status(200).json({
        success: true,
        orders
    })
})
