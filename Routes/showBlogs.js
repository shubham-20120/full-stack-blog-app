const express = require('express');
const router = express.Router();
const requireLogin = require('../MiddleWares/authorization');
const Comment = require('../Models/Comment');
const Blogs = require('../Models/Blog');
const User = require('../Models/User');
// const Comment = require('../Models/Comment');

router.get('/my-blog', requireLogin, (req, res) => {
    const { _id } = req.user;
    Blogs.find({ owener: _id }).then(data => {
        // console.log('data');
        // console.log(data);
        return res.json(data);
    }).catch(err => {
        return res.json({ error: "something went wrong, please try again!" })
    })
})

router.post('/get-user-name-by-id', requireLogin, (req, res) => {
    const { _id } = req.body;
    console.log(req.body);
    User.findById({ _id }).then(data => {
        return res.json(data.name);
    }).catch(err => {
        return res.json('Denied to display')
    })
})

router.get('/all-posts', requireLogin, (req, res) => {
    Blogs.find().then(data => { return res.json(data) }).catch(err => { return res.json({ error: 'please check your internet connectivity!' }) })
})

router.post('/comments', requireLogin, (req, res) => {
    const { onBlog, commentContent } = req.body;
    const { name } = req.user;
    const newComment = Comment({ by: name, onBlog, commentContent });
    newComment.save().then(data => {
        return res.json({ message: 'Comment Posted Successfully!' });
    }).catch(err => {
        return res.json({ error: 'Something went wrong, please try again! ' })
    })
})

router.post('/get-comments', requireLogin, (req, res) => {
    const { blogId } = req.body;
    // console.log('req.body');
    // console.log(req.body);
    Comment.find({ onBlog: blogId }).then(data => {
        // console.log(data);
        return res.json(data);
    }).catch(err => {
        return res.json({ error: 'error in comments' });

    })
})

module.exports = router;