const express = require('express');
const app = express();
const dbConnection = require('./config/dbConnection');

require('dotenv').config();
const Port = process.env.PORT || 4000;

const cookieParser = require('cookie-parser');
app.use(cookieParser())
app.use(express.json())

dbConnection();
const router = require('./routes/user')

app.use('/api/v1', router);

app.listen(Port, (req, res) => {
    console.log(`Serverstarted listening at port ${Port}`);
})
