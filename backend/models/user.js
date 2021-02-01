const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters']
    },
    email:{
        type: String,requored: [true,'Please enter your email address'],
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

module.exports = mongoose.model('User', userSchema);
