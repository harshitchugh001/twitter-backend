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
            likeCount: 0,
            shareCount: 0
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


