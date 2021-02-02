const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Check user is authenticated or not
exports.isAuthentcatedUser = catchAsyncErrors(async (req, res, next) => {
    const {token} = req.cookies

    if(!token) {
        return next(new ErrorHandler('Login first to access this resource', 401));
    }

    const decode = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = await User.findById(decode.id);

    next();
})