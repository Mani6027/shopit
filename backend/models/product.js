const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    price:{
        type: Number,
        required: [true, 'Please enter product name'],
        maxlength: [5, 'Product name cannot exceed 5 characters'],
        default: 0.0,
    },
    description:{
        type: String,
        required: [true, 'Please enter product description'],
    },
    rating:{
        type: Number,
        default: 0,
    },
    images:[
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true 
            },
        }
    ],
    category: {
        type: String,
        required: [true, 'Please select category for this product'],
        enum:{
            values: [
                'Electronics', 
                'Headphones',
                'Laptops', 
                'Cameras', 
                'Accessories', 
                'Food',
                'Books', 
                'Clothes/shoes', 
                'Beauty/Health', 
                'Outdoor', 
                'Home'],
        message: 'Please seldct correct category for product'
        }
    },
    seller: {
        type: String,
        required: [true, 'Please enter product seller']
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        maxLength: [5, 'Product name cannot exceed 5 characters'],
        default: 0
    },
    numOfReviews:{
        type: Number,
        default: 0
    },
    reviews:[{
        name:{
            type: String,
            required: true,
        },
         rating:{
             type: Number,
             required: true
         },
         comment: {
             type: String,
             required: true
         }
    }],
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('product', productSchema);
