const mongoose = require('mongoose');
const shortid = require('shortid');

const CommentSchema = mongoose.Schema({
  comment_id: {
    type: String,
    required: true,
    unique: true,
    default: shortid.generate,
  },
  userId: {
    type: String,
    required: true,
    ref: 'User', 
  },
  tweetId: {
    type: String,
    required: true,
    ref: 'Tweet', 
  },
  comment: {
    type: String,
    required: true,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  like: [
    {
      type: String,
      ref: 'User',
      required: true,
    },
  ],
});

module.exports = mongoose.model('Comment', CommentSchema);
