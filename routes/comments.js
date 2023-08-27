const express = require('express');
const router = express.Router();
const {
    createComment,
    getCommentsByTweetId,
    // likeComment

} = require('../controller/comment');

router.post('/post-comments', createComment);
router.get('/get-comments', getCommentsByTweetId);
// router.post('/like', likeComment);
// router.post('/dislike', dislikeComment);

module.exports = router;
