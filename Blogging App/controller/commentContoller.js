
// import model 
const Posts = require('../model/postSchema');
const Comment = require('../model/commentSchema');

//naye tareekey sey likha hai isko
const writeComment = async (req, res) => {
    try {
        //fetch  data from request body
        const { post, userName, body } = req.body;
        //create comment object
        const comment = new Comment({
            post, userName, body
        });
        // save new comment into the data base 
        const savedComment = await comment.save();

        //find the post by Id ,add the new comments to its comment array
        const updatedPost = await Posts.findByIdAndUpdate(post, { $push: { comment: savedComment._id } }, { new: true })
            .populate('comment')
            .exec();
        res.status(200).json({
            sucess: true,
            message: 'successfully created',
            data: updatedPost
        });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            sucess: false,
            message: 'server Side  error'
        });
    }

}

module.exports = writeComment;