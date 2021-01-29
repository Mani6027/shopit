const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    if(process.env.NODE_ENV === 'DEVELOPMENT'){
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errorMessage: err.stack,
        })
    }
    if(process.env.NODE_ENV === 'PRODUCTION'){
        let error = {...err}
        
        // Handle cast error/ wrong mongoose object Id
        if(err.name === 'CastError'){
            const message = `Resource not found.Invalid '${err.value}' for key: ${err.path}`
            error = new ErrorHandler(message, 400);
        }
        else if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorHandler(message, 400);
        }
        else{
            error.message = err.message
        }

        res.status(err.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Erorr'
        })
    }
}
