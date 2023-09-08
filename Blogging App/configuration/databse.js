const mongoose = require('mongoose')

require('dotenv').config();
const dbConnection = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log("connection Successfull");
        })
        .catch((err) => {
            console.log("Erorr during data base connection");
            console.error(err);
            process.exit(1);
        });

}

module.exports = dbConnection;