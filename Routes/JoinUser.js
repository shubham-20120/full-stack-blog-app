const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const jwt_key = 'ptlBlog1865sbm1996';
router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    User.findOne({ email: email }).then((userExist) => {
        if (userExist) {
            return res.json({ error: "User Already Exist" })
        }
        bcrypt.hash(password, 12).then(hashedPassword => {
            const newUser = new User({ name, email, password: hashedPassword, totalBlogs: 0 })
            newUser.save().then((userSaved) => {
                userSaved.password = undefined;
                const token = jwt.sign({ _id: userSaved._id }, jwt_key);
                req.headers.authorization = "Bearer " + token;
                res.json({ message: 'Account Created Successfully!', user: userSaved, token: token })
            }).catch(error => {
                res.json({ error: 'something went wrong, try again! ' })
            })
        })
    }).catch(error => {
        console.log('Somwthing went wrong :(');
        console.log(error);
    })
})

router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email }).then(user => {
        if (!user) {
            return res.json({ error: "user not found !" });
        }
        bcrypt.compare(password, user.password).then(loggedUser => {
            if (!loggedUser) {
                return res.json({ error: "wrong credentials !" });
            }
            const token = jwt.sign({ _id: user._id }, jwt_key);
            req.headers.authorization = "Bearer " + token;
            const { _id, name, email } = user;
            return res.json({ message: 'Signed In successfully !', user: { _id, name, email }, token: token })
        })
    }).catch(err => {
        res.json({ error: "user not found !" });
    })
})

module.exports = router;