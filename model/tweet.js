const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    userid: {
        type: Number,
        required: true,
        unique:false
    },
    tweetId: {
        type: Number,
        required: true,
        unique:true
    },
    tweetDescription: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    likeArray: [
        {
            type: String,
            ref: 'User',
            required: true,
        },],
    likeCount: {
        type: Number,
        default: 0
    },
    shareCount: {
        type: Number,
        default: 0
    }
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
