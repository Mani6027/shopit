const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters']
    },
    email:{
        type: String,
        required: [true,'Please enter your email address'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Your password must be longer than 6 characters'],
        select: false, // dont want to display the password of the user
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        defualt: Date.now()
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

// Encrypting password before saving
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        next();
    }

    this.password = await bcrypt.hash(this.password, 10)
})

// Compare user password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

// JWT token method
userSchema.methods.jwtToken = function() {
    return JWT.sign({id: this.id}, process.env.JWT_PRIVATE_KEY, {
        expiresIn: process.env.JWT_EXPIRATION_TIME
    });
}

//Generate password reset token
userSchema.methods.getResetPasswordToken = function(){
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set expire token
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

    return resetToken;
}

module.exports = mongoose.model('User', userSchema);
