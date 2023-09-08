//import schema
const Likes = require('../model/likeSchema');
const Posts = require('../model/postSchema');

//writing controller for likes
const createLikes = async (req, res) => {
    try {

        const { post, userName } = req.body;
        const newLikes = new Likes({ post, userName });
        const savedLikes = await newLikes.save();
        const updatePost = await Posts.findByIdAndUpdate(post, { $push: { like: savedLikes._id } }, { new: true }).populate('like').exec();
        res.json({
            data: updatePost,
            message: 'successfully created'
        })
    }
    catch (err) {
        console.error("Internal server error")
        res.json({
            message: "Server Error"
        })
    }
}

module.exports = createLikes;   