const express = require('express');
const router = express.Router();
// const User = require('../model/auth');


const {
    createTweet,
    getTweets,
    likeTweet,
    shareTweet

} = require('../controller/tweet');

router.post('/createtweet', createTweet);

router.get('/get-tweets',getTweets);

router.post('/like-tweet',likeTweet);

router.post('/share-tweet',shareTweet);

module.exports = router;