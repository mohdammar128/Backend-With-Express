//for creating model we have to use mongoose library
const mongoose = require('mongoose')
//call back funtion
const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            maxLength: 50
        },
        body: {
            type: String,
            required: true,
            maxLength: 500
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now()
        },
        comment: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }],
        like: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Likes'
        }],

    }
);



module.exports = mongoose.model("Posts", postSchema);


