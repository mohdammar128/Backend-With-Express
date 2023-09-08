const mongoose = require('mongoose');

const signUpSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true,

    },
    role: {
        type: String,
        enum: ['Admin', "Student", "visitor"]
    }

});

module.exports = mongoose.model("User", signUpSchema);