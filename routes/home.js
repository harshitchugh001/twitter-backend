const express = require('express');
const router = express.Router();
// const User = require('../model/auth');


const {
    getUserData
} = require('../controller/home');

router.get('/userdata/:userid', getUserData);


module.exports = router;
