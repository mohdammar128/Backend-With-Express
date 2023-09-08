const express = require('express');

const router = express.Router();

const writeComment = require('../controller/commentContoller');
const { createPost } = require('../controller/postController');
const createLikes = require('../controller/likeController')
// -------creater router for post-------------------
router.post('/createPost', createPost);
// router.get('/getPosts', getPosts);
// ---------create router for comments
router.post('/writeComment', writeComment);
// router.get('/getComment', getComment);
// ----create Router for likes
router.post('/createLikes', createLikes);

module.exports = router;