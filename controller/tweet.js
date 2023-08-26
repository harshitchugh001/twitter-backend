const Tweet = require('../model/tweet');

exports.createTweet= async (req, res) => {
    console.log('tweet');
    console.log(req.body);
    const { userId, tweetDescription, username } = req.body;
    const tweetId = Math.floor(10000000 + Math.random() * 90000000); 

    try {
        const newTweet = new Tweet({
            userid: userId,
            tweetId: tweetId,
            tweetDescription: tweetDescription,
            username: username,
            date: new Date(),
            likeArray: [],
        });

        await newTweet.save();

        res.status(201).json({ message: 'Tweet created successfully', tweet: newTweet });
    } catch (error) {
        console.error('Error creating tweet:', error);
        res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
};

exports.getTweets = async (req, res) => {
    try {
        const tweets = await Tweet.find().sort({ date: -1 }); 
        res.status(200).json(tweets);
    } catch (error) {
        console.error('Error fetching tweets:', error);
        res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
};

exports.likeTweet = async (req, res) => {
    const { userId, tweetId } = req.body;

    try {
        const tweet = await Tweet.findOne({ tweetId });

        if (!tweet) {
            return res.status(404).json({ error: 'Tweet not found' });
        }

        if (tweet.likeArray.includes(userId)) {
            return res.status(200).json({ message: 'User is allowed to like the tweet only one time' });
        }

        tweet.likeArray.push(userId);
        tweet.likeCount += 1;  
        await tweet.save();

        res.status(200).json({ message: 'Tweet liked successfully', tweet });
    } catch (error) {
        console.error('Error liking tweet:', error);
        res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
};

exports.shareTweet = async (req, res) => {
    const { tweetId } = req.body;

    try {
        const tweet = await Tweet.findOne({ tweetId });

        if (!tweet) {
            return res.status(404).json({ error: 'Tweet not found' });
        }

        tweet.shareCount += 1;  
        await tweet.save();

        res.status(200).json({ message: 'Tweet shared successfully', tweet });
    } catch (error) {
        console.error('Error sharingtweet:', error);
        res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
};




