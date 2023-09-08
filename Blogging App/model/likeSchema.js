const mongoose = require('mongoose')
const likeSchema = new mongoose.Schema({
    //kis post per like ker rahey ho
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts'  //ref to the post model
    },
    userName: {
        type: String,
        required: true
    }


}
);

module.exports = mongoose.model("Likes", likeSchema);
