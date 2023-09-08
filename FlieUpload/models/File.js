const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    tag: {
        type: String
    }

});

const File = mongoose.model("File", fileSchema);
module.exports = File;