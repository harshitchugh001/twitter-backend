const User = require('../model/auth');

exports.getUserData = async (req, res) => {
    const { userid } = req.params;

    try {
        const user = await User.findOne({ userid });

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const userData = {
            username: user.username,
            email: user.email,
            followerCount: user.followerCount,
            followers: user.followers,
            following: user.following,
            followingCount: user.followingCount,
            userImage: user.userImage,
        };

        console.log('User data:', userData);

        return res.status(200).json(userData);
    } catch (error) {
        console.error('GET USER DATA ERROR:', error);
        return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
};
