const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

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

        const token = user.jwtToken();

        res.status(201).json({
            success: true,
            token
        })

    }
)
