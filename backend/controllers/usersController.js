const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');


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

// Forgot password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});

    if(!user){
        return next(new ErrorHandler('User not found with this email', 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false})

    // Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\n
    If you have not requested this email, then ignore it.`

    try {
        await sendEmail({
            email: user.email,
            subject: 'shopIt Password recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent successfully to : ${user.email}`
        })

    }catch(err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave: false});

        return next(new ErrorHandler(err.message, 500));
    }

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
