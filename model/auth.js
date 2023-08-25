const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userid: {
    type: Number,
    required: true,
    unique: true,
  },
  followerCount: {
    type: Number,
    default: 10,
  },
  followers: [
    {
      type: String,
      required: true,
    },
  ],
  following: [
    {
      type: String,
      required: true,
    },
  ],
  followingCount: {
    type: Number,
    default: 10,
  },
  userImage: {
    type: String,
    default: 'https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png', 
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
