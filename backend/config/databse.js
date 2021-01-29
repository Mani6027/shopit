const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).then(con => {
        console.log(`Mongodb connected with: ${con.connection.host}`);
    })
    // Will handle catch in server.js module using unhandledpromiserejection.
}

module.exports = connectDatabase;