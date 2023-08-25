const express = require('express');
const router = express.Router();
// const User = require('../model/auth');


const {
    createTweet,
    getTweets

} = require('../controller/tweet');

router.post('/createtweet', createTweet);

router.get('/get-tweets',getTweets);

module.exports = router;