const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).then(con => {
        console.log(`Mongodb connected with: ${con.connection.host}`);
    }).catch( err => {
        console.log('----------------ERROR--------------------')
        console.error(err.message);
        console.log('-----------------------------')
        console.log('Error occurred while connecting to mongodb!!');
    });
}

module.exports = connectDatabase;