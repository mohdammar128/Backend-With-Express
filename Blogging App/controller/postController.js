// import model
const Posts = require('../model/postSchema');

//routing funtion
const createPost = async (req, res) => {
    try {

        const { title, body } = req.body;
        const post = new Posts({ title, body });
        const savePostInDataBase = await post.save();
        res.json({
            data: savePostInDataBase
        })
    }
    catch (err) {
        console.error(err);
        res.json({
            message: "Server side error"
        });
    }
}

module.exports = { createPost }