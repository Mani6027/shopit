const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/databse');

// setting up config file
dotenv.config({path: 'backend/config/config.env'});

// Connecting to database
console.log('Connecting to db ')
connectDB();

const server = app.listen(process.env.PORT , () => {
    console.log(`Server is running on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
});

