const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Check user is authenticated or not
exports.isAuthentcatedUser = catchAsyncErrors(async (req, res, next) => {
    const {token} = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMTdiMmViY2U5MDY5MzQwMzVkYmFhZiIsImlhdCI6MTYxMjM1NzM0MiwiZXhwIjoxNjEyOTYyMTQyfQ.73Abx-bdkNXjG-fF0qQQbsUfHPBd4WfUVsk1wdcDevU"

    if(!token) {
        return next(new ErrorHandler('Login first to access this resource', 401));
    }

    const decode = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = await User.findById(decode.id);

    next();
})


// Handling user roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to  access this resource`, 403))
        }
        next();
    }
}
