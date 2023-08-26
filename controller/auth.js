const User = require('../model/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const saltRounds = 10;

exports.signup = async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;
  console.log(req.body);

  try {
   
    const existingUser = await User.findOne({ email: userEmail });
    console.log(existingUser);
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered.' });
    }

    const hashedPassword = await bcrypt.hash(userPassword, saltRounds);

    const newUser = new User({
      username: userName,
      email: userEmail,
      password: hashedPassword,
      userid: Math.floor(10000000 + Math.random() * 90000000),
    });
    await newUser.save();

    return res.status(201).json({ message: 'Signup successful.' });
  } catch (error) {
    console.error('SIGNUP ERROR:', error);
    return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res.status(400).json({ error: 'User with that email does not exist. Please sign up.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: 'Email and password do not match.' });
    }

    const payload = {
      _id: user._id,
      userId: user.userid,
      name: user.username,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    return res.json({
      token,
      user: payload,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
};

exports.getOtherUsers = async (req, res) => {
  const { userid } = req.params;
  // console.log(req.params, "......");

  try {
    const currentUser = await User.findOne({ userid }).exec();

    const pageSize = 5;
    const page = req.query.page || 1;

    const totalUsers = await User.countDocuments();

    const excludedUsers = [currentUser.userid];
    const users = await User.find({ userid: { $nin: excludedUsers } }) 
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .select('-password')
      .exec();

    const totalPages = Math.ceil((totalUsers - 1) / pageSize);

    return res.json({
      users,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
};

exports.followUser = async (req, res) => {
  const { currentUserId, followedUserId } = req.body;
  console.log(req.body);

  try {
    const currentUser = await User.findOne({ userid: currentUserId });

    if (!currentUser) {
      return res.status(404).json({ error: 'Current user not found.' });
    }

    if (currentUser.following.includes(followedUserId)) {
      return res.status(400).json({ error: 'Already following this user.' });
    }

    currentUser.following.push(followedUserId);
    currentUser.followingCount += 1;
    await currentUser.save();

    const followedUser = await User.findOne({ userid: followedUserId });

    if (!followedUser) {
      return res.status(404).json({ error: 'Followed user not found.' });
    }

    followedUser.followers.push(currentUserId);
    followedUser.followerCount += 1;
    await followedUser.save();

    return res.status(200).json({ message: 'Followed successfully.' });
  } catch (error) {
    console.error('Follow user error:', error);
    return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
};


