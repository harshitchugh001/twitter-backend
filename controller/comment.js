const Comment = require('../model/comment');


exports.createComment = async (req, res) => {
  const { text, userId, tweetId } = req.body;

  try {
    const newComment = {
      comment: text,
      userId,
      tweetId,
    };
    const newlyCreated = await Comment.create(newComment);
    res.json(newlyCreated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error creating comment' });
  }
};


exports.getCommentsByTweetId = async (req, res) => {
  const { tweetId } = req.params;

  try {
    const comments = await Comment.find({ tweetId });
    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error fetching comments' });
  }
};


exports.likeComment = async (req, res) => {
  const { commentId, userId } = req.body;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.userId === userId) {
      return res.status(200).json({ message: 'You are not allowed to like your own comment' });
    }

    const hasLiked = comment.like.includes(userId);

    if (!hasLiked) {
      comment.likeCount++;
      comment.like.push(userId);
      await comment.save();
    }

    res.json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating like' });
  }
};
