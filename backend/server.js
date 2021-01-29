const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/databse');

// Handle uncaughtException
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down due to uncaught exception');
    process.exit(1);
})

// Setting up config file
dotenv.config({path: 'backend/config/config.env'});

// Connecting to database
connectDB();

const server = app.listen(process.env.PORT , () => {
    console.log(`Server is running on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
});

// Handle unhandle promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down the server due to unhandle promise rejection');
    server.close(() => {
        process.exit(1);
    });
})
