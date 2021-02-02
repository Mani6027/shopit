const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');

// Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(
    async (req, res, next) => {
        
        const {name, email, password} = req.body;
        const user = await User.create({
            name, 
            email, 
            password, 
            avatar:{
                public_id: 'k1xf2D7jWUs', 
                url: 'https://unsplash.com/photos/k1xf2D7jWUs'
            }
        })

        sendToken(user, 200, res);
    }
)


// Login user => /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const {email, password} = req.body;

    // Checks if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email and Password', 400))
    }

    // Findind email and password in db
    const user = await User.findOne({email: email}).select('+password');

    if(!user) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    // checks if password is correct or not
    const isPasswordMatch = await user.comparePassword(password);
    if(!isPasswordMatch) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    sendToken(user, 200, res);
})


// Logout user => /api/v1/Logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})
