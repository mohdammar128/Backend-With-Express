const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
    {
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Posts'  //ref to the post model
        },

        userName: {
            type: String,
            required: true,

        },
        body: {
            type: String,
            required: true,
            maxLength: 100
        }
    }
);

module.exports = mongoose.model("Comment", commentSchema);
