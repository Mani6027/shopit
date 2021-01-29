const Product = require('../models/product');
const dotenv = require('dotenv');
const connectDatabase = require('../config/databse');

const productsData = require('../data/product.json');

// Setting ENV
dotenv.config({path: 'backend/config/config.env'})

connectDatabase();

// NOTE: Be careful, running this function will delete all your data from Product schema
const seedProduct = async () => {
    try{
        await Product.deleteMany();
        console.log('Products are deleted!!');

        await Product.insertMany(productsData);
        console.log('Prodcuts are inserted !!');

    }catch(err){
        console.log(err);
        console.log('Error occurred while seeding data to DB');
        process.exit();
    }
}

seedProduct();