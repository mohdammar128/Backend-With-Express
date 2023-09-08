//import express
const express = require('express');
const cloudinary = require('cloudinary').v2;
// create server
const app = express();
//import dotenv
require('dotenv').config();
const PORT = process.env.PORT || 4000;


//start server
app.listen(PORT, (req, res) => {
    console.log(`Server is runnnig on port ${PORT}`)
});

//middle where for parsing req and file
app.use(express.json()); //parser
const fileUpload = require('express-fileupload')
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
})) //parser


// DATA BASE CONNECTION
const dbconnect = require('./config/database');
dbconnect();

// media server connection

const cldConnect = require('./config/cloudinary');
cldConnect();


//route
const router = require('./routes/fileUpload');
app.use('/api/v1', router);

app.get('/', (req, res) => {
    console.log("hello ji");
})