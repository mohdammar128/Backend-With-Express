const express = require('express')
const blogRoutes = require('./routes/blog');
const dbConnection = require('./configuration/databse');
require('dotenv').config();
// -----------------------------------------------------------------
const app = express();
const PORT = process.env.PORT || 4000;

// ---------------Start Server-----------------------------
app.use(express.json());
app.listen(PORT, (req, res) => {
    console.log('server has started listening request')
})


// ------------Db connection of server with dataBase---------------
dbConnection();

//
app.use('/api/v1', blogRoutes);

// create home routes
app.get('/', (req, res) => {
    console.log("you  are currently at home page");
})

